import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Acesso administrador — DF Ecoturismo" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setInfo(null);
    setLoading(true);
    try {
      if (modo === "cadastro") {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setInfo("Conta criada! Você já pode entrar.");
        setModo("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });
        if (error) throw error;
        navigate({ to: "/galeria" });
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Background />
      <Header />
      <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
        <div className="w-full rounded-3xl border border-border/60 bg-card-warm p-8 shadow-card backdrop-blur-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-sunset shadow-warm">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">Acesso restrito</h1>
              <p className="text-xs text-muted-foreground">
                Área administrativa da galeria
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm"
            />
            <input
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="w-full rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm"
            />
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            {info && <p className="text-sm text-secondary">{info}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {modo === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setErro(null);
              setInfo(null);
              setModo(modo === "login" ? "cadastro" : "login");
            }}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary"
          >
            {modo === "login"
              ? "Primeiro acesso? Criar conta de administrador"
              : "Já tem conta? Entrar"}
          </button>

          <Link
            to="/"
            className="mt-2 block text-center text-[11px] text-muted-foreground hover:text-primary"
          >
            ← Voltar ao site
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}