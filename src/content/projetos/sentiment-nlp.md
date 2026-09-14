---
title: Sentiment Identification NLP
order: 9
category: NLP · Classificação
periodo: "2025"
atualizadoEm: "2025-04-23"
kind: full
metricKind: medida
summary: >-
  Classificar o sentimento de avaliações de um e-commerce brasileiro e medir o
  custo-benefício de incluir a classe "neutro".
metric:
  label: F1 · binário
  value: "0,885"
  sub: ROC AUC 0,948 · multiclasse ≈ 0,62
stack: Python · NLTK/RSLP · TF-IDF · XGBoost · Optuna · SHAP
repos:
  - label: Notebook que produz a métrica
    url: https://github.com/rvanguita/sentiment-identification-nlp/blob/main/main.ipynb
  - label: GitHub
    url: https://github.com/rvanguita/sentiment-identification-nlp
description: >-
  Classificação de sentimento de avaliações de e-commerce (dataset Olist):
  pipeline de texto (RSLP, TF-IDF) + XGBoost por Optuna. Recorte binário F1
  0,885; incluir "neutro" derruba para ≈ 0,62.
---

## Problema

Avaliação de e-commerce vem com nota e com texto, e as duas nem sempre contam a mesma
história. A pergunta era classificar o sentimento do comentário — e, principalmente,
medir **o que custa acrescentar a classe "neutro"**.

Por isso o projeto foi montado como um experimento A/B: o modelo binário é a variante A,
o multiclasse é a B, e o objeto de estudo é a diferença entre elas.

## Dados

Avaliações de um marketplace brasileiro, com duas colunas aproveitadas: o texto do
comentário e a nota de 1 a 5.

A conversão para rótulo é uma decisão de modelagem, não um dado: notas 1 a 3 viraram
negativo e 4 a 5 positivo. A distribuição resultante é **62% positivo contra 38%
negativo** — desequilíbrio moderado, que já pende a balança antes de qualquer modelo. Há
uma razão cultural plausível para isso: cliente satisfeito raramente escreve sem ser
provocado, enquanto pedido com problema puxa avaliação.

Texto em português exigiu o tratamento correspondente: remoção de stopwords,
**stemming com RSLP** — que é específico do português, não o Snowball genérico — e
vetorização **TF-IDF**.

## Método

Fase 1, binário. Fase 2, o mesmo pipeline com a classe **neutro** separada, agora
sub-representada frente às outras duas.

A parte interessante é o que a fase 2 obrigou a olhar: **calibração de probabilidade**
(via `CalibratedClassifierCV`), métrica **macro contra ponderada** — porque a ponderada
esconde o desempenho ruim na classe rara — e a matriz de confusão especificamente entre
neutro e as outras duas.

No fim, uma função recebe uma frase e devolve o rótulo **junto com o grau de confiança**,
em vez de só o rótulo. Para um classificador com uma classe fraca, entregar a confiança é
o que permite ao consumidor decidir quando não confiar.

## Resultado

No recorte binário: **F1 de 0,885** e **ROC AUC de 0,948**.

No multiclasse, o F1 cai para **≈ 0,62**. Essa queda é o resultado do experimento, não um
efeito colateral dele — acrescentar uma classe sub-representada custa caro, e o número
mostra quanto. A acurácia do multiclasse permanece em 0,836, o que ilustra de novo por
que ela não serve sozinha: ela é sustentada pelas duas classes grandes enquanto a terceira
vai mal.
