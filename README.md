# FastF1 Data Platform

Plataforma de dados e machine learning para transformar dados de corridas de Fórmula 1 em informação pronta para análise, previsão e tomada de decisão.

## O que este projeto faz

O projeto coleta dados de corridas, treinos, classificações, tempos de volta e condições climáticas por meio da biblioteca [FastF1](https://docs.fastf1.dev/). Esses dados são organizados, processados e disponibilizados em um fluxo automatizado:

```text
FastF1 API → Raw/Parquet → Bronze/Delta Lake → Silver/Delta Lake
           → MySQL / AWS S3 → MLflow → FastAPI / Streamlit
```

Na prática, a plataforma transforma dados brutos e heterogêneos em uma base confiável para responder perguntas como:

- Como pilotos e equipes vêm evoluindo ao longo da temporada?
- Quais padrões aparecem em tempos de volta e condições de pista?
- Como disponibilizar previsões de campeonato por uma API e um dashboard?

## Arquitetura

| Camada | Responsabilidade |
| --- | --- |
| Ingestão | Extrair dados da Fórmula 1 usando FastF1 e armazená-los em Parquet. |
| Raw | Preservar os dados brutos, particionados e reproduzíveis. |
| Bronze | Consolidar os dados em tabelas Delta Lake com versionamento ACID. |
| Silver | Curar e agregar estatísticas de pilotos, construtores e voltas. |
| Orquestração | Executar o pipeline semanalmente com Apache Airflow. |
| Machine Learning | Treinar e rastrear modelos com Scikit-Learn e MLflow. |
| Serviços | Expor inferências via FastAPI e análises via Streamlit/Plotly. |
| Persistência | Espelhar dados em MySQL e arquivar artefatos no AWS S3. |

## Principais funcionalidades

- Ingestão automatizada de dados de corridas, treinos e telemetria.
- Processamento em camadas Raw, Bronze e Silver.
- Orquestração por DAG semanal, com controle de tarefas e linhagem.
- Rastreabilidade de modelos e métricas usando MLflow.
- Endpoint `/predict` para inferência em tempo real.
- Dashboard interativo para exploração de resultados e previsões.
- Ambiente reproduzível com Docker e Docker Compose.

## Tecnologias

`Python` · `FastF1` · `Apache Airflow` · `Delta Lake` · `PySpark` · `Pandas` · `Scikit-Learn` · `MLflow` · `FastAPI` · `Streamlit` · `Plotly` · `MySQL` · `AWS S3` · `Docker`

## Links

- [Código-fonte da plataforma](https://github.com/rvanguita/lake-fastf1)
- [Case study visual](https://rvanguita.github.io/portfolio/projects/lake-fastf1.html)

## Status

Projeto ativo, desenvolvido como uma aplicação prática de engenharia de dados, arquitetura Lakehouse e MLOps aplicada ao domínio da Fórmula 1.
