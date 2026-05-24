import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  whatsappLink,
  INSTAGRAM_HANDLE,
} from "@/lib/contato";

export function Footer() {
  return (
    <footer
      id="contato"
      className="mt-24 border-t border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl font-semibold">DF Ecoturismo</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Passeios e travessias pelos Lençóis Maranhenses, com guias locais e
            experiências autorais. Reserva direta pelo WhatsApp.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Reserve agora</div>
          <a
            href={whatsappLink("Olá! Quero reservar um passeio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-2.5 font-semibold text-primary-foreground shadow-warm"
          >
            <MessageCircle className="h-4 w-4" /> (98) 98720-7175
          </a>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" /> Barreirinhas — Maranhão
          </div>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Siga nas redes</div>
          <div className="mt-3 flex gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" /> @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DF Ecoturismo — Todos os direitos reservados
      </div>
    </footer>
  );
}