import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, ImageIcon, ArrowRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CardPasseio } from "@/components/CardPasseio";
import { PASSEIOS } from "@/lib/passeios";
import { whatsappLink } from "@/lib/contato";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Background />
      <Header />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card-warm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-card">
            Lençóis Maranhenses · Barreirinhas
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-7xl">
            Onde as <span className="text-gradient-sunset">dunas</span> encontram
            a <span className="text-gradient-sunset">lagoa</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
            A DF Ecoturismo te leva pelos cenários mais bonitos do Maranhão:
            travessias, sobrevôos panorâmicos, bóia cross e roteiros 4x4 com
            guias locais. Reserva direta pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink("Olá! Quero reservar um passeio com a DF Ecoturismo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-base font-semibold text-primary-foreground shadow-warm transition hover:scale-[1.03]"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>
            <Link
              to="/"
              hash="passeios"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-base font-semibold backdrop-blur transition hover:border-primary hover:text-primary"
            >
              Ver passeios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border/50 pt-8 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                Guias
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold">Locais</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                Saídas
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold">Diárias</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                Reserva
              </dt>
              <dd className="mt-1 font-serif text-xl font-semibold">Direta</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* PASSEIOS */}
      <section
        id="passeios"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Roteiros
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
              Nossos passeios
            </h2>
          </div>
          <Link
            to="/galeria"
            className="hidden items-center gap-2 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            <ImageIcon className="h-4 w-4" /> Ver galeria
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PASSEIOS.map((p) => (
            <CardPasseio key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-sunset p-10 text-primary-foreground shadow-warm sm:p-14">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h3 className="font-serif text-3xl font-bold sm:text-4xl">
                Pronto para conhecer os Lençóis?
              </h3>
              <p className="mt-3 text-primary-foreground/90">
                Combine o roteiro, tire dúvidas e reserve agora pelo WhatsApp.
              </p>
            </div>
            <a
              href={whatsappLink("Olá! Quero montar meu roteiro com a DF Ecoturismo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-semibold text-foreground shadow-card transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5 text-primary" /> (98) 98720-7175
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
