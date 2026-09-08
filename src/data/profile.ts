// Conteúdo do perfil — texto preservado do site anterior (header .intro).
export const profile = {
  name: "Rene Verinaud Anguita Junior",
  shortName: "R. Anguita",
  role: "Cientista de Dados · Ph.D. em Engenharia Elétrica — UNICAMP · 1 publicação (INDUSCON 2025)",
  roleShort: "Cientista de dados · PhD Eng. Elétrica",
  /** lead com <strong> preservado do original; renderizado via set:html */
  leadHtml:
    "Cientista de dados com <strong>doutorado em Engenharia Elétrica pela UNICAMP</strong>. " +
    "Aplica <strong>engenharia de features</strong>, <strong>modelagem preditiva</strong> e " +
    "<strong>machine learning</strong> à otimização de processos reais, com a leitura analítica " +
    "de quem vem de sistemas elétricos. No doutorado, trabalhou o planejamento de expansão de " +
    "redes de distribuição de energia com a metaheurística de <strong>Busca Tabu</strong> e " +
    "métodos de apoio à decisão.",
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
