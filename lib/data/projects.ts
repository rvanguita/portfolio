import type { Project } from "@/lib/types";

/**
 * Projetos do portfólio. Descrições qualitativas — sem cifras de resultado
 * (método, dataset e stack ficam; nada é inventado).
 */
export const projects: Project[] = [
  {
    key: "fastf1",
    badgeLabel: "Lakehouse & MLOps",
    title: "FastF1 Data Platform",
    challenge:
      "transformar dados de corridas em uma plataforma confiável para análise e previsão.",
    highlights: [
      {
        label: "Solução",
        text: "pipeline Lakehouse em camadas, orquestrado por Airflow e versionado com Delta Lake.",
      },
      {
        label: "Entrega",
        text: "modelo preditivo via FastAPI e dashboard Streamlit para exploração analítica.",
      },
    ],
    techTags: [
      "FastF1",
      "Airflow",
      "Delta Lake",
      "PySpark",
      "FastAPI",
      "Streamlit",
      "MLflow",
      "Docker",
    ],
    actions: [
      { label: "Estudo de caso", url: "/projects/lake-fastf1/", primary: true },
      { label: "GitHub", url: "https://github.com/rvanguita/lake-fastf1" },
    ],
  },
  {
    key: "wind-farm",
    badgeLabel: "Regressão & Energia Renovável",
    title: "Modelagem da Geração de Energia Eólica",
    challenge:
      "prever a geração de energia de quatro turbinas eólicas ao longo de um ano, com curvas de geração não lineares.",
    highlights: [
      {
        label: "Solução",
        text: "modelagem com XGBoost (XGBRegressor) e validação temporal por expanding window, com interpretabilidade via SHAP.",
      },
      {
        label: "Resultado",
        text: "erro de previsão baixo e bom ajuste, com a velocidade do vento como variável mais relevante.",
      },
    ],
    techTags: ["Python", "XGBoost", "SHAP", "Pandas", "Matplotlib"],
    actions: [
      { label: "Estudo de caso", url: "/projects/wind-farm/", primary: true },
      {
        label: "GitHub",
        url: "https://github.com/rvanguita/wind-farm",
      },
    ],
  },
  {
    key: "bank-churn",
    badgeLabel: "Classificação & Negócios",
    title: "Bank Customer Churn Prediction",
    challenge:
      "identificar clientes com maior risco de evasão antes do cancelamento em uma instituição bancária europeia.",
    highlights: [
      {
        label: "Solução",
        text: "comparação de CatBoost, LightGBM e XGBoost com engenharia de atributos (variáveis polinomiais) e interpretabilidade via SHAP.",
      },
      {
        label: "Resultado",
        text: "alta separação entre clientes que evadem e os que permanecem, com XGBoost em produção.",
      },
    ],
    techTags: ["Python", "XGBoost", "SHAP", "MLflow", "Docker"],
    actions: [
      {
        label: "GitHub",
        url: "https://github.com/rvanguita/bank-customer-churn",
      },
    ],
  },
  {
    key: "distribuicao-eletrica",
    badgeLabel: "Pesquisa Operacional (Mestrado & Doutorado)",
    title: "Otimização de Sistemas de Distribuição Elétrica",
    challenge:
      "acelerar decisões de planejamento e expansão em redes elétricas de distribuição de grande porte.",
    highlights: [
      {
        label: "Solução",
        text: "metodologia heurística (mestrado, PUC-Campinas) e metaheurística de Busca Tabu com métodos de apoio à decisão para planejamento de expansão (doutorado, UNICAMP).",
      },
      {
        label: "Resultado",
        text: "mesma qualidade de solução do método Cônico clássico, com redução expressiva do tempo computacional.",
      },
    ],
    techTags: ["AMPL", "CPLEX", "Python", "Busca Tabu", "Metaheurísticas"],
    actions: [
      {
        label: "INDUSCON 2025",
        url: "https://github.com/rvanguita/induscon_2025",
        primary: true,
      },
      {
        label: "Reliability Systems",
        url: "https://github.com/rvanguita/reliability-systems",
      },
      { label: "DEP-TS-MDM", url: "https://github.com/rvanguita/DEP-TS-MDM" },
    ],
  },
  {
    key: "fraud-detection",
    badgeLabel: "Detecção de Fraude & Risco",
    title: "Credit Card Fraud Detection",
    challenge:
      "identificar transações fraudulentas em um dataset real de cartão de crédito fortemente desbalanceado, em que as fraudes são uma fração mínima dos casos.",
    highlights: [
      {
        label: "Solução",
        text: "engenharia de atributos e redução de dimensionalidade com PCA, removendo dados sensíveis e preservando a privacidade bancária.",
      },
      {
        label: "Foco",
        text: "interpretação cuidadosa das métricas de desempenho, já que o forte desbalanceamento de classes infla artificialmente indicadores como a acurácia.",
      },
    ],
    techTags: ["Python", "PCA", "Machine Learning"],
    actions: [
      {
        label: "GitHub",
        url: "https://github.com/rvanguita/fraud-detection",
      },
    ],
  },
  {
    key: "sentiment-nlp",
    badgeLabel: "NLP & Processamento de Linguagem Natural",
    title: "Sentiment Identification NLP",
    challenge:
      "classificar o sentimento de um grande volume de avaliações de clientes de um e-commerce brasileiro (dataset Olist).",
    highlights: [
      {
        label: "Solução",
        text: "pipeline de pré-processamento textual (stopwords em português, stemming RSLP, TF-IDF) e XGBClassifier com tuning via Optuna e validação cruzada estratificada.",
      },
      {
        label: "Resultado",
        text: "boa acurácia e separação de classes na classificação binária, com experimento A/B estendendo o modelo para a classe neutra.",
      },
    ],
    techTags: ["Python", "XGBoost", "TF-IDF", "Optuna"],
    actions: [
      {
        label: "GitHub",
        url: "https://github.com/rvanguita/sentiment-identification-nlp",
      },
    ],
  },
];
