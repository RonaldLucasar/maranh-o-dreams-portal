import { MessageCircle, Clock, Calendar } from "lucide-react";
import type { Passeio } from "@/lib/passeios";
import { whatsappLink } from "@/lib/contato";

export function CardPasseio({ p }: { p: Passeio }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card-warm shadow-card backdrop-blur-md transition hover:-translate-y-1 hover:shadow-warm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.imagem}
          alt={p.nome}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        {p.destaque && (
          <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground shadow-warm">
            Destaque
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
          <h3 className="font-serif text-2xl font-semibold drop-shadow-md">
            {p.nome}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-sm leading-relaxed text-foreground/85">{p.resumo}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {p.descricao}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {p.duracao}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {p.saida}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Valor
            </div>
            <div className="font-serif text-lg font-semibold text-gradient-sunset">
              {p.preco}
            </div>
          </div>
          <a
            href={whatsappLink(
              `Olá! Tenho interesse no passeio "${p.nome}". Pode me passar mais informações?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> Reservar
          </a>
        </div>
      </div>
    </article>
  );
}