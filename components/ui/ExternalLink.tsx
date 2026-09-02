import type { ReactNode } from "react";

/**
 * Âncora que abre em nova aba com `rel` seguro. Um único lugar para o par
 * `target="_blank"` + `rel="noopener noreferrer"` — antes repetido à mão em
 * Footer, Hero, CertBadge e nas páginas de estudo de caso.
 *
 * `rel` é escrito literalmente (não via spread) para o ESLint
 * `react/jsx-no-target-blank` continuar enxergando-o.
 */
export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
