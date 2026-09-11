---
title: Modelagem da Geração de Energia Eólica
order: 6
category: Regressão · Energia
kind: full
metricKind: medida
trace: power
summary: >-
  Prever a geração de turbinas eólicas onshore ao longo de um ano — curva de
  potência não linear e série sazonal descartam modelo linear e validação
  cruzada comum.
leadHtml: >-
  Prever a geração de energia de turbinas eólicas onshore ao longo de um ano. A
  curva de potência de uma turbina é <strong>não linear</strong>, o que descarta
  modelos lineares; e, por ser uma <strong>série temporal</strong>, a validação
  cruzada tradicional também não se aplica — removeria o viés sazonal de alguns
  meses.
metric:
  label: R²
  value: "0,819"
  sub: RMSE 12,41 · MAE 8,76
stack: Python · XGBoost · SHAP · Pandas · Matplotlib
repos:
  - label: GitHub
    url: https://github.com/rvanguita/wind-farm
description: >-
  Estudo de caso: previsão da geração de turbinas eólicas onshore ao longo de um
  ano com XGBRegressor, validação temporal por janela expansível e
  interpretabilidade via SHAP. Dataset público do Zenodo; R² 0,819.
---

## Problema

A geração eólica responde de forma não linear ao vento e varia bastante entre os
meses do ano. O objetivo é um modelo que preveja a potência de turbinas onshore
ao longo de um ciclo anual completo, respeitando a ordem cronológica dos dados.

## Dados

Os dados vêm do repositório público do **Zenodo**: séries amostradas a cada 10
minutos de seis turbinas (WT1–WT6) e três mastros meteorológicos. Foram modeladas
as turbinas onshore WT3 e WT4, com cinco variáveis ambientais — velocidade e
direção do vento, densidade do ar, intensidade de turbulência e cisalhamento
vertical. A análise exploratória (heatmap de correlação, boxplots por mês) mostra
relação forte entre potência, velocidade do vento e mês do ano.

## Método

Como a curva de potência é não linear, um modelo baseado em árvores leva
vantagem: o **XGBRegressor** constrói árvores em sequência, cada uma corrigindo
os resíduos da anterior. Seis esquemas de validação temporal foram comparados; a
**janela expansível** (expanding window) preserva a ordem cronológica e o viés
sazonal dos meses.

## Resultado

A janela expansível não teve o menor erro absoluto, mas foi a que teve o menor
viés relativo entre meses — critério de escolha para produção, não só a métrica
isolada. Resultado: **R² de 81,9%**, RMSE de 12,41 e MAE de 8,76. A análise
**SHAP** quantifica a contribuição de cada variável — a velocidade do vento é a
mais relevante.
