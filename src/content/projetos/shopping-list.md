---
title: Shopping List Intelligence
order: 5
category: Engenharia de Dados · OCR
periodo: "2026"
atualizadoEm: "2026-09-08"
kind: full
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
description: >-
  Shopping List Intelligence: notas fiscais via Gemini OCR e importação CSV num
  pipeline medalhão MySQL (Raw/Bronze/Silver), com lista de reposição inteligente
  e análise de preços e mercados em Streamlit.
---

## Problema

Preço de supermercado sobe sem aviso e a memória é péssima para detectar isso. Pagar
oito reais num produto parece normal até o histórico mostrar que ele custava cinco há
quatro meses — e que o mercado da esquina cobra seis.

O outro lado do mesmo problema é a reposição: itens acabam em intervalos razoavelmente
regulares, e quem faz a lista de cabeça esquece metade. Eu queria as duas respostas a
partir do que já existe — a nota fiscal do que foi comprado.

## Dados

Duas entradas. A primeira é a foto da nota fiscal, processada por OCR com o **Google
Gemini**, cuja resposta em JSON vira uma tabela editável — a revisão acontece **antes**
da gravação, porque OCR de cupom erra e corrigir depois é pior. A segunda é CSV, com
quantidade, preço unitário, total da linha e os metadados de NFC-e.

Os campos se reconciliam entre si: quando só há dois dos três valores, o terceiro é
derivado. Quantidade ausente ou inválida vira `1`. Chave de acesso e URL da NFC-e são
guardadas mas **não entram nas agregações financeiras** — são rastro de origem, não
dado analítico.

## Método

Medalhão em bancos MySQL separados. A **Raw** preserva o registro como chegou, com a
origem da ingestão. A **Bronze** limpa, tipa e normaliza nome de produto — e é aqui que
a reconciliação de quantidade, preço unitário e total acontece.

A **Silver** não é uma tabela, são três: estatística por produto, por mercado e por mês.
As duas camadas têm estratégias de atualização diferentes, e isso é decisão, não
descuido: **Raw → Bronze é incremental por `raw_id`**, enquanto as tabelas Silver são
**recalculadas por inteiro** a partir da Bronze depois de cada alteração. Corrigir um
registro antigo precisa refletir em todas as médias, e recalcular tudo num volume
doméstico é mais barato que manter agregação incremental correta.

## Resultado

Seis páginas em Streamlit, da lista de compras à edição dos registros já processados.

A sugestão de reposição compara os dias desde a última compra com o intervalo médio
histórico do produto. Vale dizer com todas as letras o que isso é: uma **heurística**,
não previsão de demanda. O projeto não tenta modelar consumo — ele mostra o intervalo e
deixa a decisão com quem lê.
