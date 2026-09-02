/**
 * Fonte única do texto profissional de forma longa + identidade + canais de
 * contato. Antes espalhado em Hero.tsx / About.tsx / Footer.tsx (SDD §9 — o
 * conteúdo profissional não deve ficar espalhado pelos componentes).
 *
 * `aboutBio` contém HTML inline (<strong>) e é renderizado via <Rich>.
 * Regra: nada aqui pode ser inventado (PRD §32 / SDD §28).
 */
export const profile = {
  name: "Rene Verinaud Anguita Junior",
  /** Rótulo curto (logo / CH0). NÃO alterar — assertado por tests/hero.test.tsx. */
  shortName: "Rene V. Anguita Jr.",
  jobTitle: "Cientista de Dados",
  email: "renevajr@gmail.com",
  location: "Campinas, SP · Brasil",
  languages: "Português (nativo) · Inglês (avançado)",

  heroTagline: "REC · Disponível para novos desafios",
  heroHeadline:
    "Cientista de Dados & Ph.D. em Engenharia Elétrica — Machine Learning, otimização e engenharia de dados.",
  heroLead:
    "Transformo dados complexos em decisões melhores, modelos preditivos e sistemas mais eficientes.",

  aboutHeading: "Ciência aplicada para problemas que importam.",
  aboutBio:
    "Profissional com <strong>Doutorado em Engenharia Elétrica pela UNICAMP</strong> e sólida experiência em <strong>modelagem preditiva</strong>, <strong>machine learning</strong> e <strong>engenharia de features</strong>, transformando dados brutos em insights acionáveis para otimização de processos e tomada de decisão. No doutorado, aplicou a metaheurística de <strong>Busca Tabu</strong> e métodos de apoio à decisão ao planejamento de expansão de sistemas de distribuição de energia elétrica; seu background em Engenharia Elétrica confere uma visão analítica diferenciada para desafios em Big Data e Ciência de Dados.",

  footerTitle: "Rene Verinaud Anguita Junior, Ph.D.",
  footerTagline:
    "Cientista de Dados | Especialista em Otimização de Sistemas & Machine Learning",

  social: {
    github: "https://github.com/rvanguita",
    linkedin: "https://linkedin.com/in/rvanguita",
  },
} as const;
