# PRD — Portfólio de Engenharia de Dados

> **Sobre os documentos desta pasta.** Este PRD e o [SDD](./sdd.md) são os
> documentos vigentes e descrevem o produto **como ele é hoje**.
> [`historico/`](./historico/) guarda o plano de simplificação
> (`future-simple-portfolio-*.md`) e o relatório da rodada que o precedeu. Esse
> plano foi **avaliado cláusula por cláusula e está atendido** pelo estado atual;
> onde a letra dele divergir do que está aqui, **vale o estado atual**.

## Contexto

Portfólio profissional de Rene Verinaud Anguita Junior, Ph.D. em Engenharia
Elétrica pela UNICAMP, publicado em <https://rvanguita.github.io/portfolio/>.

O produto tem um leitor específico: alguém que recruta para Engenharia de Dados e
decide em segundos se vale abrir conversa. Não é um blog, não é um currículo
narrativo e não tenta ser um site institucional.

A trajetória documentada é acadêmica e de engenharia elétrica — **não há emprego
formal em dados**. A abertura não declara essa ausência em palavras; ela enquadra
o Ph.D. como método aplicado a pipelines e lakehouses e lidera pela evidência dos
nove projetos públicos, todos com repositório aberto. O posicionamento escolhido
foi assumir a transição de carreira em vez de silenciar sobre ela, e o texto a
sustenta por enquadramento, não por declaração.

## Problema

Um recrutador precisa responder três perguntas nos primeiros dez segundos:

1. qual é a especialidade;
2. o que existe de evidência concreta;
3. como contratar — disponibilidade, modelo, alcance, idiomas.

Um portfólio que exige rolagem e navegação para responder qualquer uma das três
perde o leitor antes de provar competência.

## Objetivo do produto

Apresentar capacidade em Engenharia de Dados de forma verificável: cada
afirmação técnica aponta para um projeto, cada projeto aponta para o código, e
cada resultado declara o que ele é — medido, construído, publicado ou em
andamento.

## Público

- recrutadores e headhunters de dados;
- gestores e líderes técnicos de Engenharia de Dados;
- pares técnicos avaliando o trabalho;
- quem procura exemplos aplicados de pipeline, lakehouse e MLOps.

## Escopo atual

O site tem **14 rotas navegáveis**, mais uma página de erro:

| Rota                | Conteúdo                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `/`                 | abertura, projeto em destaque, projetos, competências, formação, contato |
| `/projetos/`        | catálogo dos 9 projetos e a legenda dos tipos de resultado               |
| `/projetos/<slug>/` | 9 fichas de projeto                                                      |
| `/trajetoria/`      | formação e experiência, 9 entradas de trajetória                         |
| `/competencias/`    | 4 grupos de capacidade, 29 itens, ligados a projetos                     |
| `/certificacoes/`   | 24 certificados em 3 grupos, com PDF de cada um                          |
| `/404.html`         | endereço inexistente, com caminho de volta — não entra no sitemap        |

Complementos: currículo em PDF de 3 páginas (`/assets/dossie-rene-anguita.pdf`),
gerado a partir de manifesto versionado; `sitemap-index.xml`; `robots.txt`;
JSON-LD `Person` na abertura.

### Fora do escopo

- backend, CMS, autenticação ou área administrativa;
- versão em outro idioma (rotas `/en/` ou equivalentes);
- blog, comentários ou qualquer conteúdo periódico;
- JavaScript de cliente para o que HTML e CSS resolvem;
- framework de UI, roteamento no cliente ou integração externa nova;
- alteração das URLs públicas existentes.

## Requisitos funcionais

1. A abertura exibe nome, cargo, credencial, localização, os dois filtros mais
   duros (idioma e modelo de contratação) e três ações: ver projetos, contato e
   currículo em PDF.
2. A abertura destaca um projeto com resumo, diagrama de arquitetura, tipo de
   resultado e links para ficha e código.
3. A página inicial mostra dois projetos de apoio, as quatro capacidades e um
   bloco de formação com acesso às certificações.
4. O bloco de contato publica a **ficha de triagem** — cargos-alvo, modelo de
   contratação, alcance geográfico e idiomas — além do e-mail e do LinkedIn.
5. O catálogo lista os 9 projetos com categoria, período, resumo, resultado
   tipado, até cinco tecnologias e links para ficha e repositório. Quando o
   resultado é medido, um dos links aponta para o arquivo que produz a métrica.
6. Cada ficha de projeto traz problema, dados, método e resultado; o trilho
   lateral repete o resultado e a stack completa.
