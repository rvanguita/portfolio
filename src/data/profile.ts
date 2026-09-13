// Perfil e contatos compartilhados pelas páginas e pelos metadados.

/** Retrato da abertura. Sem integração de imagem no Astro (passthrough), o
 *  arquivo é servido direto de public/ — daí as dimensões explícitas, que
 *  evitam salto de layout. */
type Photo = { src: string; width: number; height: number; alt: string };

/** Um campo da ficha de triagem. */
type ScreeningFact = { term: string; value: string };

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
    "Ph.D. em Engenharia Elétrica aplicando modelagem e rigor experimental a " +
    "<strong>pipelines e lakehouses</strong> — da ingestão bruta à camada que " +
    "sustenta análise e machine learning. Nove projetos públicos, com código " +
    "aberto e resultados declarados sem inflar.",
  highlights: ["Python", "SQL", "PySpark", "Delta Lake", "Airflow"],
  availability:
    "Busco posições de Engenheiro de Dados pleno, Cientista de Dados ou ML Engineer.",
  /** Versão curta para a etiqueta de status da abertura. */
  availabilityShort: "Aberto a oportunidades",
  /** Os dois filtros mais duros, ainda na abertura — o resto fica na ficha. */
  heroFacts: "Inglês avançado (C1) · CLT ou PJ",
  /** Ficha de triagem: os campos que um recrutador filtra antes de abrir
   *  conversa. Fonte única para o bloco de contato e para o dossiê em PDF. */
  screening: [
    {
      term: "Cargos",
      value: "Engenheiro de Dados pleno · Cientista de Dados · ML Engineer",
    },
    { term: "Contratação", value: "CLT ou PJ" },
    {
      term: "Alcance",
      value:
        "Remoto em todo o Brasil · híbrido ou presencial em Campinas e Grande SP",
    },
    { term: "Idiomas", value: "Português nativo · Inglês avançado (C1)" },
  ] as ScreeningFact[],
  location: "Campinas, SP · Brasil",
  email: "renevajr@gmail.com",
  links: {
    github: "https://github.com/rvanguita",
    linkedin: "https://linkedin.com/in/rvanguita",
    dossie: "/assets/dossie-rene-anguita.pdf",
  },
  description:
    "Rene Anguita — Engenheiro de Dados (Data Engineer), Ph.D. pela UNICAMP. " +
    "Pipelines, lakehouses e MLOps em Python, SQL, PySpark, Delta Lake e Airflow.",
  ogImage: "/assets/social-card.png",
};

export type Profile = typeof profile;
