---
title: Lake Research Map
order: 10
category: Lakehouse · RAG
periodo: "2026"
atualizadoEm: "2026-09-22"
kind: light
summary: >-
  Pipeline medalhão que consolida exports bibliográficos da IEEE Xplore e da
  Elsevier/ScienceDirect num corpus deduplicado e pronto para RAG, com
  orquestração no Airflow e painel Streamlit.
leadHtml: >-
  Dois exports de publicadores diferentes, cada um com seu próprio formato de
  BibTeX, campo de DOI e paginação, viram um corpus único: uma esteira
  <strong>raw → bronze → silver → gold → embed</strong> em MySQL (SQLAlchemy),
  deduplicada por DOI normalizado, ligada aos PDFs disponíveis por fuzzy
  match, e embedada localmente para busca por similaridade — sem depender de
  nenhuma API externa.
metric:
  label: escopo
  value: "pipeline medalhão local"
  sub: raw → bronze → silver → gold → embed
metricKind: arquitetura
stack: Python · Apache Airflow · MySQL · SQLAlchemy · Streamlit · fastembed · Docker · Scikit-Learn · pytest · uv
architecture:
  caption: Dos exports da IEEE Xplore e Elsevier/ScienceDirect ao corpus embedado — cinco camadas em MySQL.
  orchestrator: Apache Airflow · 6 DAGs
  stages:
    - layer: source
      name: Ingestão
      detail: Exports IEEE Xplore e Elsevier/ScienceDirect
      tech: CSV · BibTeX
    - layer: raw
      name: Raw
      detail: Ingestão verbatim, idempotente por hash
      tech: MySQL
    - layer: bronze
      name: Bronze
      detail: IEEE e Elsevier unificados num schema comum
      tech: SQLAlchemy
    - layer: silver
      name: Silver
      detail: Deduplicado por DOI, ligado a PDFs por fuzzy match
      tech: rapidfuzz
    - layer: gold
      name: Gold
      detail: Artigos curados, chunks e embeddings para RAG
      tech: fastembed
  outputs:
    - role: Painel
      tech: Streamlit
repos:
  - label: GitHub
    url: https://github.com/rvanguita/lake-research-map
spec:
  problema: >-
    Escrever um artigo novo sobre planejamento de sistemas de distribuição
    elétrica exige saber, entre várias centenas de candidatos espalhados por
    bases de publicadores diferentes, quais realmente vale citar. IEEE Xplore
    e Elsevier/ScienceDirect exportam formatos incompatíveis — CSV+BibTeX
    contra BibTeX puro, DOI em formatos diferentes, paginação diferente — e
    nada garante que o mesmo artigo indexado nos dois não seja contado duas
    vezes.
  dados: >-
    Dois exports manuais de busca: a IEEE Xplore (CSV de metadados + arquivos
    .bib paginados + PDFs) e a Elsevier/ScienceDirect (só .bib paginado). Os
    números não batem entre si por natureza — cerca de 304 resultados de
    busca na IEEE, cerca de 266 entradas baixadas em .bib, cerca de 96 PDFs
    recuperados — e o pipeline representa essa lacuna em vez de escondê-la.
  metodo: >-
    Cinco camadas em MySQL, uma por estágio, com SQLAlchemy 2.0: raw ingere
    cada arquivo verbatim (CSV, entradas BibTeX, inventário de PDFs); bronze
    une IEEE e Elsevier num schema comum de artigo; silver deduplica por DOI
    normalizado (prefixo `doi.org` removido, minúsculo) e liga PDFs por fuzzy
    match de título; gold produz os artigos curados e os chunks de texto —
    resumo sempre, texto completo quando há PDF ligado — que a etapa embed
    vetoriza localmente com fastembed (ONNX, BAAI/bge-small-en-v1.5), sem
    chave de API nem GPU. O Apache Airflow orquestra as cinco etapas via
    linha de comando, e um painel Streamlit de nove páginas expõe cada
    camada, aciona etapas do pipeline e roda busca por similaridade sobre os
    embeddings.
  resultado: >-
    O pipeline completo roda ponta a ponta e o painel cobre as nove páginas
    planejadas, incluindo busca por similaridade via <code>scikit-learn</code>
    quando há embeddings, com fallback por palavra-chave quando não há. O
    projeto está <strong>em desenvolvimento</strong>: o corpus é
    deliberadamente parcial (ver Dados) e não há benchmark de recuperação
    publicado — a suíte pytest cobre a lógica pura de transformação e o fluxo
    de deduplicação/ligação de PDF contra SQLite em memória, sem cobrir ainda
    os DAGs do Airflow nem a interface Streamlit.
description: >-
  Estudo de caso do Lake Research Map: pipeline medalhão que consolida exports
  da IEEE Xplore e Elsevier/ScienceDirect num corpus bibliográfico
  deduplicado, com Airflow, painel Streamlit e embeddings locais para RAG.
---
