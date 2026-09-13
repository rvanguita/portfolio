// Competências agrupadas pela aplicação, com Engenharia de Dados em primeiro plano.
export interface SkillGroup {
  title: string;
  summary: string;
  projectIds: string[];
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Engenharia de Dados",
    summary:
      "Ingestão, modelagem em camadas e disponibilização: arquitetura medalhão em Delta Lake e DuckDB, orquestração no Airflow, contratos de dados que barram carga suja e CI que roda o pipeline inteiro a cada PR.",
    projectIds: ["fastf1", "rotaperfume"],
    items: [
      "Python",
      "SQL",
      "Apache Airflow",
      "Delta Lake / PySpark",
      "FastAPI",
      "Docker",
      "Git / GitHub Actions",
      "Linux / Shell",
    ],
  },
  {
    title: "Ciência de Dados e ML",
    summary:
      "Preparação de dados, comparação de modelos sob validação cruzada e leitura dos fatores que explicam cada previsão — incluindo trocar ganho de métrica por latência de inferência quando o custo não compensa.",
    projectIds: ["bank-churn"],
    items: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Statsmodels",
      "XGBoost / LightGBM",
      "Regressão & Classificação",
      "Feature Engineering",
    ],
  },
  {
    title: "Visualização e Analytics",
    summary:
      "A camada em que o dado vira decisão: APIs de baixa latência, painéis e relatórios ligados direto às tabelas curadas de cada projeto.",
    projectIds: ["fastf1", "rotaperfume"],
    items: [
      "Power BI",
      "Tableau",
      "Matplotlib",
      "Seaborn",
      "Excel Avançado",
      "Estatística Descritiva & Inferencial",
      "Streamlit",
    ],
  },
  {
    title: "Otimização",
    summary:
      "Modelagem matemática e metaheurísticas para decidir entre alternativas caras: programação inteira mista em AMPL/CPLEX e Busca Tabu aplicadas ao planejamento de sistemas elétricos.",
    projectIds: ["otimizacao-eletrica"],
    items: [
      "CPLEX",
      "AMPL",
      "Programação Inteira Mista (MILP)",
      "Modelagem Não-Linear",
      "Metaheurísticas",
      "Otimização de Redes Elétricas",
    ],
  },
];
