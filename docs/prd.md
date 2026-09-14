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

O site tem **14 rotas estáticas**:

| Rota                | Conteúdo                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `/`                 | abertura, projeto em destaque, projetos, competências, formação, contato |
| `/projetos/`        | catálogo dos 9 projetos e a legenda dos tipos de resultado               |
| `/projetos/<slug>/` | 9 fichas de projeto                                                      |
| `/trajetoria/`      | formação e experiência, 9 entradas                                       |
| `/competencias/`    | 4 grupos de capacidade, 28 itens, ligados a projetos                     |
| `/certificacoes/`   | 24 certificados em 3 grupos, com PDF de cada um                          |

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
5. O catálogo lista os 9 projetos com categoria, resumo, resultado tipado, até
   cinco tecnologias e links para ficha e repositório.
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
- nenhum JavaScript de cliente; o único script no HTML de produção é o JSON-LD;
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

Entregue e publicado: as 14 rotas, os 9 projetos (4 com estudo de caso em
Markdown e 5 com ficha estruturada), 28 itens de competência, 24 certificados, 4
diagramas de arquitetura, a ficha de triagem, o dossiê em PDF e o deploy
automático em cada push para `main`.

## Melhorias propostas

**Nada nesta seção está implementado.** O que existe hoje é o que as seções anteriores
descrevem; aqui ficam as melhorias que serviriam ao objetivo declarado — cada afirmação
apontando para evidência — com o critério que diz quando cada uma está pronta. Os
números citados foram medidos no repositório em 14/09/2026; refaça a medição antes de
confiar neles.

### 1. Fechar a corrente entre a métrica e o código

Hoje a corrente para uma casa antes do fim. Os 11 links de projeto apontam todos para a
raiz do repositório, e nada mais fundo: quem lê "ROC AUC 0,936" não tem como conferir o
número sem garimpar o repositório inteiro. Os três projetos com métrica aferida —
bank-churn, wind-farm e sentiment-nlp — têm um `main.ipynb` na raiz, que é exatamente o
arquivo onde o número nasce.

_Aceite:_ todo projeto cujo resultado é do tipo `medida` publica, além do link do
repositório, um link para o arquivo que produz a métrica. Nenhum número aferido fica a
mais de um clique da sua origem.

### 2. Publicar a data de cada projeto

Nenhum dos 9 projetos declara data, e o schema não tem o campo. Um recrutador não
distingue trabalho deste mês de trabalho de dois anos atrás — e a diferença é material
para quem contrata.

A data não precisa ser inventada: a API do GitHub devolve a dos nove. Medido, por
criação: rotaperfume, personal-expenses e shopping-list em 09/2026; fastf1 em 07/2026;
otimizacao-eletrica em 08/2025; fraud-detection e sentiment-nlp em 04/2025; bank-churn
em 08/2024; wind-farm em 05/2024.

O dado expõe uma tensão que vale decidir com ele à vista: **os quatro projetos de
engenharia em Python são os mais recentes**, e os de notebook são de 2024–25 — mas a
abertura promove Bank Churn (notebook, 2024) ao segundo lugar, à frente de três projetos
de 2026. Publicar a data e revisar a ordem do catálogo são decisões separadas; a ordem
atual está fixada de propósito. A primeira torna a segunda discutível com fato.

_Aceite:_ cada ficha e cada cartão mostram o período do projeto, com a data vindo de
fonte verificável — nunca estimada.

### 3. Terminar as cinco fichas que param na metade

Quatro projetos têm estudo de caso (200–280 palavras, com problema, dados, método e
resultado); cinco têm só a ficha estruturada. E a matéria-prima é desigual:
personal-expenses (138 palavras) e shopping-list (128) já estão perto da densidade de um
estudo de caso e têm diagrama; fraud-detection (68), otimizacao-eletrica (70) e
sentiment-nlp (79) são finas.

A ordem importa: promover primeiro as duas que têm material, e para as outras três
buscar o material no repositório de origem. Alongar prosa sem fato novo é como se
inventa escala e impacto — exatamente o que a seção de honestidade proíbe.

_Aceite:_ nenhuma ficha nova afirma o que o repositório não sustenta; as ressalvas
existentes (`experimental`, `submetido`, `em desenvolvimento`) continuam literais.

### 4. Ligar cada competência a um projeto que a comprove

As competências apontam para projetos por grupo, não por item: os 28 itens são cobertos
por 4 referências, e cinco dos nove projetos — wind-farm, fraud-detection,
personal-expenses, shopping-list e sentiment-nlp — não comprovam competência nenhuma.
Um item sem projeto atrás é exatamente o tipo de afirmação que o objetivo deste produto
rejeita.

_Aceite:_ todo item de competência ou aponta para um projeto que o demonstre, ou sai da
lista. Referência inválida continua quebrando o build.

### 5. Cartão social das fichas: decidido, não pendente

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

### 6. Teste não aparece nas competências

Os 28 itens são **ferramentas** — Python, SQL, Apache Airflow, Delta Lake, Docker,
Git/GitHub Actions. Prática de engenharia aparece só no resumo do grupo "Engenharia de
Dados", que cita contratos de dados e CI a cada PR. **Teste não aparece em item nenhum.**

E a evidência existe: dos nove repositórios, os quatro disponíveis para inspeção
(`lake-fastf1`, `rotaperfume`, `personal-expenses`, `personal-shopping-list`) **todos têm
testes**, e três têm workflow de CI. Para quem contrata engenheiro de dados, teste é
sinal de triagem primeiro: é parte do que separa quem entrega pipeline de quem entrega
notebook. O site tem a evidência e não a reivindica.

_Aceite:_ a competência de teste entra na lista apontando para os projetos que a
comprovam, pela mesma regra do item 4 — nada reivindicado sem repositório atrás.

## Onde este documento envelhece

Os números — 14 rotas, 9 projetos, 28 itens, 24 certificados — mudam se o
conteúdo mudar. O código é a fonte da verdade; este PRD registra a intenção e as
regras. Ao acrescentar projeto, rota ou grupo de competência, reconfira as
contagens aqui e no [SDD](./sdd.md).
