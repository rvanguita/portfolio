// Competências agrupadas pela aplicação, com Engenharia de Dados em primeiro plano.
/**
 * Um item de competência. `projectIds` lista os projetos que o demonstram, em
 * ordem de catálogo — vazio quando nenhum projeto publicado o sustenta.
 *
 * Item sem projeto não é item inventado: a pessoa pode dominar a ferramenta sem
 * ter um projeto público que a use. A regra de honestidade deste produto é não
 * inflar escala, senioridade ou impacto, e listar uma ferramenta conhecida não
 * faz isso. O que o site não faz é fingir evidência que não existe — por isso o
 * elo só aparece onde há projeto atrás.
 */
export interface SkillItem {
  name: string;
  projectIds: string[];
}

export interface SkillGroup {
  title: string;
  summary: string;
  projectIds: string[];
  items: SkillItem[];
}

export const skills: SkillGroup[] = [
  {
    title: "Engenharia de Dados",
    summary:
      "Ingestão, modelagem em camadas e disponibilização: arquitetura medalhão em Delta Lake e DuckDB, orquestração no Airflow, contratos de dados que barram carga suja e CI que roda o pipeline inteiro a cada PR.",
    projectIds: ["fastf1", "rotaperfume", "lake-research-map"],
    items: [
      {
        name: "Python",
        projectIds: [
          "bank-churn",
          "rotaperfume",
          "personal-expenses",
          "shopping-list",
          "wind-farm",
          "otimizacao-eletrica",
          "fraud-detection",
          "sentiment-nlp",
          "lake-research-map",
        ],
      },
      { name: "SQL", projectIds: ["personal-expenses", "shopping-list"] },
      { name: "Apache Airflow", projectIds: ["fastf1", "lake-research-map"] },
      { name: "Delta Lake / PySpark", projectIds: ["fastf1"] },
      { name: "FastAPI", projectIds: ["fastf1"] },
      {
        name: "Docker",
        projectIds: [
          "fastf1",
          "bank-churn",
          "rotaperfume",
          "personal-expenses",
          "shopping-list",
          "lake-research-map",
        ],
      },
      { name: "Git / GitHub Actions", projectIds: ["rotaperfume"] },
      {
        name: "Pytest / testes automatizados",
        projectIds: ["rotaperfume", "personal-expenses", "lake-research-map"],
      },
      { name: "Linux / Shell", projectIds: ["rotaperfume"] },
    ],
  },
  {
    title: "Ciência de Dados e ML",
    summary:
      "Preparação de dados, comparação de modelos sob validação cruzada e leitura dos fatores que explicam cada previsão — incluindo trocar ganho de métrica por latência de inferência quando o custo não compensa.",
    projectIds: ["bank-churn"],
    items: [
      { name: "Pandas", projectIds: ["wind-farm"] },
      { name: "NumPy", projectIds: [] },
      { name: "Scikit-Learn", projectIds: ["fastf1", "lake-research-map"] },
      { name: "Statsmodels", projectIds: [] },
      {
        name: "XGBoost / LightGBM",
        projectIds: [
          "bank-churn",
          "wind-farm",
          "fraud-detection",
          "sentiment-nlp",
        ],
      },
      {
        name: "Regressão & Classificação",
        projectIds: [
          "bank-churn",
          "personal-expenses",
          "wind-farm",
          "sentiment-nlp",
        ],
      },
      { name: "Feature Engineering", projectIds: ["bank-churn"] },
    ],
  },
  {
    title: "Visualização e Analytics",
    summary:
      "A camada em que o dado vira decisão: APIs de baixa latência, painéis e relatórios ligados direto às tabelas curadas de cada projeto.",
    projectIds: ["fastf1", "rotaperfume", "lake-research-map"],
    items: [
      { name: "Power BI", projectIds: [] },
      { name: "Tableau", projectIds: [] },
      { name: "Matplotlib", projectIds: ["wind-farm"] },
      { name: "Seaborn", projectIds: [] },
      { name: "Excel Avançado", projectIds: [] },
      {
        name: "Estatística Descritiva & Inferencial",
        projectIds: ["fastf1", "bank-churn", "shopping-list", "sentiment-nlp"],
      },
      {
        name: "Streamlit",
        projectIds: [
          "fastf1",
          "rotaperfume",
          "personal-expenses",
          "shopping-list",
          "lake-research-map",
        ],
      },
    ],
  },
  {
    title: "Otimização",
    summary:
      "Modelagem matemática e metaheurísticas para decidir entre alternativas caras: programação inteira mista em AMPL/CPLEX e Busca Tabu aplicadas ao planejamento de sistemas elétricos.",
    projectIds: ["otimizacao-eletrica"],
    items: [
      { name: "CPLEX", projectIds: ["otimizacao-eletrica"] },
      { name: "AMPL", projectIds: ["otimizacao-eletrica"] },
      { name: "Programação Inteira Mista (MILP)", projectIds: [] },
      { name: "Modelagem Não-Linear", projectIds: [] },
      { name: "Metaheurísticas", projectIds: ["otimizacao-eletrica"] },
      {
        name: "Otimização de Redes Elétricas",
        projectIds: ["otimizacao-eletrica"],
      },
    ],
  },
];
