---
title: Personal Expenses
order: 3
category: Engenharia de Dados · Categorização
kind: light
trace: pipeline
summary: >-
  Faturas de cartão de crédito viram dados organizados, categorias revisáveis e
  painéis de tendências, recorrências e projeção de parcelas.
metric:
  label: arquitetura
  value: "medalhão MySQL"
  sub: Raw · Bronze · Silver
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
