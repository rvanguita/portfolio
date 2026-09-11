# Prompt futuro — simplificação do portfólio

Avalie e melhore este portfólio de forma incremental, preservando a ideia original de um site simples para apresentar meu trabalho como engenheiro de dados.

Antes de alterar o código, inspecione a estrutura atual, o conteúdo e as rotas existentes. Não reescreva o projeto inteiro. Faça apenas mudanças que melhorem clareza, leitura e manutenção.

## Objetivos

- manter o site em português;
- preservar Astro, geração estática, URLs existentes e conteúdo factual;
- deixar a página inicial compreensível em menos de 10 segundos;
- destacar nome, cargo, especialidade, contato e três projetos principais;
- reduzir textos repetidos, elementos decorativos e informações secundárias;
- manter uma navegação curta e previsível;
- conservar as páginas de projetos, trajetória e competências, sem aumentar o escopo;
- tratar o PDF como material complementar, sem deixar que ele determine o design do site.

## Direção visual

- interface limpa, clara e profissional;
- paleta pequena, com fundo claro, texto escuro e uma cor de ação;
- tipografia legível e poucos tamanhos de texto;
- espaço em branco suficiente;
- cartões simples, sem aparência de dashboard;
- diagramas apenas quando explicarem uma competência;
- sem animações, efeitos chamativos ou novas interações desnecessárias;
- não adicionar dependências ou JavaScript de cliente sem necessidade comprovada.

## Conteúdo

- escrever com frases curtas e diretas;
- apresentar Engenharia de Dados como foco principal;
- mostrar tecnologias relacionadas a projetos concretos;
- manter métricas com contexto e ressalvas;
- limitar a página inicial aos exemplos mais fortes;
- deixar certificados e detalhes acadêmicos em páginas secundárias.

## Critérios de aceitação

- nenhuma rota pública existente deve quebrar;
- o site deve continuar acessível por teclado e responsivo em 360, 768 e 1440 px;
- não deve haver overflow horizontal;
- `npm run format:check`, `npm run check` e `npm run build` devem passar;
- revisar visualmente a página inicial, o catálogo e uma página de projeto;
- documentar o que foi simplificado e por quê;
- não criar novas seções apenas para preencher espaço;
- se uma mudança não melhorar a compreensão do visitante, não implementá-la.
