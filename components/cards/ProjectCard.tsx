import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { Rich } from "@/components/ui/Rich";
import { ProjectActionLink } from "@/components/cards/ProjectActionLink";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const multipleActions = project.actions.length > 1;

  return (
    <div className="project-card-item">
      <div>
        <span className="project-category-badge">
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
}
