---
title: FastF1 Data Platform
order: 1
category: Lakehouse · MLOps
kind: full
metricKind: arquitetura
summary: >-
  Consolidar resultados históricos de Fórmula 1 numa base confiável — ingestão,
  curadoria e serving num fluxo único.
leadHtml: >-
  Transformar dados de corridas de Fórmula 1 numa base confiável para análise e
  previsão. A plataforma combina um <strong>Data Lakehouse</strong>, práticas de
  <strong>MLOps</strong> e interfaces analíticas num fluxo ponta a ponta.
metric:
  label: escopo
  value: ponta a ponta
  sub: modelo preditivo experimental
stack: FastF1 · Delta Lake · PySpark · Apache Airflow · Scikit-Learn · MLflow · FastAPI · Streamlit · Docker · AWS S3
repos:
  - label: GitHub
    url: https://github.com/rvanguita/lake-fastf1
description: >-
  Estudo de caso da FastF1 Data Platform: ingestão de dados de Fórmula 1,
  arquitetura Raw/Bronze/Silver com Delta Lake, orquestração no Airflow, MLOps
  com MLflow, API FastAPI e painel Streamlit.
---

## Problema

Resultados de Fórmula 1 estão espalhados por sessões e formatos diferentes. O
objetivo é uma base única, versionada e reproduzível — da ingestão bruta até uma
camada curada — servida por uma API e um painel, não apenas um notebook isolado.

## Dados

A ingestão usa a biblioteca **FastF1** para extrair corridas, treinos livres,
classificações e telemetria, gravando os dados brutos particionados em Parquet na
camada Raw.

## Método

Uma DAG semanal do **Apache Airflow** consolida esses dados em tabelas **Delta
Lake**: a camada Bronze com versionamento ACID e a camada Silver curada, com
estatísticas agregadas de pilotos, construtores e histórico de voltas; ao final,
um espelho em MySQL e cópias arquivadas no AWS S3.

Sobre a camada Silver, um modelo para predição de campeonatos é treinado com
Scikit-Learn e rastreado no **MLflow**, servido por uma API **FastAPI** de baixa
latência e explorado num painel **Streamlit**. Todo o ambiente roda em
contêineres Docker.

## Resultado

A plataforma funciona de ponta a ponta — pipeline medalhão, API e painel. O
modelo de campeonato usa um Random Forest calibrado, com backtest de origem móvel
(cada temporada avaliada só com as anteriores), mas segue **experimental**: o
repositório ainda não publica uma métrica de referência.
