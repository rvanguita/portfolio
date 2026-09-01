import type { Certificate } from "@/lib/types";
import { asset } from "@/lib/base-path";

/** Porte de _includes/cert-badge.html. `path` aponta para um PDF em /public. */
export function CertBadge({ cert }: { cert: Certificate }) {
  return (
    <a
      href={asset(cert.path)}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-badge-link"
    >
      <div className="cert-badge-info">
        <span>{cert.title}</span>
      </div>
      <span className="cert-badge-tag">{cert.tag}</span>
    </a>
  );
}
