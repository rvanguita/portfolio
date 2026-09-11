// Perfil e contatos compartilhados pelas páginas e pelos metadados.

/** Retrato da abertura. Sem integração de imagem no Astro (passthrough), o
 *  arquivo é servido direto de public/ — daí as dimensões explícitas, que
 *  evitam salto de layout. */
type Photo = { src: string; width: number; height: number; alt: string };

export const profile = {
  name: "Rene Verinaud Anguita Junior",
  shortName: "Rene Anguita",
  roleShort: "Engenheiro de Dados",
  credential: "Ph.D. em Engenharia Elétrica · UNICAMP",
  initials: "RA",
  /** Retrato opcional, pequeno e ao lado do nome. Sem foto, a abertura se
   *  apoia na tipografia, sem reservar um quadro vazio ou um monograma. */
  photo: undefined as Photo | undefined,
  /** Proposta de valor com <strong>; renderizada via set:html. */
  leadHtml:
    "Desenvolvo <strong>pipelines e lakehouses</strong> que organizam dados " +
    "para análise e machine learning.",
  highlights: ["Python", "SQL", "PySpark", "Delta Lake", "Airflow"],
  availability:
    "Aberto a oportunidades em Engenharia de Dados — remoto, híbrido ou presencial.",
  /** Versão curta para a etiqueta de status da abertura. */
  availabilityShort: "Aberto a oportunidades",
  location: "Campinas, SP · Brasil",
  email: "renevajr@gmail.com",
  links: {
    github: "https://github.com/rvanguita",
    linkedin: "https://linkedin.com/in/rvanguita",
    dossie: "/assets/dossie-rene-anguita.pdf",
  },
  description:
    "Portfólio profissional de Rene Verinaud Anguita Junior, Ph.D. em Engenharia " +
    "Elétrica pela UNICAMP. Engenharia de Dados, pipelines e lakehouses, " +
    "com projetos em Python, SQL, PySpark, Delta Lake e Airflow.",
  ogImage: "/assets/social-card.png",
};

export type Profile = typeof profile;
