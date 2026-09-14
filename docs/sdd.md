# SDD — Implementação do portfólio

> **Sobre os documentos desta pasta.** Este SDD e o [PRD](./prd.md) são os
> documentos vigentes e descrevem a implementação **como ela é hoje**.
> [`historico/`](./historico/) guarda o plano de simplificação, avaliado e
> atendido. Onde a letra dele divergir do que está aqui, **vale o estado atual**.

## Decisão técnica

Site estático em Astro, sem framework de UI, sem roteamento no cliente e sem
JavaScript de cliente. O conteúdo vive em arquivos versionados — TypeScript para
dados estruturados, Markdown para os estudos de caso — e a apresentação é HTML
semântico com CSS.

A consequência prática: o build é a única etapa dinâmica. `astro check` e `tsc`
pegam referência quebrada antes do deploy, e uma referência inválida entre
competência e projeto **falha o build** em vez de renderizar vazio.

## Stack e versões

| Item       | Versão / decisão                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| Astro      | `^7.3.1`, `compressHTML: true`. `output` não é declarado — estático é o padrão                                           |
| Node       | `24.20.0`, fixado em `mise.toml` e nos dois workflows                                                                    |
| TypeScript | `astro check` seguido de `tsc --noEmit`                                                                                  |
| Imagens    | `passthroughImageService()` — assets servidos direto de `public/`, sem `sharp`                                           |
| Fontes     | Archivo Variable (display), IBM Plex Sans 400/500 (corpo), IBM Plex Mono 400/500 (tecnologia e metadado), via fontsource |
| Sitemap    | `@astrojs/sitemap`                                                                                                       |
| Zod        | importado de `astro/zod`, não como dependência própria                                                                   |

`compressHTML: true` preserva os espaços entre elementos inline — por isso alguns
arquivos ficam fora do Prettier (ver "Formatação").

### Aliases

`tsconfig.json` define cinco, todos em uso: `@/`, `@components/`, `@data/`,
`@lib/`, `@styles/`. Importação entre diretórios usa alias; dentro da mesma pasta,
caminho relativo.

## Estrutura de diretórios

```
src/
  config.ts              SITE e NAV — fonte única, compartilhada com astro.config.mjs
  content.config.ts      schema Zod da coleção `projetos`
  data/                  profile, skills, timeline, certificates
  lib/                   url.ts, metric.ts
  content/projetos/      9 arquivos Markdown
  components/
    layout/              BaseHead, Layout, ReadoutStrip, ThemeToggle, Footer
    panels/              Channels, Readout, MetricLegend, Skills
    viz/                 Pipeline, Timeline
  pages/                 index, projetos/index, projetos/[slug], trajetoria,
                         competencias, certificacoes
  styles/                tokens.css, global.css
scripts/                 generate_dossier.py, check_dossier.py, dossier-content.json
public/                  assets, certificates (24 PDFs), icons, robots.txt, .nojekyll
```

## Referência de arquivos

### `src/config.ts`

`SITE` (`url`, `base`, `title`) é a fonte de `site` e `base` em
`astro.config.mjs` — não duplicar esses valores. `NAV` alimenta a navegação
compartilhada e `NavKey` tipa a página ativa.

### `src/lib/url.ts`

Duas funções, e **toda** rota interna e todo asset em `public/` passam por elas:

- `url(path)` prefixa com o `base` (`/projetos/x/` → `/portfolio/projetos/x/`);
- `absoluteUrl(pathWithBase, site)` monta canonical e `og:image`.

Um `href` interno escrito sem `url()` aponta para fora do `/portfolio/` e
quebra — e **nem `astro check` nem `tsc` pegam isso**, porque é uma string
válida. A rede de segurança é abrir `dist/` servido na base, não o build.

### `src/lib/metric.ts`

O vocabulário da aferição tipada: `MetricKind`, `METRIC_KINDS` (ordem de
leitura), `METRIC_TAG` (o termo no cartão) e `METRIC_GLOSS` (o contexto na
legenda). `Readout` e `MetricLegend` leem daqui, para que cartão e legenda não
possam divergir.

### `src/data/`

| Arquivo           | Exporta                     | Contrato                                                                                   |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| `profile.ts`      | `profile`                   | identidade, contatos, `screening` (ficha de triagem), `leadHtml`, `description`, `ogImage` |
| `skills.ts`       | `skills: SkillGroup[]`      | `title`, `summary`, `projectIds`, `items` — 4 grupos, 28 itens                             |
| `timeline.ts`     | `timeline: TimelineEntry[]` | `years`, `from`, `to`, `title`, `org`, `note?` — 9 entradas                                |
| `certificates.ts` | `certGroups`, `certTotal`   | 3 grupos, 24 itens; `file` é o caminho sob `public/certificates/`                          |

