/** Métricas do hero / seção "Sobre" — readout tiles. `trend` alimenta o sparkline. */
export interface SiteStat {
  value: string;
  label: string;
  trend: number[];
}

export const HERO_STATS: SiteStat[] = [
  {
    value: "Ph.D.",
    label:
      "Doutorado em Eng. Elétrica pela UNICAMP com foco em Otimização",
    trend: [2, 3, 3, 5, 6, 8, 9, 12],
  },
  {
    value: "10x",
    label:
      "Redução no tempo computacional com heurística validada no mestrado (mesma qualidade do método Cônico clássico)",
    trend: [10, 9, 7, 6, 4, 3, 2, 1],
  },
  {
    value: "20+",
    label:
      "Certificações e Especializações Internacionais em Data Science",
    trend: [1, 3, 4, 6, 9, 12, 16, 21],
  },
];
