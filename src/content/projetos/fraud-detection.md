---
title: Credit Card Fraud Detection
order: 8
category: Detecção de Fraude
periodo: "2025"
atualizadoEm: "2025-05-08"
kind: full
metricKind: desenvolvimento
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
description: >-
  Detecção de fraude em transações de cartão num dataset real fortemente
  desbalanceado (ULB, ~0,17% de fraude): reamostragem SMOTE/ADASYN, XGBoost por
  Optuna para PR-AUC e uma LSTM com focal loss.
---

## Problema

Fraude em cartão é o caso didático de classificação desbalanceada: menos de 0,2% das
transações são fraudulentas. O problema real não é treinar um modelo — é **não se
enganar com a métrica**.

Num conjunto com 99,8% de uma classe, um modelo que responde "legítimo" para tudo acerta
99,8%. Acurácia deixa de significar qualquer coisa, e ROC AUC infla, porque o enorme
número de verdadeiros negativos domina a conta. O trabalho aqui é montar o pipeline de
tratamento do desbalanceamento e escolher a métrica que sobrevive a ele.

## Dados

Base pública de transações reais de um banco europeu: **284.807 registros, 31 colunas**,
com fraude em **0,17%** dos casos.

As colunas `V1` a `V28` passaram por PCA antes da publicação — não se sabe o que cada uma
significa. É anonimização, não escolha de modelagem: preserva a privacidade de quem
transacionou, ao custo de tornar a interpretação por variável impossível. Sobram legíveis
apenas `Time`, em segundos desde o primeiro registro, e `Amount`.

Uma armadilha que valeu registrar: a checagem inicial acusou linhas duplicadas. Olhando
de perto, eram **falso positivo** — com valores dessa magnitude e precisão, colunas
distintas coincidem por acaso. Descartar aquelas linhas teria jogado fora transação
legítima.

## Método

Reamostragem para atacar o desbalanceamento — **SMOTE** e **ADASYN** — dentro de um
pipeline, para que a sintetização aconteça só na partição de treino de cada dobra e não
vaze para a validação.

Dois caminhos de modelo, deliberadamente diferentes: **XGBoost** ajustado por **Optuna**
em 100 trials com validação estratificada, e uma rede **LSTM** com **focal loss** — que
ataca o mesmo problema pelo lado da função de custo, dando peso ao caso raro em vez de
reequilibrar a amostra. **SHAP** entra para ler o que o modelo aprendeu, já que as
variáveis anonimizadas não contam essa história sozinhas.

O código de apoio está em `src/` como classes reutilizáveis — o afinador de
hiperparâmetros, a avaliação e os gráficos —, não espalhado pelo notebook.

## Resultado

**Em desenvolvimento.** O pipeline de tratamento do desbalanceamento está montado e os
dois caminhos de modelo rodam, mas **não há resultado consolidado** para publicar.

Não vou anunciar número aqui antes de ter a métrica certa medida do jeito certo — que é
exatamente o erro contra o qual este projeto foi construído.
