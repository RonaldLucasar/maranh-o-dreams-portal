
-- Storage bucket for tour media (photos and videos)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'passeios-midia',
  'passeios-midia',
  true,
  104857600,
  array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/quicktime','video/webm']
)
on conflict (id) do nothing;

-- Open storage policies (public gallery — anyone can view & upload)
create policy "Public read passeios-midia"
on storage.objects for select
using (bucket_id = 'passeios-midia');

create policy "Public upload passeios-midia"
on storage.objects for insert
with check (bucket_id = 'passeios-midia');

create policy "Public delete passeios-midia"
on storage.objects for delete
using (bucket_id = 'passeios-midia');

-- Media metadata table
create table public.midia (
  id uuid primary key default gen_random_uuid(),
  tour_slug text not null default 'geral',
  storage_path text not null,
  url text not null,
  tipo text not null check (tipo in ('imagem','video')),
  legenda text,
  created_at timestamptz not null default now()
);

alter table public.midia enable row level security;

create policy "Qualquer um pode ver midias"
on public.midia for select
using (true);

create policy "Qualquer um pode inserir midias"
on public.midia for insert
with check (true);

create policy "Qualquer um pode deletar midias"
on public.midia for delete
using (true);

create index midia_created_at_idx on public.midia (created_at desc);
create index midia_tour_slug_idx on public.midia (tour_slug);