`SkillGroup.projectIds` é validado em `Skills.astro`: id inexistente lança e
falha o build. `certTotal` é derivado, nunca escrito à mão. `timeline` guarda
`from`/`to` numéricos para a página calcular o intervalo exibido.

### `src/content.config.ts`

Schema Zod da coleção `projetos`. Campos que carregam regra, não só dado:

- `kind`: `full` (corpo Markdown com os quatro beats) ou `light` (objeto `spec`
  com `problema`, `dados`, `metodo`, `resultado`). Os dois formatos coexistem, e
  um `superRefine` amarra os dois campos: `spec` continua opcional no objeto,
  porque `full` não a usa, mas falta dela num `light` é erro de schema. Sem isso
  um `light` sem ficha publicaria quatro `<dd>` vazios e passaria no build;
- `metricKind`: **obrigatório e sem valor padrão**, de propósito. Só 3 dos 9
  projetos têm métrica aferida, e um padrão silencioso faria escopo e arquitetura
  passarem por resultado medido;
- `architecture`: opcional. Só os 4 projetos com fluxo em camadas real o
  declaram;
- `order`: controla o catálogo; as três primeiras entradas aparecem na home.

### Componentes e contratos de props

| Componente     | Props                                              | Papel                                            |
| -------------- | -------------------------------------------------- | ------------------------------------------------ |
| `Layout`       | `title`, `description?`, `ogType?`, `current?`     | casca das páginas, `slot="head"` para JSON-LD    |
| `BaseHead`     | `title`, `description?`, `ogType?`                 | metadados, canonical, Open Graph, theme-color    |
| `ReadoutStrip` | `current?`                                         | cabeçalho e navegação, marca a página ativa      |
| `ThemeToggle`  | —                                                  | checkbox que inverte o tema do sistema           |
| `Footer`       | —                                                  | identidade, contatos e link do dossiê            |
| `Channels`     | `projects`, `level?`, `columns?`                   | cartões de projeto; `level` controla o heading   |
| `Readout`      | `kind`, `label`, `value`, `sub?`, `class?`         | resultado tipado; decide cadeia vs. linha        |
| `MetricLegend` | —                                                  | publica os quatro tipos ao fim do catálogo       |
| `Skills`       | `compact?`                                         | capacidades; `compact` esconde os itens na home  |
| `Pipeline`     | `architecture`, `variant?`, `headingId?`, `class?` | diagrama de camadas                              |
| `Timeline`     | —                                                  | lista vertical da trajetória, `<h2>` por entrada |

`level` em `Channels` existe porque a home já gastou o `h2` no título da seção e
precisa de `h3`; o catálogo usa `h2`. É hierarquia de heading, não tamanho.

## Rotas e geração

`trailingSlash: "always"` e `build.format: "directory"` — cada rota é um
`index.html` em seu diretório. `projetos/[slug].astro` gera as nove fichas por
`getStaticPaths`, ordenando por `order` e passando `prev`/`next` para a navegação
entre projetos.

## Aferição tipada

O mecanismo que o PRD descreve como regra de produto tem três partes que precisam
concordar:

1. `metricKind` no frontmatter do projeto;
2. `METRIC_TAG` / `METRIC_GLOSS` em `src/lib/metric.ts`;
3. as regras `.metric--<kind>` em `global.css`.

`Readout` também suprime repetição na apresentação: quando o `label` ou um trecho
do `sub` repete a palavra que a etiqueta já diz, o componente esconde — sem
editar o arquivo de conteúdo.

### A rampa medalhão

Quando o `sub` de um resultado de arquitetura tem dois ou mais elos, `Readout`
renderiza uma cadeia e colore **apenas os elos que são camadas de armazenamento**,
casando o termo e nunca a posição. Duas invariantes, ambas já quebradas uma vez:

- `LAYERS` em `Readout.astro` e as regras `.chain--*` em `global.css` têm de
  cobrir os mesmos termos. Um termo em `LAYERS` sem regra correspondente sai
  classificado e sem estilo. Hoje ambos são `raw`, `bronze`, `silver`;
- a cor **reforça** um nome que o elo escreve por extenso — nunca é o único
  portador de significado. Um elo que não é camada (`propensão`, `write-back`)
  fica deliberadamente sem régua.

