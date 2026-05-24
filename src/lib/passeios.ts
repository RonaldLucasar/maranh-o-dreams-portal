import lagoaBonita from "@/assets/lagoa-bonita.jpg";
import cardosa from "@/assets/cardosa.jpg";
import atins from "@/assets/atins.jpg";
import sobrevoo from "@/assets/sobrevoo.jpg";
import travessia from "@/assets/travessia.jpg";
import hero from "@/assets/hero-dunas.jpg";

export type Passeio = {
  slug: string;
  nome: string;
  resumo: string;
  descricao: string;
  duracao: string;
  saida: string;
  preco: string;
  imagem: string;
  destaque?: boolean;
};

export const PASSEIOS: Passeio[] = [
  {
    slug: "lagoa-bonita",
    nome: "Circuito Lagoa Bonita",
    resumo:
      "Travessia de balsa pelo Rio Preguiças e 144 degraus até o paraíso de dunas e lagoas — com pôr do sol incluso.",
    descricao:
      "Saída do hotel às 14h em veículo 4x4 para o Parque Nacional dos Lençóis Maranhenses. Atravessamos o Rio Preguiças por balsa, subimos uma escadinha de 144 degraus e chegamos a um dos lugares mais lindos do planeta. Volta apenas depois do pôr do sol, com guia profissional acompanhando o grupo.",
    duracao: "4h30",
    saida: "Diária — 14h00 / retorno por volta das 19h30",
    preco: "Consulte valores",
    imagem: lagoaBonita,
    destaque: true,
  },
  {
    slug: "cardosa-boia-cross",
    nome: "Cardosa — Bóia Cross",
    resumo:
      "Flutuação relaxante em águas cristalinas do Rio Formigas, atravessando a chapada maranhense.",
    descricao:
      "Saída do hotel às 8h30 para o povoado Cardosa, pela MA-402 e estrada de piçarra em meio à chapada maranhense. Descemos o Rio Formigas em bóias, observando vegetação nativa (bacuri, pequi) e ribeirinhos. Excelente opção para o último dia de viagem.",
    duracao: "Manhã inteira",
    saida: "Diária — 8h30",
    preco: "Consulte valores",
    imagem: cardosa,
  },
  {
    slug: "atins-canto-do-atins",
    nome: "Atins e Canto do Atins",
    resumo:
      "Praias desertas, lagoas no caminho e o encontro do Rio Preguiças com o mar.",
    descricao:
      "Saída às 8h30 em veículo 4x4 rumo ao Parque Nacional — Roteiro Atins. Trilha de aproximadamente 20km até a primeira parada para banho em lagoas. Seguimos até o Canto de Atins (praias desertas) e à vila de Atins, onde o rio encontra o mar.",
    duracao: "Dia inteiro",
    saida: "Diária — 8h30",
    preco: "Consulte valores",
    imagem: atins,
  },
  {
    slug: "sobrevoo",
    nome: "Sobrevôo Panorâmico",
    resumo:
      "Voos cênicos sobre as lagoas Bonita, Azul, Pequenos Lençóis e os oásis da travessia.",
    descricao:
      "Aeronave para 3 passageiros + piloto. ROTA 01 — Grandes Lençóis (30min, R$ 950). ROTA 02 — Pequenos Lençóis + Lagoa Azul (30min, R$ 950). ROTA 03 — combinada (45min, R$ 1.350). ROTA 04 — Travessia em 1h (R$ 1.800). Reserva confirmada apenas com pagamento antecipado.",
    duracao: "30min a 1h",
    saida: "Diária — 06h30 às 17h00",
    preco: "A partir de R$ 950",
    imagem: sobrevoo,
    destaque: true,
  },
  {
    slug: "travessia",
    nome: "Travessia dos Lençóis",
    resumo:
      "3 dias caminhando pelos oásis Baixa Grande, Queimada dos Britos e Betânia, dormindo com as famílias nativas.",
    descricao:
      "Trekking pela região protegida pelo Parque Nacional. Conhecemos Vassouras (Pequenos Lençóis), farol de Mandacaru, praia de Caburé, Atins, e dormimos nos oásis Baixa Grande, Queimada dos Britos e Betânia. Recepção dos moradores com galinha caipira, peixe e hospitalidade. Noites livres para descanso.",
    duracao: "3 dias / 2 noites",
    saida: "Sob consulta",
    preco: "R$ 950 – R$ 4.000",
    imagem: travessia,
  },
];

export const HERO_IMAGE = hero;