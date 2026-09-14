---
title: Otimização de Sistemas de Distribuição Elétrica
order: 7
category: Pesquisa Operacional
periodo: "2025–26"
atualizadoEm: "2026-06-29"
kind: full
metricKind: publicacao
summary: >-
  Planejar investimento e expansão de redes de distribuição de energia —
  alimentadores, condutores e subestações — sob múltiplos critérios de decisão.
metric:
  label: publicação
  value: INDUSCON
  sub: submetido · 2025 · Anguita Jr., Castro, Lavorato
stack: AMPL · CPLEX · Python · Busca Tabu · Metaheurísticas
repos:
  - label: Artigo submetido — INDUSCON 2025
    url: https://github.com/rvanguita/induscon_2025
  - label: Reliability Systems
    url: https://github.com/rvanguita/reliability-systems
  - label: DEP-TS-MDM
    url: https://github.com/rvanguita/DEP-TS-MDM
description: >-
  Pesquisa operacional do mestrado e do doutorado: planejamento multicritério da
  expansão de sistemas de distribuição de energia com metaheurística de Busca
  Tabu, apoio à decisão e modelagem em AMPL/CPLEX. Artigo submetido à INDUSCON 2025.
---

## Problema

Expandir uma rede de distribuição de energia é decidir onde construir alimentador, qual
bitola de condutor usar em cada trecho e quais subestações construir ou repotenciar — com
o custo de cada escolha amarrado às demais e restrições elétricas a respeitar.

O que torna o problema interessante não é minimizar custo, é que **não existe um critério
só**. Custo de construção, perdas ao longo da operação e confiabilidade puxam a solução
para lados diferentes, e a resposta útil não é um número: é o conjunto de alternativas e o
que cada uma sacrifica.

## Dados

Sete sistemas-teste, de **24 a 138 nós**, publicados abertamente em três repositórios —
que é o que permite a outro grupo reproduzir ou contestar o resultado.

O que cada planilha traz, para o sistema de 27 nós: diagrama unifilar da topologia
inicial, parâmetros gerais, demanda aparente de pico e número de usuários por nó,
comprimento dos trechos a construir, e — o que define o espaço de busca — a tabela de
tipos de condutor com resistência, reatância, corrente máxima e custo de construção de
cada um, mais a potência aparente máxima e o custo de construir ou repotenciar cada
subestação.

## Método

Planejamento multicritério da expansão, com **Busca Tabu** como metaheurística e métodos
de apoio à decisão para ordenar as alternativas. A modelagem matemática é em **AMPL**,
resolvida com **CPLEX**.

A escolha da metaheurística tem motivo: o problema combina variáveis inteiras de decisão
(construir ou não, qual condutor) com o comportamento elétrico da rede, e cresce rápido
demais para enumeração à medida que os nós aumentam — daí a faixa até 138 nós nos casos
maiores.

## Resultado

O artigo **_Multicriteria-Based Expansion Planning in Distribution Systems_** (Anguita
Jr., Castro, Lavorato) foi **submetido** à INDUSCON 2025. Submetido, não aceito: o status
está aqui como está no repositório.

Uma ressalva sobre o que os repositórios publicam. Eles trazem **os dados**, não o código
do solver — a intenção declarada é dar acesso ao conjunto original para que os resultados
possam ser replicados ou estendidos. Reproduzir o trabalho significa remodelar a partir do
artigo, com os dados em mãos, e não rodar um script.
