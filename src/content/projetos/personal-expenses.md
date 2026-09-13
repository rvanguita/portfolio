---
title: Personal Expenses
order: 4
category: Engenharia de Dados · Categorização
kind: light
metricKind: arquitetura
summary: >-
  Pipeline medalhão em MySQL que vira histórico categorizado de faturas de
  cartão — deduplicação entre cargas, categorização em cascata e projeção de
  parcelas.
metric:
  label: arquitetura
  value: "medalhão MySQL"
  sub: Raw · Bronze · Silver
architecture:
  caption: De faturas CSV a histórico categorizado — medalhão em três bancos MySQL independentes.
  stages:
    - layer: source
      name: Faturas
      detail: CSV de cartão, cabeçalho em pt ou en
      tech: CSV
    - layer: raw
      name: Raw
      detail: Registro cru, sem tratamento
      tech: MySQL
    - layer: bronze
      name: Bronze
      detail: Datas, valores e parcelas tipados
      tech: MySQL
    - layer: silver
      name: Silver
      detail: Categoria e origem da classificação
      tech: MySQL
  outputs:
    - role: App
      tech: Streamlit
stack: Python · Streamlit · MySQL · Google Gemini · Plotly · Docker · pytest
repos:
  - label: GitHub
    url: https://github.com/rvanguita/personal-expenses
spec:
  problema: >-
    Transformar faturas de cartão em CSV num histórico categorizado e
    analisável, com projeção das parcelas ainda comprometidas — explicitamente
    sem tratar isso como aconselhamento financeiro.
  dados: >-
    Faturas CSV com cabeçalhos em português ou inglês; preservadas cruas na Raw,
    tipadas na Bronze (datas, valores, parcelas) e enriquecidas na Silver
    (categoria, origem da classificação). Deduplicação entre cargas e alinhamento
    automático de colunas.
  metodo: >-
    Medalhão em três bancos MySQL independentes. Categorização em cascata:
    histórico da Silver → dicionário local → fallback opcional para o Gemini em
    lote, com revisão antes de persistir. Regras: pagamentos de fatura fora do
    gasto líquido, reembolsos negativos abatidos, parcelas futuras projetadas.
  resultado: >-
    App com sete jornadas sob filtros globais — dashboard geral, tendências e
    anomalias, análise por categoria, relatórios e projeções, ingestão,
    categorização por IA e gestão das três camadas. Os testes unitários rodam sem
    MySQL nem Gemini ativos.
description: >-
  Personal Expenses: faturas de cartão num pipeline medalhão MySQL
  (Raw/Bronze/Silver), categorização por histórico, dicionário e Gemini, e
  dashboard Plotly com tendências, recorrências e projeção de parcelas.
---
