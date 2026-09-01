import type { TimelineEntry } from "@/lib/types";

/** Migrado de _data/timeline.yml (chave `experience`) — conteúdo inalterado. */
export const experience: TimelineEntry[] = [
  {
    degree: "Aluno Pesquisador de Doutorado",
    year: "out/2019 – out/2023",
    institution:
      "CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
    description:
      "Planejamento de expansão de sistemas de distribuição de energia elétrica com metaheurística de Busca Tabu e métodos de apoio à decisão, desenvolvidos em Python.",
  },
  {
    degree: "Aluno Pesquisador de Pós-Graduação (Mestrado)",
    year: "mar/2017 – dez/2018",
    institution:
      "CAPES — Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
    description:
      "Metodologia heurística para sistemas de distribuição de energia elétrica, com resultados equivalentes ao método Cônico clássico e tempo computacional 10x menor; apoio à docência em Instalações Elétricas e Sistemas de Proteção.",
  },
  {
    degree: "Autônomo",
    year: "jan/2017 – mar/2017",
    institution: "ICANP",
    description:
      'Projeto eletrônico para modernização do mercado municipal de Mococa-SP (600 m², 38 lojas), com foco em eficiência energética e redução de custos.',
  },
  {
    degree: "Estagiário",
    year: "jun/2016 – dez/2016",
    institution:
      'Prefeitura da Cidade Universitária "Zeferino Vaz" (UNICAMP)',
    description:
      "Manutenção do sistema de distribuição de energia elétrica do campus universitário, classe de tensão 13,9 kV.",
  },
  {
    degree: "Internship",
    year: "jan/2016 – mai/2016",
    institution: "Café Arquitetura+Design",
    description:
      "Projeto eletrônico para construção de uma escola e uma creche, em interação com as áreas de Arquitetura e Engenharia Civil.",
  },
  {
    degree: "Iniciação Científica",
    year: "ago/2013 – jul/2015",
    institution: "CNPq",
    description:
      "Pesquisa aplicada a sistemas elétricos, reconhecida como Melhor Iniciação Científica do ano de 2014.",
  },
];

/** Migrado de _data/timeline.yml (chave `education`) — conteúdo inalterado. */
export const education: TimelineEntry[] = [
  {
    degree: "Doutorado em Engenharia Elétrica (Ph.D.)",
    year: "2019 – 2025",
    institution: "Universidade Estadual de Campinas (UNICAMP)",
    description:
      "Foco em Otimização de Sistemas Elétricos, Pesquisa Operacional e Heurísticas de Alta Eficiência.",
  },
  {
    degree: "Mestrado em Sistemas de Infraestrutura Urbana (M.S.)",
    year: "2017 – 2018",
    institution: "Pontifícia Universidade Católica de Campinas (PUC-Campinas)",
    description:
      "Modelagem de redes de infraestrutura e análise de dados espaciais e operacionais.",
  },
  {
    degree: "Bacharelado em Engenharia Elétrica (B.S.)",
    year: "2012 – 2016",
    institution: "Pontifícia Universidade Católica de Campinas (PUC-Campinas)",
  },
];
