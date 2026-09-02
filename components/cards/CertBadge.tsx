import type { Certificate } from "@/lib/types";
import { asset } from "@/lib/base-path";
import { ExternalLink } from "@/components/ui/ExternalLink";

/** Porte de _includes/cert-badge.html. `path` aponta para um PDF em /public. */
export function CertBadge({ cert }: { cert: Certificate }) {
  return (
    <ExternalLink href={asset(cert.path)} className="cert-badge-link">
      <div className="cert-badge-info">
        <span>{cert.title}</span>
      </div>
      <span className="cert-badge-tag">{cert.tag}</span>
    </ExternalLink>
  );
}