7. Projetos que têm arquitetura em camadas real exibem um diagrama fiel ao
   próprio estudo de caso. Os que não têm, não exibem diagrama nenhum.
8. Cada grupo de competência tem um resumo, os itens e link para os projetos que
   o comprovam. Referência inválida quebra o build.
9. O catálogo publica a legenda dos quatro tipos de resultado, para o leitor
   entender o código visual em vez de adivinhá-lo.
10. O tema segue a preferência do sistema, com inversão manual disponível.

## Requisitos não funcionais

- geração estática com Astro, sem renderização em servidor;
- nenhum JavaScript de cliente: **todo** `<script>` do HTML de produção é JSON-LD
  estático — um na abertura e um em cada ficha de projeto;
- responsividade sem overflow horizontal em 360, 768 e 1440 px;
- texto a 4,5:1 e bordas de controle a 3:1, nos dois temas e nas duas inversões;
- foco de teclado visível, navegação por atalho de conteúdo, alvos de 44 px;
- cor nunca é o único portador de significado;
- movimento restrito a transições de borda e sombra (0,16 s) em links, botão de
  tema e cartões, declaradas dentro de `prefers-reduced-motion: no-preference` —
  quem pede menos movimento não as recebe;
- fontes auto-hospedadas, sem requisição a terceiros;
- estilos de impressão com fundo branco;
- todas as rotas sob o prefixo `/portfolio/`.

## Regras de conteúdo e honestidade

Esta seção é a mais importante de preservar. Ela é o diferencial do produto, e
já orientou decisões concretas de implementação.

**Aferição tipada.** Toda afirmação declara o que ela é, através de quatro tipos:
`medida` (métrica calculada em dados de teste), `arquitetura` (componentes e
fluxo construídos, com código disponível), `publicacao` (artigo e referência de
pesquisa) e `desenvolvimento` (entregas ainda incompletas). **Só resultado
medido recebe numeral grande.** A legenda publica o código ao final do catálogo.

**Nada de invenção.** O produto não afirma escala de produção, senioridade,
impacto de negócio ou vínculo empregatício que não existam. "Engenheiro de Dados
pleno" aparece apenas como **cargo procurado** ("Busco posições de…"), nunca como
cargo exercido ou tempo de casa.

**Ressalvas preservadas literalmente.** O modelo do FastF1 segue `experimental` e
sem métrica de referência publicada; o artigo da INDUSCON 2025 está `submetido`,
nunca aceito ou revisado por pares; o fraud-detection está `em desenvolvimento`;
a ficha do bank-churn mantém a ressalva de que métricas daquela magnitude são
incomuns em dados reais e sugerem viés do dataset público.

**Idioma.** Toda a interface é em português. Nomes oficiais de tecnologia,
projeto e certificado ficam como são, e o mesmo vale para os empréstimos já
correntes no português técnico — machine learning, pipeline, lakehouse, dataset,
dashboard —, que permanecem como são porque traduzi-los soaria pior e afastaria o
termo que o leitor procura. O que a regra proíbe é outra coisa: escrever a
interface em inglês, ou plantar na copy visível termo de busca que só existe para
ser indexado. Esses ficam nos metadados — `title`, `description` e JSON-LD.

**Evidência é elo, não requisito de existência.** Cada item de competência aponta para
o projeto que o demonstra, quando existe um. Os que não têm projeto público atrás ficam
sem elo — e continuam na lista. Saber uma ferramenta sem ter publicado projeto com ela
não é invenção; a regra deste produto é não inflar escala, senioridade ou impacto. O que
o site não faz é simular evidência: o elo só aparece onde há projeto que o sustente.

**Fidelidade dos diagramas.** Nenhum diagrama pode mostrar uma camada que o texto
do projeto não descreve.

## Critérios de aceitação

Esta lista já se chamou "métricas de sucesso", e o nome estava errado: toda linha dela é
verificável **antes** de publicar. São critérios de aceitação, e a seção seguinte trata do
que eles não alcançam.

- especialidade e evidência identificáveis sem rolagem;
- os dois filtros mais duros — idioma e modelo de contratação — na abertura;
  cargos-alvo e alcance na ficha do bloco de contato;
- identidade, filtros de contratação, declaração de evidência e as três ações
  da abertura inteiramente visíveis na primeira tela: viewports de 360×800,
  768×800 e 1440×800 px, com texto no tamanho padrão. Com texto ampliado, a
  leitura pode exigir rolagem vertical, preservando acesso e sem overflow
  horizontal;
- `npm run format:check`, `npm run build`, `npm run check` e `npm test` sem erro —
  a suíte de invariantes é o que guarda, no CI, as regras que este documento define;
