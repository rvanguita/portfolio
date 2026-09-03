import { memo } from "react";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { Rich } from "@/components/ui/Rich";
import type { IconName } from "@/components/ui/Icon";

interface SkillCardProps {
  icon: IconName;
  title: string;
  tags: string[];
  /** HTML inline permitido (usado nas etapas do case study). */
  description?: string;
}

/** Porte de _includes/skill-card.html. Memoizado (padrão da skill). */
export const SkillCard = memo(function SkillCard({
  icon,
  title,
  tags,
  description,
}: SkillCardProps) {
  return (
    <div className="skill-card">
      <div className="skill-card-header">
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
