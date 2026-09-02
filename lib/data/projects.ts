import type { Project } from "@/lib/types";

/**
 * Migrado de _data/projects.yml. Única mudança de conteúdo: a action do case
 * study aponta para a rota Next `/projects/lake-fastf1/` (antes
 * `/projects/lake-fastf1.html`).
 */
export const projects: Project[] = [
  {
    key: "fastf1",
    category: "de",
    badgeIcon: "flag",
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
      { label: "Estudo de Caso", url: "/projects/lake-fastf1/", primary: true },
      { label: "GitHub", url: "https://github.com/rvanguita/lake-fastf1" },
    ],
  },
  {
    key: "wind-farm",
    category: "ml",
    badgeIcon: "sun",
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
        text: "RMSE de 12,41% e R² de 81,93%, com velocidade do vento como variável mais relevante.",
      },
    ],
    techTags: ["Python", "XGBoost", "SHAP", "Pandas", "Matplotlib"],
    actions: [
      { label: "Estudo de Caso", url: "/projects/wind-farm/", primary: true },
      {
        label: "Ver Código no GitHub",
        url: "https://github.com/rvanguita/wind-farm",
      },
    ],
  },
  {
    key: "bank-churn",
    category: "analytics",
    badgeIcon: "building-library",
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
        text: "ROC-AUC de 93,63% e acurácia de 90,43% com o modelo XGBoost em produção.",
      },
    ],
    techTags: ["Python", "XGBoost", "SHAP", "MLflow", "Docker"],
    actions: [
      {
        label: "Ver Código no GitHub",
        url: "https://github.com/rvanguita/bank-customer-churn",
      },
    ],
  },
  {
    key: "distribuicao-eletrica",
    category: "opt",
    badgeIcon: "bolt",
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
        text: "mesma qualidade de solução do método Cônico clássico, com redução de até <strong>10x no tempo computacional</strong>.",
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
    category: "analytics",
    badgeIcon: "shield-check",
    badgeLabel: "Detecção de Fraude & Risco",
    title: "Credit Card Fraud Detection",
    challenge:
      "identificar transações fraudulentas em um dataset real de cartão de crédito extremamente desbalanceado (fraude é menos de 1% dos casos).",
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
        label: "Ver Código no GitHub",
        url: "https://github.com/rvanguita/fraud-detection",
      },
    ],
  },
  {
    key: "sentiment-nlp",
    category: "ml",
    badgeIcon: "chat-bubble",
    badgeLabel: "NLP & Processamento de Linguagem Natural",
    title: "Sentiment Identification NLP",
    challenge:
      "classificar o sentimento de ~100 mil avaliações de clientes de um e-commerce brasileiro (dataset Olist).",
    highlights: [
      {
        label: "Solução",
        text: "pipeline de pré-processamento textual (stopwords em português, stemming RSLP, TF-IDF) e XGBClassifier com tuning via Optuna (100 trials, validação cruzada estratificada).",
      },
      {
        label: "Resultado",
        text: "acurácia de 89,17% e ROC-AUC de 94,77% na classificação binária, com experimento A/B estendendo o modelo para a classe neutra.",
      },
    ],
    techTags: ["Python", "XGBoost", "TF-IDF", "Optuna"],
    actions: [
      {
        label: "Ver Código no GitHub",
        url: "https://github.com/rvanguita/sentiment-identification-nlp",
      },
    ],
  },
];
