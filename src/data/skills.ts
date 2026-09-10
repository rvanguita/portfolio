// Competências agrupadas pela aplicação, com Engenharia de Dados em primeiro plano.
export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Engenharia de Dados",
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
