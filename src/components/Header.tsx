import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { INSTAGRAM_URL, FACEBOOK_URL, whatsappLink } from "@/lib/contato";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-sunset shadow-warm">
            <span className="text-sm font-bold text-primary-foreground">DF</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-semibold tracking-tight">
              DF Ecoturismo
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Lençóis Maranhenses
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link to="/" hash="passeios" className="hover:text-primary">
            Passeios
          </Link>
          <Link to="/galeria" className="hover:text-primary">
            Galeria
          </Link>
          <Link to="/" hash="contato" className="hover:text-primary">
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition hover:bg-muted hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition hover:bg-muted hover:text-primary"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={whatsappLink("Olá! Quero saber mais sobre os passeios.")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm transition hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}