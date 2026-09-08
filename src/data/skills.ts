// Competências — 4 grupos. `skill-n` no site é a contagem real de itens do grupo.
// Texto preservado do site anterior (#competencias).
export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Ciência de Dados & ML",
    items: [
      "Python",
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
    title: "Pesquisa Operacional & Otimização",
    items: [
      "CPLEX",
      "AMPL",
      "Programação Inteira Mista (MILP)",
      "Modelagem Não-Linear",
      "Metaheurísticas",
      "Otimização de Redes Elétricas",
    ],
  },
  {
    title: "Visualização & Business Analytics",
    items: [
      "Power BI",
      "Tableau",
      "Matplotlib",
      "Seaborn",
      "Excel Avançado",
      "Estatística Descritiva & Inferencial",
    ],
  },
  {
    title: "Linguagens, Cloud & Ferramentas",
    items: [
      "SQL",
      "Apache Airflow",
      "Delta Lake / PySpark",
      "FastAPI",
      "Streamlit",
      "Docker",
      "Git / GitHub Actions",
      "Linux / Shell",
    ],
  },
];
