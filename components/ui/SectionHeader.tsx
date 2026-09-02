import { cx } from "@/lib/cx";

/** Cabeçalho de seção — sistema "Telemetria": rótulo de canal + título + descrição. */
export function SectionHeader({
  tag,
  title,
  channel,
  desc,
  first = false,
}: {
  tag: string;
  title: string;
  /** Número do canal (CH2 · …). Omitido nas páginas de estudo de caso. */
  channel?: number;
  desc?: string;
  first?: boolean;
}) {
  return (
    <div className={cx("section-header", first && "section-header-first")}>
      <span className="section-tag">
        {channel != null ? `CH${channel} · ` : ""}
        {tag}
      </span>
      <h2 className="section-title">{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}
