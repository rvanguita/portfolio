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
| `/trajetoria/`      | formação e experiência, 9 entradas                                       |
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

## Métricas de sucesso

- especialidade e evidência identificáveis sem rolagem;
- os dois filtros mais duros — idioma e modelo de contratação — na abertura;
  cargos-alvo e alcance na ficha do bloco de contato;
- identidade, filtros de contratação, declaração de evidência e as três ações
  da abertura inteiramente visíveis na primeira tela: viewports de 360×800,
  768×800 e 1440×800 px, com texto no tamanho padrão. Com texto ampliado, a
  leitura pode exigir rolagem vertical, preservando acesso e sem overflow
  horizontal;
- `npm run format:check`, `npm run build` e `npm run check` sem erro;
- nenhuma rota, âncora ou asset público quebrado;
- revisão visual sem overflow em 360, 768 e 1440 px, nos dois temas;
- termos que um headhunter pesquisa presentes nos metadados, em pt e en.

## Estado atual

Entregue e publicado: as 14 rotas navegáveis mais a página de erro, os 9 projetos
(6 com estudo de caso em Markdown e 3 com ficha estruturada), 29 itens de
competência, 24 certificados, 4 diagramas de arquitetura, a ficha de triagem, o
dossiê em PDF e o deploy automático em cada push para `main`.

Cada projeto publica o período em que foi trabalhado e, quando o resultado é
medido, o link para o arquivo que produz a métrica. Cada ficha injeta o próprio
dado estruturado, e o sitemap leva `lastmod` por ficha. Uma suíte de invariantes
guarda no CI as regras que este documento define — contagens, ressalvas literais,
schema com lastro e ausência de JavaScript de cliente.

## Melhorias propostas

**Nada nesta seção está implementado.** O que existe hoje é o que as seções anteriores
descrevem; aqui ficam as melhorias que serviriam ao objetivo declarado — cada afirmação
apontando para evidência — com o critério que diz quando cada uma está pronta. Os
números citados foram medidos no repositório em 14/09/2026; refaça a medição antes de
confiar neles.

### 1. Terminar as três fichas que ainda param na metade

Duas das cinco foram promovidas a estudo de caso — `personal-expenses` e
`shopping-list` —, escritas a partir do README e do código dos próprios repositórios,
que estão clonados nesta máquina. Cada uma ganhou os quatro beats e ~420 palavras, na
mesma densidade das que já existiam.

Sobraram `fraud-detection`, `otimizacao-eletrica` e `sentiment-nlp`. São as três de
matéria-prima mais fina (68 a 79 palavras de ficha) **e** as três cujos repositórios
não estão disponíveis localmente. Escrevê-las a partir do que o site já diz seria
alongar prosa sem fato novo, que é como se inventa escala e impacto.

_Aceite:_ cada ficha nova sai do material do repositório de origem — README, código,
notebook. Nenhuma afirma o que o repositório não sustenta, e as ressalvas existentes
(`em desenvolvimento`, `submetido`) continuam literais.

### 2. Cartão social das fichas: decidido, não pendente

Todas as fichas de projeto declaram o mesmo `og:image`. Mas a medição desfez metade do
problema: `og:title` e `og:description` **já são distintos nas nove** e descrevem o caso
— a prévia de um link de projeto identifica o projeto pelo texto, que é o que mais pesa
na leitura de quem recebe.

Gerar imagem por projeto no build não é opção barata: o site usa
`passthroughImageService()` e não tem `sharp`. Nove peças versionadas seriam trabalho de
design, não de código.

**Decisão: aceitar o texto.** O critério anterior pedia mais do que o problema exige.
Fica registrado aqui para não ser reaberto como esquecimento — se um dia houver
direção de design para cartões por projeto, o caminho é `public/` mais uma prop de
imagem no `BaseHead`.

## Onde este documento envelhece

Os números — 14 rotas, 9 projetos, 29 itens, 24 certificados — mudam se o
conteúdo mudar. O código é a fonte da verdade; este PRD registra a intenção e as
regras. Ao acrescentar projeto, rota ou grupo de competência, reconfira as
contagens aqui e no [SDD](./sdd.md).
