# SDD — Implementação do portfólio simples

## Decisão técnica

Manter a arquitetura atual em Astro estático e reduzir a complexidade na camada de apresentação. A mudança deve ser incremental, baseada nos dados já existentes e sem introduzir dependências novas.

## Estrutura a preservar

- `src/pages/` para as rotas públicas;
- `src/content/projetos/` para os detalhes dos projetos;
- `src/data/profile.ts` para identidade e contatos;
- `src/data/skills.ts` para competências;
- `src/data/timeline.ts` para trajetória;
- `src/data/certificates.ts` para certificações;
- `src/components/layout/` para layout, navegação e rodapé;
- `src/components/panels/` para blocos de conteúdo reutilizáveis;
- `src/styles/tokens.css` e `src/styles/global.css` para tokens e estilos globais.

## Arquitetura da página inicial

1. **Cabeçalho**: nome, cargo, especialidade, contato principal e navegação curta.
2. **Resumo**: uma frase sobre o tipo de problema resolvido e a forma de trabalho.
3. **Capacidades**: até três blocos curtos, cada um ligado a um projeto.
4. **Projetos em destaque**: FastF1, Rota do Perfume e Bank Churn, ou os três projetos mais fortes após revisão de conteúdo.
5. **Prova resumida**: trajetória ou uma seleção pequena de evidências.
6. **Chamada final**: contato e link para o portfólio completo ou PDF.

Informações extensas devem permanecer nas páginas secundárias. A home não deve repetir integralmente competências, certificados ou descrições longas.

## Regras de componentes

- reutilizar componentes existentes antes de criar novos;
- remover componentes visuais que não carreguem informação útil;
- preferir HTML semântico, listas e links nativos;
- manter componentes de apresentação pequenos e orientados a dados;
- evitar componentes que dependam de estado no cliente;
- manter textos e métricas fora dos componentes quando já houver arquivos de dados apropriados.

## Regras de estilo

- conservar tokens semânticos de cor e espaçamento;
- limitar a hierarquia tipográfica a título, subtítulo, corpo e rótulo;
- usar uma cor de ação consistente;
- reduzir bordas, sombras e decorações;
- preservar foco visível, contraste e área mínima de toque;
- manter o tema escuro somente se ele continuar simples e legível;
- não criar gráficos ou ilustrações para substituir texto objetivo.

## Fluxo de implementação

1. Inventariar blocos atuais da home e marcar duplicações.
2. Definir a hierarquia mínima antes de editar componentes.
3. Ajustar dados e textos sem alterar fatos ou métricas.
4. Reutilizar ou simplificar componentes existentes.
5. Validar links internos, arquivos públicos e rotas.
6. Rodar `npm run format:check`, `npm run check` e `npm run build`.
7. Revisar visualmente em 360, 768 e 1440 px, incluindo tema claro e escuro se mantido.
8. Registrar no PR quais elementos foram removidos, mantidos ou movidos.

## Riscos e controles

| Risco                                        | Controle                                                      |
| -------------------------------------------- | ------------------------------------------------------------- |
| Simplificação remover evidências importantes | manter os detalhes nas páginas secundárias                    |
| Perda de contexto das métricas               | preservar rótulos, origem e ressalvas                         |
| Quebra de links existentes                   | validar rotas geradas e URLs públicas                         |
| Visual minimalista ficar genérico            | manter projetos, stack e resultados concretos                 |
| Reintrodução de complexidade                 | exigir justificativa para cada novo componente ou dependência |

## Definição de pronto

A implementação estará pronta quando a home comunicar função, foco, evidências e contato com poucos blocos, quando as páginas secundárias continuarem acessíveis e quando as validações técnicas e visuais passarem sem introduzir dependências ou rotas novas sem justificativa.
