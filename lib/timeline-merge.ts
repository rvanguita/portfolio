import type { TimelineEntry } from "@/lib/types";
import { experience, education } from "@/lib/data/timeline";

/** Anos de 4 dígitos que aparecem em `year`, na ordem. */
function years(entry: TimelineEntry): number[] {
  return (entry.year.match(/\d{4}/g) ?? []).map(Number);
}

/** Faixa compacta para o trilho: "out/2019 – out/2023" → "2019–23"; mesmo ano → "2017". */
export function railYear(entry: TimelineEntry): string {
  const ys = years(entry);
  if (ys.length === 0) return entry.year;
  const a = ys[0];
  const b = ys[ys.length - 1];
  if (a === b) return String(a);
  return `${a}–${String(b).slice(2)}`;
}

/**
 * Formação + experiência num só fluxo, do mais recente ao mais antigo.
 * `sort` do JS é estável: empates de ano preservam a ordem de origem
 * (formação antes de experiência do mesmo ano). Só apresentação — os dados
 * em `lib/data/timeline.ts` não mudam.
 */
export const trajetoria: TimelineEntry[] = [...education, ...experience].sort(
  (x, y) => {
    const ax = years(x);
    const ay = years(y);
    return (ay[ay.length - 1] ?? 0) - (ax[ax.length - 1] ?? 0);
  },
);
