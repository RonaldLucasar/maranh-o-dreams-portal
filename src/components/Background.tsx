import { HERO_IMAGE } from "@/lib/passeios";

/**
 * Fundo fixo do site: foto aérea das dunas e lagoas dos Lençóis Maranhenses
 * com camadas de gradiente quente (laranja/vermelho) por cima.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img
        src={HERO_IMAGE}
        alt=""
        className="h-full w-full object-cover"
        style={{ filter: "saturate(1.1)" }}
      />
      <div className="absolute inset-0 bg-sunset opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background/85" />
    </div>
  );
}