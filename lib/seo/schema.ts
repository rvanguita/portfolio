import { SITE_URL } from "@/lib/base-path";
import { profile } from "@/lib/data/profile";
import { education } from "@/lib/data/timeline";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";

/**
 * Construtores de JSON-LD (schema.org). Todos os campos são derivados de
 * lib/data/* / lib/base-path — nada é inventado (PRD §32 / SDD §14 §28).
 * Renderizados por <JsonLd> nas páginas.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_IMAGE = `${SITE_URL}/assets/img/face.png`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: `${SITE_URL}/`,
    image: PROFILE_IMAGE,
    jobTitle: profile.jobTitle,
    email: profile.email,
    sameAs: [profile.social.linkedin, profile.social.github],
    alumniOf: [...new Set(education.map((e) => e.institution))].map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
    knowsAbout: skills.flatMap((group) => group.tags),
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: profile.name,
    inLanguage: "pt-BR",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function caseStudySchema(
  projectKey: string,
  o: { slug: string; headline: string; description: string },
) {
  const project = projects.find((p) => p.key === projectKey);
  const repo = project?.actions.find((a) => a.url.startsWith("http"))?.url;
  const url = `${SITE_URL}/projects/${o.slug}/`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: o.headline,
    description: o.description,
    url,
    inLanguage: "pt-BR",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(project ? { keywords: project.techTags } : {}),
    ...(repo ? { isBasedOn: repo } : {}),
  };
}
