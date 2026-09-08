---
title: Bank Customer Churn Prediction
order: 3
category: Classificação · Risco
kind: full
trace: threshold
summary: >-
  Antecipar quais clientes de um banco europeu vão encerrar a conta, para agir
  na retenção antes do cancelamento.
leadHtml: >-
  Identificar, antes do cancelamento, quais clientes de um banco europeu têm
  maior propensão a encerrar a conta. Reter um cliente custa bem menos do que
  adquirir um novo — no dataset analisado, <strong>20,4%</strong> da base havia
  deixado o banco no período coberto pelos dados.
metric:
  label: ROC AUC
  value: "0,936"
  sub: acurácia 0,904 · MCC 0,67
stack: Python · CatBoost · LightGBM · XGBoost · SHAP · MLflow · Docker
repos:
  - label: GitHub
    url: https://github.com/rvanguita/bank-customer-churn
description: >-
  Estudo de caso: previsão de evasão de clientes de um banco europeu com XGBoost
  (ROC AUC 93,6%), comparação com CatBoost e LightGBM, engenharia de features e
  interpretabilidade via SHAP.
---

## Problema

O banco precisa de uma lista priorizada de contas em risco para direcionar ações
de retenção, e de uma leitura do *porquê* de cada risco — não só um rótulo. O
alvo é a probabilidade de evasão por cliente, com os fatores que a explicam.

## Dados

Base pública do Kaggle com cerca de 10 mil clientes e 20,4% de evasão. Uma
decisão deliberada: a coluna de reclamações foi **excluída** do treinamento,
porque praticamente todo cliente que reclamou também saiu do banco — mantê-la
tornaria a previsão artificialmente trivial, escondida atrás de uma variável de
vazamento em vez de um padrão de comportamento real.

## Método

A engenharia de features agrupou **idade** em faixas e **saldo** em categorias, e
cruzou as duas variáveis via features polinomiais (idade², saldo², idade×saldo) —
combinação que a análise exploratória já apontava como relevante.

Três modelos de gradient boosting — **CatBoost**, **LightGBM** e **XGBoost** —
foram comparados com validação cruzada. O CatBoost teve o melhor ROC AUC, mas com
inferência cerca de **5×** mais lenta; para um ganho marginal de métrica, o
XGBoost foi o modelo levado a produção.

## Resultado

No conjunto de teste, o XGBoost atinge **ROC AUC de 93,6%**, acurácia de 90,4% e
Coeficiente de Matthews de 0,67 (≈ 0,868 de ROC AUC em validação cruzada). A
análise **SHAP** aponta idade — em faixas mais avançadas — e ter exatamente dois
produtos contratados como os fatores de maior impacto.

Vale a ressalva: métricas dessa magnitude num problema de churn são incomuns em
dados de produção real, o que sugere que o dataset público carrega algum viés de
geração — um ponto discutido no próprio repositório, não escondido dos
resultados.