## Diagrama de arquitetura orientado a dados

`Pipeline.astro` não tem constante de conteúdo. Ele lê o objeto `architecture` do
frontmatter: `caption`, `orchestrator?`, `stages[]` (`layer`, `name`, `detail`,
`tech`) e `outputs[]` (`role`, `tech`).

Regras que o componente e o CSS assumem:

- **fidelidade por projeto**: nenhum diagrama mostra camada que o estudo de caso
  não descreve. Rota do Perfume vai de `bronze` a `gold` e **não tem camada
  raw**; Personal Expenses e Shopping List **não têm orquestrador** e por isso
  omitem o campo;
- **nenhum número mágico**: as grades seguem a contagem real, via `--stage-count`
  e `--output-count` definidos inline pelo componente. `--output-count` está na
  regra base de `.pipeline-outputs` e vale em todas as larguras;
  `--stage-count` só é usado na variante horizontal, dentro de
  `@media (min-width: 70rem)`;
- as saídas não fixam `grid-row`. Coluna definida e linha automática fazem elas
  caírem na mesma linha dos estágios, tenha o projeto orquestrador ou não;
- `outputs` vazio não renderiza a lista, para não deixar conector solto.

Os cinco projetos sem fluxo em camadas **não** têm diagrama, e isso é decisão de
produto: inventar pipeline onde não há contraria a regra de fidelidade.

## Sistema de estilos

Dois arquivos: `tokens.css` (tokens) e `global.css` (componentes). Cor é definida
só em tokens; variação de componente sai de `color-mix()`.

**Quinze cores semânticas**: `paper`, `well`, `ink`, `ink-soft`, `rule`,
`rule-strong`, `accent`, `accent-bright`, `on-accent`, `signal`, `signal-open`,
`layer-raw`, `layer-bronze`, `layer-silver`, `layer-gold`.

**Quatro blocos de tema**, e todos precisam da lista idêntica:

1. `:root` — claro;
2. `@media (prefers-color-scheme: dark) :root` — escuro;
3. `:root:has(#theme-toggle:checked)` — inversão sobre sistema claro;
4. o mesmo dentro do media query escuro — inversão sobre sistema escuro.

Divergir a lista entre blocos quebra a inversão manual. O tema é CSS puro:
checkbox mais `:has()`, sem JavaScript, e o override é local à página de
propósito.

**Duas exceções documentadas** ao "cor só em tokens": os estilos de impressão e o
`theme-color` do `BaseHead` são cópias literais de `--paper` e precisam ser
atualizados quando aquele token mudar.

### A armadilha de especificidade

`.metric-chain li[class*="chain--"]` tem especificidade maior que `.chain--raw`.
Usar o atalho `border-left` na regra base fazia `currentColor` vencer e apagava a
rampa inteira — com as capturas de tela parecendo corretas. Por isso a regra base
define **largura e estilo** e a cor fica só nas regras de camada.

Aula geral: ao adicionar uma regra base com atalho, conferir se ela não vence as
regras de variação por especificidade.

## Acessibilidade

- texto a 4,5:1, bordas de controle e marcadores semânticos a 3:1, nos dois temas
  e nas duas inversões;
- corpo a partir de 16 px, controles a partir de 14 px; 12–13 px reservado a
  metadado secundário; alvo mínimo de 44 px;
- `:focus-visible` com contorno de 3 px e `outline-offset`;
- link de pulo para o conteúdo; `.sr-only` com `clip-path`;
- um `<h1>` por página, com hierarquia real de heading;
- diagrama é `<figure>` com `<ol>` — a ordem das camadas é informação, não
  estilo;
- nunca hide de overflow para esconder problema de layout.

## Metadados e SEO

`BaseHead` monta canonical com `new URL(Astro.url.pathname, Astro.site)`, Open
Graph com imagem absoluta e dimensões declaradas, Twitter card e `theme-color`
por preferência de tema.

A abertura injeta um JSON-LD `Person` — `jobTitle` em pt e en, `knowsLanguage`,
`seeks`, `knowsAbout`, `alumniOf`, `address`. **É o único script no HTML de
produção**, e é estático. O schema só declara o que a página realmente mostra.

## Dossiê em PDF

`scripts/generate_dossier.py` monta o PDF com ReportLab a partir de
`scripts/dossier-content.json`; `scripts/check_dossier.py` valida com pypdf.
Rodam por `uv`, sem venv:

```
npm run dossier:generate
npm run dossier:check
```

