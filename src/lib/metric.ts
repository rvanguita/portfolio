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
  medida: "medido",
  arquitetura: "arquitetura",
  publicacao: "publicação",
  desenvolvimento: "em desenvolvimento",
};

/** A glosa de uma linha da legenda. Curta: é um chip, não uma frase. */
export const METRIC_GLOSS: Record<MetricKind, string> = {
  medida: "resultado aferido em dados de teste",
  arquitetura: "escopo construído, sem número",
  publicacao: "artigo revisado por pares",
  desenvolvimento: "declaradamente incompleto",
};
