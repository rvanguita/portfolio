// O vocabulário da aferição tipada, num lugar só.
//
// Cada afirmação do portfólio declara o que ela é. Um número aferido em teste e
// um escopo de arquitetura não podem receber o mesmo tratamento — é essa
// distinção que o site assume como assinatura, e ela precisa da mesma lista de
// termos no cartão (Readout) e na legenda (MetricLegend).
export type MetricKind =
  "medida" | "arquitetura" | "publicacao" | "desenvolvimento";

/** Ordem de leitura da legenda: do mais forte ao declaradamente incompleto. */
export const METRIC_KINDS: readonly MetricKind[] = [
  "medida",
  "arquitetura",
  "publicacao",
  "desenvolvimento",
];

/** O termo que aparece na etiqueta do cartão. */
export const METRIC_TAG: Record<MetricKind, string> = {
  medida: "Resultado em teste",
  arquitetura: "Arquitetura implementada",
  publicacao: "Publicação",
  desenvolvimento: "Em desenvolvimento",
};

/** Contexto de cada tipo na legenda ao final do catálogo. */
export const METRIC_GLOSS: Record<MetricKind, string> = {
  medida:
    "Métrica calculada em dados de teste; consulte as condições no projeto.",
  arquitetura: "Componentes e fluxo construídos, com código disponível.",
  publicacao: "Artigo e referência de pesquisa; consulte o status na ficha.",
  desenvolvimento: "Projeto em andamento, com entregas ainda incompletas.",
};