O check é estrutural e assertivo: **3 páginas A4**, pelo menos 7 anotações de
link, todas `/URI`, presença de termos obrigatórios e ausência de resíduo de
versões antigas. `profile.lead` é renderizado em 24 pt, então precisa ser curto —
é uma variante própria, não a `leadHtml` do site.

O manifesto duplica parte da copy do perfil de propósito, mas **isso deriva**:
mudar o site sem regenerar o PDF desalinha o currículo que a abertura promove.

Na página de projetos do dossiê, os cartões têm 64 mm de altura. Cada link para
o GitHub começa 2 mm abaixo do fim calculado do parágrafo de tecnologias; não
usa uma posição independente que possa sobrepor o texto.

## CI/CD

| Workflow     | Gatilho                  | Papel                                |
| ------------ | ------------------------ | ------------------------------------ |
| `ci.yml`     | `pull_request`, manual   | job `🔍 Lint, Types, Testes & Build` |
| `deploy.yml` | `push` em `main`, manual | build e publicação em Pages          |

O `ci.yml` roda `format:check`, `build`, `check` e `dossier:check` — este último
precisa do `uv`, instalado no job por `astral-sh/setup-uv`.

A proteção da `main` exige um status check com o **nome exato** do job
(`🔍 Lint, Types, Testes & Build`). GitHub casa por `name:`, então renomear o job
deixa a PR bloqueada para sempre mesmo com CI verde. Acrescentar passo ao job é
seguro; mexer no `name:` não.

Pages está em `build_type=workflow`: quem publica é o `deploy.yml`, não o builder
legado por branch.

## Validação

Durante o trabalho, `npm run dev`. Antes de entregar:

```
npm run format:check
npm run build          # deve gerar 14 páginas
npm run check          # astro check + tsc --noEmit
```

Build e type check **não** detectam link quebrado nem problema de layout. Por
isso, conferir também:

- `dist/` servido na base `/portfolio/` — asset fora do `url()` só falha aqui;
- ausência de overflow em 360, 768 e 1440 px. **Medir dentro de um iframe da
  largura exata**: `--window-size` do headless não entrega o viewport pedido;
- primeira tela da home em 360×800, 768×800 e 1440×800 px: identidade,
  filtros de contratação, declaração de evidência e as três ações da abertura
  inteiramente visíveis no tamanho padrão de texto. Com texto ampliado, aceitar
  rolagem vertical e verificar acesso e ausência de overflow horizontal;
- contraste nos dois temas. Duas armadilhas produzem pilhas de falso positivo: o
  fundo é pintado em `html`, não em `body`, e `getComputedStyle` devolve
  `color-mix()` como `color(srgb …)` em floats de 0 a 1, não 0 a 255;
- contraste de bordas após o fim das transições do tema, incluindo os links de
  projeto anterior/próximo; alvos da navegação com pelo menos 44×44 px;
- contagens preservadas: 9 projetos, 28 itens, 24 certificados, 14 páginas, 4
  diagramas, ordem do catálogo;
- `npm run dossier:check` quando o manifesto ou o gerador mudarem. O `ci.yml`
  também o roda (via `astral-sh/setup-uv`, fixado numa versão exata porque a
  action não publica tag major flutuante), então um PDF não regenerado reprova a
  PR. Mas o check é textual e estrutural: **não afere geometria nem sobreposição**.
  Depois de mexer no gerador, conferir as 3 páginas à vista.

### Formatação

Prettier governa o código-fonte. O `.prettierignore` tem dez entradas. Cinco são
as previsíveis — `dist/`, `.astro/`, `node_modules/`, `package-lock.json` e
`public/`. As outras cinco carregam decisão: `src/styles/` (alinhamento de coluna
feito à mão), `src/data/certificates.ts` (entradas de uma linha de propósito),
`src/components/panels/Channels.astro` e `src/pages/certificacoes.astro` (markup
sensível a espaço, onde o Prettier injetaria whitespace que muda o render) e
`report.*.json` (relatórios de diagnóstico gerados).

**`docs/` não está excluído** — este arquivo entra no `format:check`.

## Riscos e controles

