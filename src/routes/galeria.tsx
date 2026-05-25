import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, ImagePlus, Loader2, Film, LogOut, LogIn } from "lucide-react";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { PASSEIOS } from "@/lib/passeios";
import { useAuth, signOut } from "@/lib/useAuth";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — DF Ecoturismo" },
      {
        name: "description",
        content:
          "Fotos e vídeos dos passeios da DF Ecoturismo pelos Lençóis Maranhenses.",
      },
    ],
  }),
  component: GaleriaPage,
});

type Midia = {
  id: string;
  tour_slug: string;
  storage_path: string;
  url: string;
  tipo: "imagem" | "video";
  legenda: string | null;
  created_at: string;
};

const BUCKET = "passeios-midia";

function GaleriaPage() {
  const { isAdmin, user, loading: authLoading } = useAuth();
  const [midias, setMidias] = useState<Midia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filtro, setFiltro] = useState<string>("todos");
  const [passeioSel, setPasseioSel] = useState<string>("geral");
  const [legenda, setLegenda] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setLoading(true);
    const { data, error } = await supabase
      .from("midia")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setErro(error.message);
    else setMidias((data ?? []) as Midia[]);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setErro(null);
    try {
      for (const file of files) {
        const tipo: "imagem" | "video" = file.type.startsWith("video/")
          ? "video"
          : "imagem";
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `${passeioSel}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        const { error: insErr } = await supabase.from("midia").insert({
          tour_slug: passeioSel,
          storage_path: path,
          url: pub.publicUrl,
          tipo,
          legenda: legenda || null,
        });
        if (insErr) throw insErr;
      }
      setLegenda("");
      if (inputRef.current) inputRef.current.value = "";
      await carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao enviar");
    } finally {
      setUploading(false);
    }
  }

  async function remover(m: Midia) {
    if (!isAdmin) return;
    if (!confirm("Remover esta mídia?")) return;
    await supabase.storage.from(BUCKET).remove([m.storage_path]);
    await supabase.from("midia").delete().eq("id", m.id);
    await carregar();
  }

  const filtradas =
    filtro === "todos" ? midias : midias.filter((m) => m.tour_slug === filtro);

  return (
    <>
      <Background />
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="mb-10 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Galeria
          </span>
          <h1 className="mt-2 font-serif text-5xl font-bold leading-tight">
            Fotos e vídeos <span className="text-gradient-sunset">dos passeios</span>
          </h1>
          <p className="mt-4 text-foreground/80">
            As melhores memórias dos nossos roteiros pelos Lençóis Maranhenses.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs">
            {!authLoading && (
              isAdmin ? (
                <>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 font-semibold text-secondary">
                    Modo admin ativo
                  </span>
                  <button
                    onClick={signOut}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <LogOut className="h-3 w-3" /> Sair
                  </button>
                </>
              ) : user ? (
                <button
                  onClick={signOut}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <LogOut className="h-3 w-3" /> Sair
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <LogIn className="h-3 w-3" /> Acesso admin
                </Link>
              )
            )}
          </div>
        </header>

        {/* Upload — visível só para admin */}
        {isAdmin && (
        <section className="mb-10 rounded-3xl border border-border/60 bg-card-warm p-6 shadow-card backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-sunset shadow-warm">
              <ImagePlus className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-serif text-xl font-semibold">
                Adicionar mídia
              </div>
              <div className="text-xs text-muted-foreground">
                Imagens (JPG/PNG/WebP) ou vídeos (MP4) — até 100MB cada
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <select
              value={passeioSel}
              onChange={(e) => setPasseioSel(e.target.value)}
              className="rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm"
            >
              <option value="geral">Geral</option>
              {PASSEIOS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.nome}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
              placeholder="Legenda (opcional)"
              className="rounded-full border border-border bg-background/80 px-4 py-2.5 text-sm"
            />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-105">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Enviando..." : "Escolher arquivos"}
              <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                disabled={uploading}
                onChange={handleUpload}
                className="sr-only"
              />
            </label>
          </div>
          {erro && (
            <p className="mt-3 text-sm text-destructive">{erro}</p>
          )}
        </section>
        )}

        {/* Filtro */}
        <div className="mb-6 flex flex-wrap gap-2">
          <FiltroBtn ativo={filtro === "todos"} onClick={() => setFiltro("todos")}>
            Todos
          </FiltroBtn>
          <FiltroBtn ativo={filtro === "geral"} onClick={() => setFiltro("geral")}>
            Geral
          </FiltroBtn>
          {PASSEIOS.map((p) => (
            <FiltroBtn
              key={p.slug}
              ativo={filtro === p.slug}
              onClick={() => setFiltro(p.slug)}
            >
              {p.nome}
            </FiltroBtn>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid place-items-center py-24 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : filtradas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 py-20 text-center text-muted-foreground">
            Nenhuma mídia ainda. Seja o primeiro a enviar!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtradas.map((m) => (
              <figure
                key={m.id}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card"
              >
                {m.tipo === "video" ? (
                  <video
                    src={m.url}
                    controls
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <img
                    src={m.url}
                    alt={m.legenda ?? "Mídia"}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition group-hover:scale-105"
                  />
                )}
                <button
                  onClick={() => remover(m)}
                  aria-label="Remover"
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-destructive opacity-0 backdrop-blur transition group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {m.tipo === "video" && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold">
                    <Film className="h-3 w-3" /> Vídeo
                  </span>
                )}
                {m.legenda && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-2 text-xs text-primary-foreground">
                    {m.legenda}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function FiltroBtn({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-xs font-semibold transition " +
        (ativo
          ? "border-transparent bg-sunset text-primary-foreground shadow-warm"
          : "border-border bg-card/60 text-foreground/80 hover:border-primary hover:text-primary")
      }
    >
      {children}
    </button>
  );
}