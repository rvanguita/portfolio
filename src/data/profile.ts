// Perfil e contatos compartilhados pelas páginas e pelos metadados.
export const profile = {
  name: "Rene Verinaud Anguita Junior",
  shortName: "Rene Anguita",
  role: "Engenheiro de Dados · Ph.D. em Engenharia Elétrica — UNICAMP",
  roleShort: "Engenheiro de Dados",
  credential: "Ph.D. em Engenharia Elétrica · UNICAMP",
  /** Proposta de valor com <strong>; renderizada via set:html. */
  leadHtml:
    "Desenvolvo <strong>pipelines e lakehouses</strong> que organizam dados " +
    "para análise e machine learning.",
  highlights: ["Python", "SQL", "PySpark", "Delta Lake", "Airflow"],
  availability:
    "Aberto a oportunidades em Engenharia de Dados — remoto, híbrido ou presencial.",
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
