import { cx } from "@/lib/cx";

/** Cabeçalho de seção — kicker editorial + título + descrição + régua. */
export function SectionHeader({
  tag,
  title,
  desc,
  first = false,
  id,
}: {
  tag: string;
  title: string;
  desc?: string;
  first?: boolean;
  /** id do <h2>, para `aria-labelledby` da <section> que o contém. */
  id?: string;
}) {
  return (
    <div className={cx("section-header", first && "section-header-first")}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title" id={id}>{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
      <hr className="section-rule" aria-hidden="true" />
    </div>
  );
}
