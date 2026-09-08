---
title: Credit Card Fraud Detection
order: 5
repo: fraud-detection
category: Detecção de Fraude
kind: light
trace: imbalance
summary: >-
  Detectar transações fraudulentas de cartão num dataset real fortemente
  desbalanceado, sem se deixar enganar por métricas infladas.
metric:
  label: fraude
  value: "0,17%"
  sub: 284.807 registros · em desenvolvimento
stack: Python · XGBoost · Optuna · SMOTE/ADASYN · SHAP · TensorFlow (LSTM)
repos:
  - label: GitHub
    url: https://github.com/rvanguita/fraud-detection
spec:
  problema: >-
    Detectar transações fraudulentas de cartão num dataset real fortemente
    desbalanceado, sem se deixar enganar por métricas infladas.
  dados: >-
    Dataset ULB de transações reais europeias — 284.807 registros, 31 colunas
    anonimizadas por PCA, com fraudes em ~0,17% dos casos.
  metodo: >-
    Reamostragem (SMOTE/ADASYN), XGBoost ajustado por Optuna com objetivo voltado
    a PR-AUC e uma rede LSTM com focal loss.
  resultado: >-
    Em desenvolvimento — pipeline de tratamento do desbalanceamento montado,
    ainda sem resultado consolidado.
description: >-
  Detecção de fraude em transações de cartão num dataset real fortemente
  desbalanceado (ULB, ~0,17% de fraude): reamostragem SMOTE/ADASYN, XGBoost por
  Optuna para PR-AUC e uma LSTM com focal loss.
---
