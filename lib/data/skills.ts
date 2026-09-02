import type { SkillGroup } from "@/lib/types";

/** Migrado de _data/skills.yml — conteúdo inalterado. */
export const skills: SkillGroup[] = [
  {
    icon: "cpu-chip",
    title: "Ciência de Dados & ML",
    domain: "ml",
    tags: [
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
    icon: "bolt",
    title: "Pesquisa Operacional & Otimização",
    domain: "opt",
    tags: [
      "CPLEX",
      "AMPL",
      "Programação Inteira Mista (MILP)",
      "Modelagem Não-Linear",
      "Metaheurísticas",
      "Otimização de Redes Elétricas",
    ],
  },
  {
    icon: "chart-pie",
    title: "Visualização & Business Analytics",
    domain: "analytics",
    tags: [
      "Power BI",
      "Tableau",
      "Matplotlib",
      "Seaborn",
      "Excel Avançado",
      "Estatística Descritiva & Inferencial",
    ],
  },
  {
    icon: "command-line",
    title: "Linguagens, Cloud & Ferramentas",
    domain: "de",
    tags: [
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
