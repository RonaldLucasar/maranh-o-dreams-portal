
-- 1. Enum de papéis
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Tabela de papéis (separada de profiles para evitar privilege escalation)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Função security definer para evitar recursão em policies
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Policies em user_roles
CREATE POLICY "Usuarios veem seus proprios papeis"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins veem todos os papeis"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Trigger: ao criar conta com o email do dono, vira admin automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'dfecoturismo54@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 6. Atualiza RLS da tabela midia: leitura pública, escrita só admin
DROP POLICY IF EXISTS "Qualquer um pode deletar midias" ON public.midia;
DROP POLICY IF EXISTS "Qualquer um pode inserir midias" ON public.midia;
DROP POLICY IF EXISTS "Qualquer um pode ver midias" ON public.midia;

CREATE POLICY "Todos podem ver midias"
ON public.midia FOR SELECT
USING (true);

CREATE POLICY "Apenas admin insere midias"
ON public.midia FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Apenas admin deleta midias"
ON public.midia FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Atualiza policies de storage no bucket passeios-midia
DROP POLICY IF EXISTS "Qualquer um pode ver arquivos passeios-midia" ON storage.objects;
DROP POLICY IF EXISTS "Qualquer um pode upload passeios-midia" ON storage.objects;
DROP POLICY IF EXISTS "Qualquer um pode deletar passeios-midia" ON storage.objects;
DROP POLICY IF EXISTS "Public read passeios-midia" ON storage.objects;
DROP POLICY IF EXISTS "Public insert passeios-midia" ON storage.objects;
DROP POLICY IF EXISTS "Public delete passeios-midia" ON storage.objects;

CREATE POLICY "Leitura publica passeios-midia"
ON storage.objects FOR SELECT
USING (bucket_id = 'passeios-midia');

CREATE POLICY "Admin envia passeios-midia"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'passeios-midia' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin remove passeios-midia"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'passeios-midia' AND public.has_role(auth.uid(), 'admin'));
