import { memo } from "react";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { Rich } from "@/components/ui/Rich";
import { cx } from "@/lib/cx";
import type { IconName } from "@/components/ui/Icon";
import type { ProjectCategory } from "@/lib/types";

interface SkillCardProps {
  icon: IconName;
  title: string;
  tags: string[];
  /** HTML inline permitido (usado nas etapas do case study). */
  description?: string;
  /** Domínio — tinge o ícone do grupo com a cor da legenda. */
  domain?: ProjectCategory;
}

/** Porte de _includes/skill-card.html. Memoizado (padrão da skill). */
export const SkillCard = memo(function SkillCard({
  icon,
  title,
  tags,
  description,
  domain,
}: SkillCardProps) {
  return (
    <div className="skill-card">
      <div className={cx("skill-card-header", domain && `cat-${domain}`)}>
        <Icon name={icon} className="skill-icon" />
        <h3>{title}</h3>
      </div>
      {description ? <Rich as="p" className="case-study-copy" html={description} /> : null}
      <div className="skill-tags-group">
        {tags.map((tag) => (
          <Tag key={tag} variant="pill">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
});
