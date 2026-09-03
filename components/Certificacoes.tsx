import { ExternalLink } from "@/components/ui/ExternalLink";
import { asset } from "@/lib/base-path";
import { certificates } from "@/lib/data/certificates";

const total = certificates.reduce((n, g) => n + g.items.length, 0);

export function Certificacoes() {
  return (
    <section
      id="certificacoes"
      className="block"
      aria-labelledby="certificacoes-h"
    >
      <h2 id="certificacoes-h" className="kicker">
        Certificações
      </h2>
      <details className="certs">
        <summary>Certificações e especializações ({total})</summary>
        <div className="certs-inner">
          {certificates.map((group) => (
            <div key={group.key} className="certs-group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((cert) => (
                  <li key={`${cert.title}-${cert.path}`}>
                    <ExternalLink href={asset(cert.path)}>
                      {cert.title}
                    </ExternalLink>{" "}
                    <span className="issuer">— {cert.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
