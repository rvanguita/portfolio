# PRD — Portfólio simples de Engenharia de Dados

## Contexto

O portfólio apresenta projetos, formação e competências de Rene Anguita para recrutadores. A versão atual demonstra capacidade técnica, mas acumulou páginas, componentes e elementos visuais que podem dificultar a leitura rápida.

## Problema

Um recrutador deve conseguir identificar a especialidade, avaliar evidências concretas e encontrar um canal de contato sem percorrer uma experiência complexa. Informações secundárias devem continuar disponíveis, mas não competir com os projetos principais.

## Objetivo do produto

Construir uma apresentação profissional simples, rápida e factual, com foco em Engenharia de Dados e em três projetos que comprovem a capacidade de entrega.

## Público principal

- recrutadores e headhunters;
- gestores de Engenharia de Dados;
- profissionais técnicos avaliando portfólio;
- pessoas interessadas em projetos aplicados de dados.

## Escopo

### Incluído

- simplificação da página inicial;
- revisão da navegação e da hierarquia de conteúdo;
- seleção de três projetos destacados;
- redução de repetições e elementos decorativos;
- manutenção das páginas de projetos, competências, trajetória e certificações;
- preservação do PDF como material complementar;
- revisão de acessibilidade, responsividade e performance.

### Fora do escopo

- migração de framework;
- backend, CMS ou autenticação;
- novas integrações externas;
- criação de blog ou área administrativa;
- animações complexas;
- reescrita completa do conteúdo sem evidência de melhoria;
- alteração das URLs públicas existentes.

## Requisitos funcionais

1. A abertura deve exibir nome, função, especialidade, localização ou disponibilidade e contato.
2. A abertura deve apresentar até três capacidades diretamente ligadas a projetos.
3. A página inicial deve destacar três projetos com problema, abordagem, stack e resultado contextualizado.
4. Cada projeto deve possuir acesso ao detalhe e ao repositório quando disponível.
5. Competências, trajetória, certificações e PDF devem permanecer acessíveis por navegação secundária.
6. O idioma, os dados pessoais e as métricas devem permanecer em português e factuais.

## Requisitos não funcionais

- geração estática com Astro;
- sem JavaScript de cliente para funções que podem ser resolvidas com HTML e CSS;
- responsividade em 360, 768 e 1440 px;
- foco visível e navegação por teclado;
- contraste adequado e estados de interação claros;
- carregamento rápido e fontes locais;
- manutenção das rotas e do prefixo `/portfolio/`.

## Métricas de sucesso

- um visitante identifica função e especialidade em até 10 segundos;
- o contato principal fica visível sem abrir uma página secundária;
- os três projetos principais são encontrados na primeira tela ou após uma rolagem curta;
- nenhum teste de build, tipos ou formatação falha;
- nenhuma rota, âncora ou arquivo público existente quebra;
- revisão visual não encontra excesso de informação ou overflow.

## Entregáveis

- página inicial simplificada;
- navegação revisada, se necessário;
- conteúdo dos três projetos destacados revisado;
- relatório curto das decisões de simplificação;
- validação técnica e revisão visual documentadas.
