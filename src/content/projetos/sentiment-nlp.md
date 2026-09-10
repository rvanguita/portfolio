---
title: Sentiment Identification NLP
order: 9
category: NLP · Classificação
kind: light
trace: sentiment
summary: >-
  Classificar o sentimento de avaliações de um e-commerce brasileiro e medir o
  custo-benefício de incluir a classe "neutro".
metric:
  label: F1 · binário
  value: "0,885"
  sub: ROC AUC 0,948 · multiclasse ≈ 0,62
stack: Python · NLTK/RSLP · TF-IDF · XGBoost · Optuna · SHAP
repos:
  - label: GitHub
    url: https://github.com/rvanguita/sentiment-identification-nlp
spec:
  problema: >-
    Classificar o sentimento de avaliações de um e-commerce brasileiro e medir o
    custo-benefício de incluir a classe "neutro".
  dados: >-
    Dataset Olist — ~100 mil pedidos (2016–2018); comentários rotulados pela
    nota, com 62% positivos e 38% negativos no recorte binário.
  metodo: >-
    Pipeline de texto (regex, stopwords, stemmer RSLP, TF-IDF) + XGBoost ajustado
    por Optuna com validação cruzada estratificada (100 trials).
  resultado: >-
    Modelo binário (positivo × negativo) — F1 0,885 e ROC AUC 0,948; o modelo
    multiclasse com "neutro" cai para F1 ≈ 0,62.
description: >-
  Classificação de sentimento de avaliações de e-commerce (dataset Olist):
  pipeline de texto (RSLP, TF-IDF) + XGBoost por Optuna. Recorte binário F1
  0,885; incluir "neutro" derruba para ≈ 0,62.
---
