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
      "Construção de pipelines e lakehouses, da ingestão à disponibilização de dados, com orquestração e validações reproduzíveis.",
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
      "Preparação de dados, comparação de modelos e análise dos fatores que explicam uma previsão.",
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
      "APIs e painéis para explorar dados e apoiar decisões, conectados às camadas analíticas dos projetos.",
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
      "Modelagem matemática e heurísticas para avaliar alternativas e resolver problemas de planejamento de sistemas elétricos.",
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
