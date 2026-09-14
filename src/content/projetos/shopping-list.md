---
title: Shopping List Intelligence
order: 5
category: Engenharia de Dados · OCR
periodo: "2026"
atualizadoEm: "2026-09-08"
kind: light
metricKind: arquitetura
summary: >-
  OCR de nota fiscal e importação CSV num pipeline medalhão MySQL, com
  normalização incremental e estatísticas de preço recalculadas a cada carga.
metric:
  label: arquitetura
  value: "medalhão + OCR"
  sub: Raw · Bronze · Silver em MySQL
architecture:
  caption: Da nota fiscal ao histórico consultável — medalhão em três bancos MySQL.
  stages:
    - layer: source
      name: Nota fiscal
      detail: NFC-e por OCR ou importação CSV
      tech: Gemini
    - layer: raw
      name: Raw
      detail: Registro cru preservado
      tech: MySQL
    - layer: bronze
      name: Bronze
      detail: Tipagem e normalização por raw_id
      tech: MySQL
    - layer: silver
      name: Silver
      detail: Estatísticas por produto, mercado e mês
      tech: MySQL
  outputs:
    - role: Painel
      tech: Streamlit
stack: Python · Streamlit · Google Gemini (OCR) · MySQL · SQL · Docker
repos:
  - label: GitHub
    url: https://github.com/rvanguita/personal-shopping-list
spec:
  problema: >-
    Transformar notas fiscais e planilhas de compras num histórico consultável —
    com indicadores de preço e um aviso de quando cada produto provavelmente
    precisa ser recomprado.
  dados: >-
    Itens extraídos de imagens de nota fiscal (NFC-e) pelo Gemini, ou importados
    por CSV com quantidade, preço unitário e total; preservados crus na camada
    Raw antes de qualquer tratamento.
  metodo: >-
    Pipeline medalhão em três bancos MySQL — Raw (registro cru), Bronze (tipagem
    e normalização incremental por raw_id), Silver (estatísticas por produto,
    mercado e mês, recalculadas a cada alteração); dashboard Streamlit lê Bronze
    e Silver.
  resultado: >-
    App com três páginas — Lista de Compras (produtos acima do intervalo médio
    de recompra), Análise de Preços (evolução e altas relevantes) e Mercados
    (onde se compra, gasto e ticket médio) — mais edição manual dos registros já
    processados.
description: >-
  Shopping List Intelligence: notas fiscais via Gemini OCR e importação CSV num
  pipeline medalhão MySQL (Raw/Bronze/Silver), com lista de reposição inteligente
  e análise de preços e mercados em Streamlit.
---
