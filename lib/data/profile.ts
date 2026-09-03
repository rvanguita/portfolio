/**
 * Fonte única do texto profissional + identidade + contato. `aboutBio` contém
 * HTML inline (<strong>) e é renderizado via <Rich>. Nada aqui é inventado.
 */
export const profile = {
  name: "Rene Verinaud Anguita Junior",
  role: "Cientista de Dados · Ph.D. em Engenharia Elétrica (UNICAMP)",
  email: "renevajr@gmail.com",
  location: "Campinas, SP · Brasil",

  aboutBio:
    "<p>Cientista de Dados com <strong>Doutorado em Engenharia Elétrica pela UNICAMP</strong> e experiência em <strong>modelagem preditiva</strong>, <strong>machine learning</strong> e <strong>engenharia de features</strong>, transformando dados brutos em insights acionáveis para otimização de processos e tomada de decisão.</p><p>No doutorado, aplicou a metaheurística de <strong>Busca Tabu</strong> e métodos de apoio à decisão ao planejamento de expansão de sistemas de distribuição de energia elétrica; o background em Engenharia Elétrica confere uma visão analítica diferenciada para desafios em Big Data e Ciência de Dados.</p>",

  footerTitle: "Rene Verinaud Anguita Junior, Ph.D.",

  social: {
    github: "https://github.com/rvanguita",
    linkedin: "https://linkedin.com/in/rvanguita",
  },
} as const;
