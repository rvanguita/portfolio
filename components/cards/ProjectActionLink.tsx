import Link from "next/link";
import type { ProjectAction } from "@/lib/types";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { isExternalUrl } from "@/lib/url";
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

  if (isExternalUrl(action.url)) {
    return (
      <ExternalLink href={action.url} className={className}>
        {action.label}
      </ExternalLink>
    );
  }

  return (
    <Link href={action.url} className={className}>
      {action.label}
    </Link>
  );
}
