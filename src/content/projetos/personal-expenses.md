---
title: Personal Expenses
order: 4
category: Engenharia de Dados · Categorização
periodo: "2026"
atualizadoEm: "2026-09-08"
kind: full
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
description: >-
  Personal Expenses: faturas de cartão num pipeline medalhão MySQL
  (Raw/Bronze/Silver), categorização por histórico, dicionário e Gemini, e
  dashboard Plotly com tendências, recorrências e projeção de parcelas.
---

## Problema

Fatura de cartão chega como CSV e sai do banco já hostil à análise: cabeçalho em
português ou inglês conforme o emissor, valores como texto, parcelas embutidas na
descrição e o mesmo comerciante escrito de três formas. Sem tratamento, dá para
somar o mês — e não muito mais.

O que eu queria responder era outra coisa: para onde o dinheiro vai por categoria,
o que é recorrente, e **quanto dos próximos meses já está comprometido** em parcelas
contratadas. O projeto trata isso como exercício de engenharia sobre dados próprios,
não como aconselhamento financeiro, e o limite de referência dos relatórios é
configurável justamente para não passar por recomendação.

## Dados

Faturas em CSV, carregadas em lote. O parser aceita os dois idiomas de cabeçalho e
alinha as colunas automaticamente, porque emissores mudam o formato sem avisar. A
deduplicação acontece **entre cargas**: reenviar a mesma fatura não duplica lançamento.

Três bancos MySQL independentes, com o mesmo nome de tabela em cada. A aplicação cria
tabela ausente e acrescenta coluna nova esperada sem migração manual — decisão que
troca rigor de schema por tolerância a um formato de origem que não controlo.

## Método

Medalhão com as camadas separadas por banco, não por schema: **Raw** guarda a string
como veio, com o arquivo de origem; **Bronze** tipa datas, valores monetários,
parcelas e identificadores; **Silver** enriquece com categoria, motivação e origem da
classificação.

A categorização é em cascata, do mais barato ao mais caro: primeiro o histórico já
classificado na Silver, depois um dicionário local, e só então um lote para o **Google
Gemini** — opcional, e com revisão antes de persistir. O caminho importa tanto quanto o
rótulo, e por isso a origem da classificação é gravada junto.

Algumas regras decidem o número final e ficam explícitas: pagamento de fatura não é
compra e sai do gasto líquido; reembolso negativo abate; parcela futura é projetada a
partir da atual e do total contratado. Aliases de comerciante são aplicados **na
leitura**, sem reescrever o que foi persistido.

## Resultado

Um app Streamlit com sete jornadas sob os mesmos filtros globais — do painel geral e
das tendências à gestão das três camadas, passando pela ingestão e pela revisão da
categorização por IA.

A parte que mais me interessa é de teste: os testes unitários **rodam sem MySQL e sem
Gemini ativos**. A lógica de parsing, tipagem e categorização não depende de
infraestrutura de pé para ser verificada, que é o que torna o projeto mexível meses
depois.
