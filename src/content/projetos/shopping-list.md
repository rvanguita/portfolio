---
title: Shopping List Intelligence
order: 7
repo: personal-shopping-list
category: Engenharia de Dados · OCR
kind: light
trace: pipeline
summary: >-
  Notas fiscais e arquivos CSV viram um histórico estruturado de compras,
  indicadores de preço e uma lista de reposição inteligente.
metric:
  label: arquitetura
  value: "medalhão + OCR"
  sub: Raw · Bronze · Silver em MySQL
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
