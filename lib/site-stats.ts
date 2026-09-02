/** Métricas do hero — readout tiles (número em mono + rótulo). */
export interface SiteStat {
  value: string;
  label: string;
}

export const HERO_STATS: SiteStat[] = [
  {
    value: "Ph.D.",
    label: "Engenharia Elétrica pela UNICAMP, com foco em otimização",
  },
  {
    value: "10x",
    label:
      "Redução no tempo de cálculo com heurística validada no mestrado, mantendo a qualidade do método Cônico clássico",
  },
  {
    value: "20+",
    label: "Certificações e especializações internacionais em Ciência de Dados",
  },
];
