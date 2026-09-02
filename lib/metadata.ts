import type { Metadata } from "next";
import { SITE_URL } from "@/lib/base-path";

const SOCIAL_CARD = `${SITE_URL}/assets/img/social-card.png`;

const DESCRIPTION =
  "Portfólio profissional de Rene Verinaud Anguita Junior, Ph.D. em Engenharia Elétrica, especialista em Ciência de Dados, Machine Learning e Otimização de Sistemas.";

/** Metadata base do site (equivalente a _config.yml + jekyll-seo-tag). */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Rene Verinaud Anguita Junior | Data Scientist & Optimization Specialist",
    template: "%s | Rene Verinaud",
  },
  description: DESCRIPTION,
  authors: [{ name: "Rene Verinaud Anguita Junior" }],
  creator: "Rene Verinaud Anguita Junior",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE_URL}/`,
    siteName: "Rene Verinaud Anguita Junior",
    title:
      "Rene Verinaud Anguita Junior | Data Scientist & Optimization Specialist",
    description: DESCRIPTION,
    images: [
      {
        url: SOCIAL_CARD,
        width: 1200,
        height: 630,
        alt: "Rene Anguita — Data Scientist & Ph.D. Engenharia Elétrica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Rene Verinaud Anguita Junior | Data Scientist & Optimization Specialist",
    description: DESCRIPTION,
    images: [SOCIAL_CARD],
  },
};

/**
 * Metadata de uma página de estudo de caso: `<title>` próprio (o template base
 * acrescenta " | Rene Verinaud" uma única vez — passe o título *sem* o sufixo),
 * canonical apontando para a própria rota e OG/Twitter `type: "article"`.
 * Sem isso as páginas herdavam o canonical/OG da home.
 */
export function caseStudyMetadata(o: {
  slug: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${SITE_URL}/projects/${o.slug}/`;
  const fullTitle = `${o.title} | Rene Verinaud`;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url,
      siteName: "Rene Verinaud Anguita Junior",
      title: fullTitle,
      description: o.description,
      images: [
        { url: SOCIAL_CARD, width: 1200, height: 630, alt: fullTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: o.description,
      images: [SOCIAL_CARD],
    },
  };
}