| Risco                                           | Controle                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| Link ou asset sem `url()`                       | `astro check` e `tsc` não pegam — abrir `dist/` servido na base       |
| Divergência entre cartão e legenda de resultado | ambos leem `src/lib/metric.ts`                                        |
| Termo em `LAYERS` sem regra `.chain--*`         | tratar os dois como uma mudança só                                    |
| Lista de cores divergente entre blocos de tema  | testar as duas preferências de SO e as duas inversões                 |
| Diagrama afirmar camada inexistente             | confrontar cada diagrama com o texto do próprio caso                  |
| PDF desalinhado do site                         | regenerar e rodar `dossier:check` ao mexer na copy do perfil          |
| Renomear o job de CI                            | o nome é o contexto exigido pela proteção da `main`                   |
| PR empilhada sobre PR aberta                    | uma PR por vez contra `main`; conferir com `merge-base --is-ancestor` |

## Evolução técnica proposta

**Nada nesta seção está implementado.** As seções anteriores descrevem o que existe;
aqui ficam as mudanças técnicas propostas, com o critério que diz quando cada uma está
pronta. Medições de 14/09/2026.

### 1. Transformar os invariantes documentados em teste

O job de CI se chama `🔍 Lint, Types, Testes & Build` e **não há um teste sequer** no
repositório: nenhum `scripts.test`, nenhum arquivo de teste, nenhum runner. O nome
promete o que o pipeline não faz.

O custo disso está no próprio histórico. Todo invariante que este documento descreve e
que já quebrou foi pego por auditoria manual, nunca pelo CI:

| Quebra                                     | Commit     | Guardado hoje     |
| ------------------------------------------ | ---------- | ----------------- |
| `--layer-gold` fora do bloco de impressão  | `d38dc296` | não               |
| Primeira tela estourando a dobra           | `c87a24ec` | não               |
| PDF publicado desatualizado                | `02e2b138` | sim, via `ci.yml` |
| INDUSCON sem "submetido" em 3 de 4 lugares | `6dda2346` | não               |
| `knowsAbout` com 4 termos sem lastro       | `f63ff188` | não               |

O Node 24.20.0 já traz `node:test` e `fs.globSync`, então isso cabe **sem dependência
nova** — o que preserva a disciplina atual de 5 de produção e 5 de desenvolvimento.

Candidatos, todos sobre `dist/` e os fontes, nenhum precisando de navegador:

1. cada token de cor presente nos cinco lugares (os 4 blocos de tema mais o de impressão);
2. `LAYERS` do `Readout` cobrindo exatamente os mesmos termos que as regras `.chain--*`;
3. cada `metricKind` com a sua regra `.metric--<kind>`;
4. cada termo de `knowsAbout` presente no texto visível, salvo a lista declarada de
   sinônimos em inglês;
5. exatamente um `<script>` no HTML de produção, e é o JSON-LD;
6. as contagens: 14 páginas, 9 projetos, 28 itens, 24 certificados, 4 diagramas;
7. todo link interno sob `/portfolio/` e resolvendo para arquivo real — **com
   URL-decode antes de testar**, ou os 24 PDFs de certificado dão 24 falsos positivos;
8. um `<h1>` por página, sem pular nível de heading;
9. nenhum diagrama declarando camada que o texto do próprio projeto não menciona.

A primeira tela (360×800, 768×800, 1440×800) precisa de navegador e fica como script
separado, fora do CI. A técnica é a documentada em "Validação": medir **dentro de um
iframe da largura exata**, porque `--window-size` do headless não entrega o viewport
pedido.

_Aceite:_ `npm test` existe, roda no `ci.yml` e falha quando qualquer invariante acima é
violado — conferido quebrando um de propósito. O `name:` do job **não muda**: é o status
check exigido pela proteção da `main`.

### 2. Pagar só pelo eixo de fonte que o desenho usa

`Layout.astro` importa `@fontsource-variable/archivo/wdth.css` — o eixo de largura. O
subset latino dessa variante tem **87 KB**, mais da metade dos ~162 KB de fonte que a
abertura transfere. Mas o eixo nunca varia: `font-stretch: var(--wdth-display)` usa
`--wdth-display: 100%`, definido uma vez em `tokens.css` e **nunca sobrescrito** — 100%
é o valor neutro.

O mesmo subset no eixo de peso (`wght.css`) tem **34 KB**. São 53 KB a menos, sem
mudança visual.

_Aceite:_ a troca vem acompanhada da remoção do `font-stretch` e do token
`--wdth-display`, que deixam de ter função — e a revisão visual confirma que nenhum
título mudou de largura. Mexer em `src/styles/` continua exigindo a skill de design.

### 3. JSON-LD por ficha e `lastmod` no sitemap

