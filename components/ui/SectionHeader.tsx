import { Icon, type IconName } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/** Cabeçalho de seção reutilizável (padrão repetido no index.html original). */
export function SectionHeader({
  tag,
  title,
  icon,
  desc,
  first = false,
}: {
  tag: string;
  title: string;
  icon: IconName;
  desc?: string;
  first?: boolean;
}) {
  return (
    <div className={cx("section-header", first && "section-header-first")}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">
        <Icon name={icon} className="section-icon" />
        {title}
      </h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}