- nenhuma rota, âncora ou asset público quebrado;
- revisão visual sem overflow em 360, 768 e 1440 px, nos dois temas;
- termos que um headhunter pesquisa presentes nos metadados, em pt e en.

## Como o sucesso é observado

Não é — e isso é decisão, não descuido.

Medir leitura exigiria analítica, e analítica exigiria JavaScript de cliente e requisição
a terceiros. Os dois estão proibidos nos requisitos não funcionais, duas seções acima, e
nenhum ganho de medição paga tirar a proibição: o produto conversa com poucas dezenas de
leitores por mês, faixa em que qualquer número seria ruído, e o custo seria carregar
rastreamento para cada pessoa que abre a página.

O único sinal real é **contato recebido** — e-mail ou LinkedIn. O produto não consegue
atribuí-lo a uma página nem a uma origem, e não vai tentar.

O que fica, então, é a honestidade sobre o que os critérios acima são: proxy de qualidade.
Eles garantem que o site não está quebrado, não mente e não perde o leitor na primeira
tela. Nenhum deles prova que alguém foi contratado.

## Critério de entrada de projeto

O catálogo tem 9 projetos porque nove passaram na barra abaixo, não porque nove é um
número bom. Ela estava só na cabeça de quem escreveu as fichas; fica aqui para o décimo.

Um projeto entra quando:

1. **o repositório é público e acessível** — a promessa central é que cada projeto aponta
   para o código, e um link morto a desmente sozinho;
2. **existe estudo de caso com os quatro beats** — problema, dados, método, resultado — ou,
   se ainda não existe, o projeto entra como `light` com a `spec` estruturada preenchida;
3. **`metricKind` é declarado à mão.** Não há valor padrão, de propósito: um padrão
   silencioso faria escopo e arquitetura passarem por resultado medido;
4. **`periodo` e `atualizadoEm` vêm da data real do repositório**, pela API do GitHub e
   nunca de estimativa. Projeto com vários repositórios usa o intervalo que cobre todos;
5. **`architecture` só é declarada se o texto descrever camadas.** Diagrama genérico
   inventaria um pipeline que o estudo de caso não tem;
6. **as ressalvas do próprio projeto vêm junto** — experimental, submetido, em
   desenvolvimento, viés de dataset —, literais e não suavizadas na passagem.

O que **não** é critério: ter dado grande, ter métrica boa ou ter terminado. Três dos nove
não têm métrica aferida e um está em desenvolvimento. O tipo de resultado existe justamente
para que esses entrem sem precisar fingir o que não são.

Consequência mecânica de acrescentar um: as contagens se movem no PRD, no SDD, no README e
no CLAUDE.md, e a guarda reprova a PR para cada documento que ficar para trás.

## Estado atual

Entregue e publicado: as 14 rotas navegáveis mais a página de erro, os 9 projetos
(todos com estudo de caso em Markdown), 29 itens de
competência, 24 certificados, 4 diagramas de arquitetura, a ficha de triagem, o
dossiê em PDF e o deploy automático em cada push para `main`.

Cada projeto publica o período em que foi trabalhado e, quando o resultado é
medido, o link para o arquivo que produz a métrica. Cada ficha injeta o próprio
dado estruturado, e o sitemap leva `lastmod` por ficha. Uma suíte de invariantes
guarda no CI as regras que este documento define — contagens, ressalvas literais,
schema com lastro e ausência de JavaScript de cliente.

Duas verificações agendadas ficam fora do caminho da PR, porque vigiam quebra que não vem
de commit: uma confere os links dos repositórios, outra confere se o `atualizadoEm` de
cada ficha continua batendo com o último push do repositório.

## Melhorias propostas

**Nada nesta seção está implementado.** O que existe hoje é o que as seções anteriores
descrevem; aqui ficam as melhorias que serviriam ao objetivo declarado — cada afirmação
apontando para evidência — com o critério que diz quando cada uma está pronta. Os
números citados foram medidos no repositório em 14/09/2026; refaça a medição antes de
confiar neles.

### 1. O próprio repositório como evidência

Diante de nove repositórios de uma pessoa só, a pergunta que sobra é se ela trabalha como
quem já esteve em produção. O site não responde, e o repositório dele responde: CI que
reprova a PR, suíte de invariantes, Actions fixadas por SHA com Dependabot para não
congelar, PDF determinístico conferido contra árvore limpa, orçamento de acessibilidade
escrito. Nada disso precisa afirmar escala — é verificável em dois cliques.

Hoje essa evidência existe e fica invisível: quem não abre o repositório do site nunca
sabe que ela está lá.

