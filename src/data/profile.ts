// Conteúdo do perfil — texto preservado do site anterior (header .intro).
export const profile = {
  name: "Rene Verinaud Anguita Junior",
  shortName: "R. Anguita",
  role: "Cientista de Dados · Ph.D. em Engenharia Elétrica — UNICAMP",
  roleShort: "Cientista de dados · PhD Eng. Elétrica",
  /** Proposta de valor com <strong>; renderizada via set:html. */
  leadHtml:
    "Transformo problemas operacionais em <strong>decisões mensuráveis</strong>. " +
    "Combino <strong>engenharia de dados, machine learning e otimização</strong> " +
    "com a visão sistêmica de quem tem doutorado em Engenharia Elétrica pela UNICAMP.",
  availability:
    "Aberto a vagas em Ciência de Dados / Machine Learning — remoto, híbrido ou presencial.",
  location: "Campinas, SP · Brasil",
  email: "renevajr@gmail.com",
  links: {
    github: "https://github.com/rvanguita",
    linkedin: "https://linkedin.com/in/rvanguita",
    dossie: "/assets/dossie-rene-anguita.pdf",
  },
  description:
    "Portfólio profissional de Rene Verinaud Anguita Junior, Ph.D. em Engenharia " +
    "Elétrica, especialista em Ciência de Dados, Machine Learning e Otimização de Sistemas.",
  ogImage: "/assets/social-card.png",
};

export type Profile = typeof profile;
