# Relatório de simplificação

Entregável previsto no PRD ("relatório curto das decisões de simplificação") e
no prompt ("documentar o que foi simplificado e por quê").

## O ponto de partida

Os três documentos em `docs/` foram commitados **depois** do redesign
(`62fda265`), que já havia implementado a maior parte do que eles pedem:
`global.css` caiu de ~1100 para 334 linhas, a página inicial ficou com 229 e as
páginas secundárias já estavam enxutas.

Este trabalho, portanto, não foi uma segunda rodada de corte. Foi uma auditoria
de conformidade: conferir o estado atual item a item contra o prompt, o PRD e o
SDD, e implementar só o que ainda faltava. A maioria dos requisitos já estava
satisfeita e não foi tocada.

## O que foi removido

| Removido                                                         | Por quê                                                                                                         |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/components/panels/Proof.astro` (60 linhas)                  | Zero imports. Seu CSS já havia sido removido, então as classes que referenciava não existiam mais.              |
| `src/components/viz/Trace.astro` (166 linhas)                    | Idem — o maior componente do repositório, renderizado em lugar nenhum.                                          |
| Campo `trace` no schema e nos 9 projetos                         | Era **obrigatório** em todo projeto e existia só para alimentar o `Trace.astro`.                                |
| Linha de links do hero (Dossiê · LinkedIn · GitHub)              | Repetia exatamente o rodapé, que aparece em todas as páginas. O hero caiu de 11 para 8 alvos clicáveis.         |
| Tokens `--wdth-data` e `--rail`                                  | Zero referências em `global.css`; eram tokens avulsos, não degraus de escala.                                   |
| Exports `profile.role`, `profile.city`, `timeAxis`, `scaleYears` | Zero consumidores. O dossiê em PDF lê a própria cópia em `scripts/dossier-content.json`, então não foi afetado. |

## O que passou a vir dos dados

Regra do SDD: "manter textos e métricas fora dos componentes quando já houver
arquivos de dados apropriados." Na abertura, três textos estavam escritos à mão
e duplicavam informação que já existia no projeto:

- o resumo do destaque agora usa `spotlight.data.summary`;
- a ressalva ("Arquitetura implementada · modelo preditivo experimental") agora
  é derivada de `METRIC_TAG[metricKind]` + `metric.sub`, o mesmo vocabulário que
  o cartão e a legenda do catálogo usam — os três não podem mais divergir;
- o eyebrow usa `spotlight.data.category`, que corrige a descrição de
  "Lakehouse" para "Lakehouse · MLOps".

O texto renderizado da ressalva é idêntico ao anterior; mudou a fonte, não a
frase.

## O que foi mantido de propósito

**Os quatro grupos de competências na página inicial.** O SDD pede "até três
blocos curtos". O redesign fechou em quatro, e cortar um removeria evidência
real: "Otimização" é o grupo que sustenta o doutorado e a publicação no
INDUSCON. A restrição de três era cosmética; a evidência não é.

**Os estágios do `Pipeline.astro` escritos no componente.** São a arquitetura do
FastF1, e o CLAUDE.md exige fidelidade ao estudo de caso. Transformá-los em
dados genéricos só moveria o acoplamento de lugar.

**`--s-1` e `--fs-2xs`, sem uso hoje.** São os degraus mínimos da escala de
espaçamento e de tipografia. Removê-los não elimina código morto, trunca um
sistema — e os 12 px de `--fs-2xs` são o piso que o próprio CLAUDE.md reserva
para metadados secundários.

## Correção registrada

Durante a auditoria, uma recontagem dos certificados sugeriu 25 entradas e o
CLAUDE.md e o README foram alterados para esse número. A recontagem estava
errada: o `grep` pegava também a linha `name: string` da interface TypeScript.
São **24 certificados** em 24 arquivos distintos, como os dois documentos já
diziam. A alteração foi revertida.

## Verificação

- `npm run format:check`, `npm run build` e `npm run check`: passam, sem erros,
  avisos ou dicas.
- 14 páginas geradas; **0** links internos quebrados em toda a `dist/`.
- Contagens preservadas: 9 projetos, 28 competências em 4 grupos, 24 certificados.
- Sem overflow horizontal em 360, 768 e 1440 px, com os viewports medidos dentro
  de um iframe da largura exata (a janela do headless não entrega a largura
  pedida). Nenhum elemento ultrapassa a viewport nas três páginas revisadas —
  início, catálogo e a ficha do FastF1.
- Temas claro e escuro revisados; o controle CSS-only continua invertendo a
  preferência do sistema.
- Os três links que saíram do hero (Dossiê, LinkedIn, GitHub) seguem no rodapé
  de todas as páginas, ao lado do e-mail.