**Forma recomendada:** uma linha com elo, no rodapé ou no bloco de contato, dizendo como o
site é feito. Custo quase zero e nenhuma contagem se move.

**Forma mais pesada:** um décimo projeto no catálogo. Evidência mais forte, leitura mais
estranha — um projeto sobre o próprio site entre projetos de dados —, e ele teria de passar
pelo critério de entrada acima como qualquer outro. Que é, de propósito, o teste de saber
se ele merece entrar.

**Pronto quando** a afirmação aponta para o que a sustenta — o workflow, a suíte — e não
para um adjetivo sobre boas práticas.

### 2. Índice reverso por tecnologia

A competência aponta para o projeto, mas o caminho inverso não existe. Um item como
Python aponta para 7 dos 9 projetos e o elo leva a um só — o de maior prioridade. Os
outros seis ficam invisíveis: a evidência existe, o leitor não chega nela.

E quem procura "Airflow" não tem onde cair. A tecnologia aparece em cartão e em ficha,
sempre como etiqueta, nunca como página.

Agrupar os projetos por tecnologia em rota própria resolve as duas coisas com o mesmo
material — sem afirmar nada novo, só recortando a evidência publicada por outro eixo.

**Custo honesto:** exige vocabulário canônico de tecnologia, que hoje não existe — a
stack de cada projeto é texto livre e diverge do nome usado nas competências. E a
contagem de 14 rotas muda nos quatro documentos, com a guarda cobrando cada um.

**Pronto quando** nenhuma página de tecnologia tem menos de dois projetos (com um só, ela
repete a ficha e não acrescenta caminho), o elo de competência passa a apontar para lá, e
as contagens seguem batendo.

### 3. Trilha de navegação nas fichas

A ficha de projeto está a dois níveis da abertura e não diz isso em lugar nenhum. A
navegação que ela oferece é anterior/próximo — útil para percorrer o catálogo, inútil
para subir. O leitor que chega por busca direto numa ficha não tem como saber que existe
um catálogo atrás dela.

Uma trilha "Início › Projetos › ‹nome›" resolve, e o dado estruturado correspondente sai
do mesmo lugar — espelhando a trilha visível, que é a regra que este documento já aplica
a todo metadado.

**Pronto quando** o dado estruturado descreve exatamente a trilha que a página mostra, a
navegação é rotulada para leitor de tela, e os alvos respeitam os 44 px.

## Decisões fechadas

O que foi avaliado e recusado, com o motivo ao lado. Fica registrado porque "não fizemos"
sem a razão convida a refazer a discussão daqui a seis meses — e porque as três abaixo
parecem, de fora, esquecimento.

### Cartão social por ficha

Todas as fichas de projeto declaram o mesmo `og:image`. Mas a medição desfez metade do
problema: `og:title` e `og:description` **já são distintos nas nove** e descrevem o caso
— a prévia de um link de projeto identifica o projeto pelo texto, que é o que mais pesa
na leitura de quem recebe.

Gerar imagem por projeto no build não é opção barata: o site usa
`passthroughImageService()` e não tem `sharp`. Nove peças versionadas seriam trabalho de
design, não de código.

**Decisão: aceitar o texto.** O critério anterior pedia mais do que o problema exige. Se
um dia houver direção de design para cartões por projeto, o caminho é `public/` mais uma
prop de imagem no `BaseHead`.

### Versão em inglês

O leitor estrangeiro já é alcançado: `title`, `description` e o `knowsAbout` do JSON-LD
levam os termos em inglês, e é assim que a busca chega ao site. Uma árvore `/en/`
duplicaria toda a copy — nove estudos de caso, 29 itens de competência, as ressalvas de
honestidade literais — e cada correção passaria a ter dois lugares para envelhecer.

**Decisão: manter a interface só em português.** O alcance que a tradução traria já vem
pelos metadados; o custo dela é permanente.

### Preload da fonte crítica

Medido e descartado, com os números no [SDD](./sdd.md#preload-da-fonte-crítica--medido-e-descartado).

## Onde este documento envelhece

Os números — 14 rotas, 9 projetos, 29 itens, 24 certificados — mudam se o conteúdo mudar,
e desde a suíte de invariantes eles avisam sozinhos: a guarda cruza cada contagem escrita
aqui, no [SDD](./sdd.md), no README e no CLAUDE.md com o dado que ela descreve, e reprova
a PR quando uma fica para trás. Vale para número por extenso também.

O que continua sendo disciplina são as regras. O código é a fonte da verdade sobre o que
o site tem; este PRD registra a intenção e o critério de honestidade — e nenhum teste
percebe quando a intenção muda e o texto não acompanha.
