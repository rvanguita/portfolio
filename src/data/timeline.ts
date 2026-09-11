// Formação e experiência. Datas numéricas preservadas para reuso dos dados.
export interface TimelineEntry {
  years: string;
  from: number;
  to: number;
  title: string;
  org: string;
  note?: string;
}

export const timeline: TimelineEntry[] = [
  {
    years: "2019–25",
    from: 2019,
    to: 2025,
    title: "Doutorado em Engenharia Elétrica (Ph.D.)",
    org: "Universidade Estadual de Campinas (UNICAMP)",
    note: "Foco em Otimização de Sistemas Elétricos, Pesquisa Operacional e Heurísticas de Alta Eficiência.",
  },
  {
    years: "2019–23",
    from: 2019,
    to: 2023,
    title: "Aluno Pesquisador de Doutorado",
    org: "CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
    note: "Planejamento de expansão de sistemas de distribuição de energia elétrica com metaheurística de Busca Tabu e métodos de apoio à decisão, desenvolvidos em Python.",
  },
  {
    years: "2017–18",
    from: 2017,
    to: 2018,
    title: "Mestrado em Sistemas de Infraestrutura Urbana (M.S.)",
    org: "Pontifícia Universidade Católica de Campinas (PUC-Campinas)",
    note: "Modelagem de redes de infraestrutura e análise de dados espaciais e operacionais.",
  },
  {
    years: "2017–18",
    from: 2017,
    to: 2018,
    title: "Aluno Pesquisador de Pós-Graduação (Mestrado)",
    org: "CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
    note: "Metodologia heurística para sistemas de distribuição de energia elétrica, com resultados equivalentes ao método Cônico clássico e tempo computacional 10x menor; apoio à docência em Instalações Elétricas e Sistemas de Proteção.",
  },
  {
    years: "2017",
    from: 2017,
    to: 2017,
    title: "Autônomo",
    org: "ICANP",
    note: "Projeto eletrônico para modernização do mercado municipal de Mococa-SP (600 m², 38 lojas), com foco em eficiência energética e redução de custos.",
  },
  {
    years: "2012–16",
    from: 2012,
    to: 2016,
    title: "Bacharelado em Engenharia Elétrica (B.S.)",
    org: "Pontifícia Universidade Católica de Campinas (PUC-Campinas)",
  },
  {
    years: "2016",
    from: 2016,
    to: 2016,
    title: "Estagiário",
    org: 'Prefeitura da Cidade Universitária "Zeferino Vaz" (UNICAMP)',
    note: "Manutenção do sistema de distribuição de energia elétrica do campus universitário, classe de tensão 13,9 kV.",
  },
  {
    years: "2016",
    from: 2016,
    to: 2016,
    title: "Estágio",
    org: "Café Arquitetura+Design",
    note: "Projeto eletrônico para construção de uma escola e uma creche, em interação com as áreas de Arquitetura e Engenharia Civil.",
  },
  {
    years: "2013–15",
    from: 2013,
    to: 2015,
    title: "Iniciação Científica",
    org: "CNPq",
    note: "Pesquisa aplicada a sistemas elétricos, reconhecida como Melhor Iniciação Científica do ano de 2014.",
  },
];
