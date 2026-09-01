import { forwardRef, memo, type ComponentPropsWithoutRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { Rich } from "@/components/ui/Rich";
import { ProjectActionLink } from "@/components/cards/ProjectActionLink";
import type { Project } from "@/lib/types";
import { cx } from "@/lib/cx";

type ProjectCardProps = ComponentPropsWithoutRef<"div"> & { project: Project };

/**
 * Porte de _includes/project-card.html. Memoizado (padrão da skill) e com ref
 * encaminhada para o `.project-card-item` — assim `motion.create()` pode animar
 * o próprio card sem um wrapper extra que quebraria a grade.
 */
const ProjectCardBase = forwardRef<HTMLDivElement, ProjectCardProps>(
  function ProjectCard({ project, className, ...rest }, ref) {
    const multipleActions = project.actions.length > 1;

    return (
      <div
        ref={ref}
        className={cx("project-card-item", className)}
        data-category={project.category}
        {...rest}
      >
        <div>
          <span
            className={cx("project-category-badge", `cat-${project.category}`)}
          >
            <Icon name={project.badgeIcon} className="badge-icon" />{" "}
            {project.badgeLabel}
          </span>
          <h3>{project.title}</h3>
          <p className="project-summary">
            <strong>Desafio:</strong> {project.challenge}
          </p>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight.label}>
                <span>
                  <strong>{highlight.label}:</strong>{" "}
                  <Rich html={highlight.text} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-footer">
          <div className="project-techs">
            {project.techTags.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {multipleActions ? (
            <div className="project-actions">
              {project.actions.map((action) => (
                <ProjectActionLink
                  key={action.label}
                  action={action}
                  primary={action.primary ?? false}
                />
              ))}
            </div>
          ) : (
            <ProjectActionLink action={project.actions[0]} primary={false} />
          )}
        </div>
      </div>
    );
  },
);

export const ProjectCard = memo(ProjectCardBase);
