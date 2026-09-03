import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { CertBadge } from "@/components/cards/CertBadge";
import { certificates } from "@/lib/data/certificates";
import type { CertificateGroup } from "@/lib/types";

function CertGroup({ group }: { group: CertificateGroup }) {
  return (
    <div className="cert-category-group">
      <div className="cert-category-header">
        <Icon name={group.icon} className="cert-icon" />
        <h3>{group.title}</h3>
      </div>
      <div className="cert-items-grid">
        {group.items.map((cert) => (
          <CertBadge key={`${cert.title}-${cert.path}`} cert={cert} />
        ))}
      </div>
    </div>
  );
}

export function Certificates() {
  return (
    <section id="certificados" aria-labelledby="certificados-heading">
      <SectionHeader
        tag="Educação Continuada"
        title="Certificações & Especializações"
        id="certificados-heading"
        desc="Formação contínua em ciência de dados, matemática aplicada, estatística e análise de negócios."
      />

      <div className="cert-categories-container">
        {certificates.map((group) => (
          <CertGroup key={group.key} group={group} />
        ))}
      </div>
    </section>
  );
}
