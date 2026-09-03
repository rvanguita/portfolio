import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { isExternalUrl } from "@/lib/url";
import { projects } from "@/lib/data/projects";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Projetos() {
  return (
    <section id="projetos" className="block" aria-labelledby="projetos-h">
      <h2 id="projetos-h" className="kicker">
        Projetos
      </h2>
      <div className="projects">
        {projects.map((p) => (
          <article key={p.key} className="project">
            <p className="project-cat">{p.badgeLabel}</p>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{cap(p.challenge)}</p>
            <p className="project-tech">{p.techTags.join(" · ")}</p>
            <p className="project-links">
              {p.actions.map((a) =>
                isExternalUrl(a.url) ? (
                  <ExternalLink key={a.label} href={a.url}>
                    {a.label} ↗
                  </ExternalLink>
                ) : (
                  <Link key={a.label} href={a.url}>
                    {a.label} →
                  </Link>
                ),
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
