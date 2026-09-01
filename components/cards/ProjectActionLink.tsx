import Link from "next/link";
import type { ProjectAction } from "@/lib/types";
import { cx } from "@/lib/cx";

/** Porte de _includes/project-action-link.html. */
export function ProjectActionLink({
  action,
  primary = action.primary ?? false,
}: {
  action: ProjectAction;
  primary?: boolean;
}) {
  const className = cx("btn-project", primary && "btn-project-primary");
  const isExternal = action.url.includes("://");

  if (isExternal) {
    return (
      <a
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.url} className={className}>
      {action.label}
    </Link>
  );
}