As nove fichas de projeto não publicam dado estruturado nenhum; só a abertura publica.
Um `SoftwareSourceCode` por ficha sai inteiro do frontmatter que já existe, é estático e
não acrescenta script de cliente. O `sitemap-0.xml` também sai sem `lastmod`, que
`@astrojs/sitemap` sabe emitir.

_Aceite:_ o teste do item 1.5 continua valendo — um script por página, sempre JSON-LD.
O schema da ficha só declara o que a ficha mostra, pela mesma regra do `knowsAbout`.

### 4. Os links externos não têm vigilância

Os 11 links de projeto respondem 200 hoje — conferidos um a um em 14/09/2026. Mas nada os
verifica de forma contínua: renomear um repositório, torná-lo privado ou arquivá-lo
quebra em silêncio a promessa central do produto, "cada projeto aponta para o código".
O `build` não enxerga link externo, e o teste de link do item 1.7 cobre apenas link
interno.

_Aceite:_ uma verificação agendada — fora do caminho da PR, que não deve depender da rede
de terceiros para mergear — falhando ou avisando quando um dos 11 links deixa de
responder.

### 5. O PDF pode divergir do manifesto sem ninguém notar

`check_dossier.py` lê **só o PDF**; nunca abre `scripts/dossier-content.json`. Por
construção, então, não consegue detectar divergência entre os dois. Mudar a copy no
manifesto sem rodar `dossier:generate` passa no CI, porque as asserções de texto conferem
termos fixos (`ROC AUC 0,936`, `24 certificados`, `CLT ou PJ`) que não mudam.

Vale dizer com todas as letras: **a guarda acrescentada ao `ci.yml` não fecha o buraco que
motivou a sua criação.** Ela pega um PDF estruturalmente quebrado, não um PDF
desatualizado — que foi exatamente o defeito corrigido à mão quando o gerador mudou e o
arquivo publicado ficou para trás.

_Aceite:_ o CI regenera o dossiê e falha se o resultado diferir do arquivo commitado,
tornando impossível mergear manifesto e PDF fora de sincronia. Atenção à
reprodutibilidade: se o ReportLab gravar data de criação, comparar o texto e a geometria
extraídos, não o byte.

### 6. As Actions estão fixadas por tag mutável

As seis — `actions/checkout@v7`, `actions/setup-node@v7`, `actions/configure-pages@v6`,
`actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5` e
`astral-sh/setup-uv@v10.1.0` — usam tag, não SHA. Tag é ponteiro móvel: quem controla o
repositório da action pode reapontá-la, e o `deploy.yml` roda com `contents: read`,
`pages: write` e `id-token: write`. Não há Dependabot nem Renovate configurado, então
atualizar dependência é trabalho manual e invisível.

_Aceite:_ Actions fixadas por SHA, com atualização automatizada configurada — fixar não
pode virar congelar. O `name:` do job de CI continua intocável: é o status check exigido
pela proteção da `main`.

### 7. A fonte crítica não tem preload

A abertura não emite nenhum `rel="preload"`. A Archivo do título — 87 KB no subset
latino, o maior arquivo da página — só é descoberta depois que o CSS é baixado e
parseado, o que adia o maior elemento de texto da primeira tela, justamente o `<h1>` que
a métrica de primeira tela protege.

Este é um item para medir antes de agir, não para aplicar por reputação da técnica. Com o
`font-display` que o fontsource define, o texto já pinta na fonte de fallback: o ganho
esperado é de LCP e de estabilidade, não de conteúdo visível. E se o item 2 entrar antes,
o arquivo cai para 34 KB e a conta muda.

_Aceite:_ a decisão é registrada com número medido antes e depois, nos três viewports da
métrica de primeira tela.

## Onde esta documentação envelhece

Primeiro nas contagens (14 rotas, 9 projetos, 28 itens, 24 certificados, 15
cores) e nas versões da tabela de stack. Depois no inventário de componentes, se
algum for criado ou removido.

**O código é a fonte da verdade.** Este documento registra decisão, contrato e
invariante — o que não se lê olhando um arquivo isolado. Ao mexer em schema,
token, workflow ou no conjunto de componentes, atualize a seção correspondente
aqui e as contagens no [PRD](./prd.md).

## Definição de pronto

Uma mudança está pronta quando `format:check`, `build` e `check` passam; quando a
revisão em `dist/` servido na base não mostra link quebrado nem overflow em 360,
768 e 1440 px nos dois temas; quando as contagens seguem intactas; quando as
ressalvas de conteúdo continuam literais; e quando nenhuma dependência, rota ou
script de cliente novo entrou sem justificativa registrada.
