---
title: Rota do Perfume
order: 2
category: MLOps · Vendas
kind: full
trace: propensity
summary: >-
  Lakehouse DuckDB 100% local com modelo de propensão de compra, fila semanal de
  contatos, previsão de faturamento e um loop de feedback comercial.
leadHtml: >-
  Uma esteira de dados e ML <strong>100% local</strong> para priorizar contatos
  comerciais: dos CSVs de CRM e ERP a um lakehouse DuckDB medalhão, um modelo de
  <strong>propensão de compra</strong> versionado no MLflow, uma fila semanal e
  um loop que traz o desfecho das ligações de volta como dado de treino. Nenhum
  comando toca a nuvem.
metric:
  label: escopo
  value: "lakehouse local"
  sub: propensão · previsão · write-back
stack: Python 3.12 · DuckDB · MLflow · Streamlit · uv · ruff · pytest · Docker · Ollama (opcional) · GitHub Actions
repos:
  - label: GitHub
    url: https://github.com/rvanguita/rotaperfume
description: >-
  Rota do Perfume: lakehouse DuckDB 100% local com modelo de propensão de compra
  no MLflow, fila semanal, previsão de faturamento e loop de feedback comercial;
  pipeline de 17 tarefas com make check e CI no GitHub Actions.
---

## Problema

Priorizar a semana de um time comercial: quais clientes ligar primeiro. Além
disso, o projeto é uma **referência de arquitetura** — todo o lakehouse, o
modelo, o dashboard e o fluxo de feedback rodam localmente, sem Databricks nem
qualquer serviço de nuvem.

## Dados

Fixtures CSV de CRM e ERP (`data/crm/`, `data/erp/`), com anomalias intencionais
preservadas para exercitar os contratos de dados. Os totais de controle são
**313.551 linhas de origem** e **3.000 clientes** após a consolidação. Tudo é
materializado em `var/lakehouse_rotaperfume.duckdb`.

## Método

Arquitetura medalhão **bronze → silver → gold** em DuckDB: o bronze preserva a
origem, o silver aplica os contratos e o gold serve dimensões, `fato_vendas`,
marts e views. Sobre o gold roda um modelo de propensão de compra, registrado no
MLflow como `propensao_compra@prod`, que alimenta a `fila_semanal`; junto vêm uma
previsão de faturamento e um assistente de perguntas curadas (SQL). O
`rota pipeline` encadeia **17 tarefas** e termina numa auditoria de metadados,
que falha se qualquer objeto ou coluna `gold` ficar sem `COMMENT`.

## Resultado

O pipeline é reprodutível por `make check` (pipeline → validação → pytest →
ruff), com CI no GitHub Actions a cada PR. O dashboard Streamlit (`:8501`) lê o
gold e a fila; a aba **Acompanhamento** grava o desfecho de cada ligação em
`gold.retorno_ligacao`, que volta como feature no próximo `ml_features` —
fechando o loop de aprendizado. Perguntas livres podem ser respondidas por um
LLM local via Ollama (`:11434`, opcional).
