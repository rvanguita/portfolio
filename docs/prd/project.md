# PRD — Site Pessoal / Portfólio Técnico

## 1. Objetivo

Refatorar completamente o projeto existente para transformá-lo em um **site pessoal profissional**, destinado à apresentação do perfil técnico, projetos e competências do proprietário para **recrutadores, headhunters e profissionais de tecnologia**.

O site deve transmitir uma imagem de profissionalidade, domínio técnico e maturidade em engenharia de software, dados e tecnologias relacionadas.

O resultado deve ser suficientemente profissional para funcionar como **portfólio principal do GitHub**, sendo hospedado gratuitamente via **GitHub Pages**.

---

## 2. Objetivos do produto

O site deve:

- Apresentar o profissional de forma clara e objetiva.
- Destacar experiência e competências técnicas.
- Apresentar projetos relevantes de forma visual e tecnicamente detalhada.
- Facilitar a avaliação do perfil por recrutadores.
- Direcionar visitantes para GitHub, LinkedIn e demais canais profissionais.
- Demonstrar capacidade técnica também por meio da própria implementação do site.
- Ter aparência moderna, profissional e consistente.
- Ser totalmente responsivo.
- Possuir excelente desempenho.
- Ser compatível com hospedagem estática no GitHub Pages.

### Objetivos secundários

- Demonstrar boas práticas de desenvolvimento frontend.
- Demonstrar preocupação com acessibilidade, SEO e performance.
- Permitir evolução futura sem necessidade de reescrever a aplicação.

---

## 3. Público-alvo

### Primário

- Headhunters.
- Tech recruiters.
- Engineering Managers.
- Tech Leads.
- CTOs.
- Empresas buscando profissionais de engenharia de software, dados e Machine Learning.

### Secundário

- Desenvolvedores.
- Pesquisadores.
- Profissionais de tecnologia.
- Comunidade open source.

---

## 4. Diretrizes gerais

O projeto existente deve ser considerado apenas como **ponto de partida**.

Não é necessário preservar:

- Estrutura atual.
- Componentes atuais.
- Organização dos arquivos.
- Framework utilizado.
- Linguagem de programação.
- Bibliotecas utilizadas.
- Layout atual.
- Textos atuais.

Caso a implementação atual apresente problemas arquiteturais, tecnológicos ou de manutenção, **o projeto deve ser refatorado ou reestruturado integralmente**.

A decisão tecnológica deve priorizar:

1. Compatibilidade com GitHub Pages.
2. Performance.
3. Manutenibilidade.
4. Simplicidade.
5. SEO.
6. Acessibilidade.
7. Qualidade visual.

Evitar complexidade arquitetural desnecessária.

---

# 5. Idioma

Todo o conteúdo apresentado ao usuário deve estar em **português brasileiro (pt-BR)**.

Isso inclui:

- Navegação.
- Títulos.
- Descrições.
- Botões.
- Textos institucionais.
- Mensagens.
- Metadados relevantes.
- Elementos de acessibilidade.

Termos técnicos consagrados podem permanecer em inglês quando isso for tecnicamente mais adequado, por exemplo:

- Machine Learning
- Data Engineering
- Software Engineering
- Open Source
- Python
- Docker
- Kubernetes
- CI/CD

---

# 6. Direção visual

O site deve utilizar princípios de **frontend design moderno**, evitando aparência de template genérico.

### Características desejadas

- Visual profissional.
- Minimalista.
- Tipografia bem definida.
- Excelente hierarquia visual.
- Espaçamento consistente.
- Uso criterioso de cores.
- Microinterações discretas.
- Animações apenas quando agregarem valor.
- Componentes visualmente consistentes.
- Boa utilização de espaço negativo.
- Excelente experiência em desktop e mobile.

### Evitar

- Excesso de gradientes.
- Animações exageradas.
- Efeitos visuais que prejudiquem a leitura.
- Cards excessivos.
- Ícones decorativos sem função.
- Linguagem visual semelhante a landing pages genéricas de SaaS.
- Informações excessivamente longas na primeira visualização.

O design deve priorizar **credibilidade profissional**, e não apenas estética.

---

# 7. Arquitetura da informação

O site deverá possuir, no mínimo, as seguintes seções:

```text
/
├── Hero / Apresentação
├── Sobre
├── Competências técnicas
├── Projetos
├── Experiência / Formação
├── Contato
└── Footer


A implementação pode utilizar uma Single Page Application ou site estático com múltiplas páginas, desde que a solução seja adequada ao GitHub Pages.

---

# 8. Hero

A primeira seção deve comunicar imediatamente:

1. Quem é o profissional.
2. Área de atuação.
3. Principais especialidades.
4. Proposta profissional.
5. Ações disponíveis para o visitante.

### Deve conter

* Nome.
* Título profissional.
* Breve descrição técnica.
* CTA para projetos.
* CTA para GitHub/LinkedIn.
* Eventualmente acesso ao currículo.

### Diretriz de conteúdo

Evitar frases genéricas como:

> "Apaixonado por tecnologia e inovação."

Priorizar comunicação técnica e objetiva, por exemplo:

> "Engenheiro de software especializado na construção de sistemas orientados a dados, automação e soluções de Machine Learning."

O texto definitivo deve ser baseado nas informações existentes no projeto, mas pode ser completamente reescrito.

---

# 9. Sobre

A seção deve apresentar uma visão profissional resumida.

O conteúdo deve responder:

* Qual é a experiência técnica?
* Quais problemas o profissional costuma resolver?
* Quais áreas domina?
* Qual é o foco profissional atual?
* Quais tecnologias ou paradigmas utiliza?

O texto deve possuir caráter técnico e profissional.

Evitar transformar a seção em uma autobiografia.

---

# 10. Competências técnicas

Criar uma apresentação organizada das competências.

As tecnologias devem ser agrupadas por domínio, por exemplo:

```text
Software Engineering
├── Python
├── APIs
├── Arquitetura
├── Testes
└── Clean Code

Data Engineering
├── SQL
├── ETL / ELT
├── Data Pipelines
├── Databases
└── Distributed Systems

Data Science / Machine Learning
├── Machine Learning
├── Statistical Analysis
├── Feature Engineering
├── Model Evaluation
└── Optimization

Infrastructure / DevOps
├── Docker
├── CI/CD
├── Linux
├── Cloud
└── GitHub Actions
```

A estrutura final deve ser baseada nas competências reais existentes no projeto.

Não criar tecnologias ou experiências que não estejam presentes nas informações fornecidas.

---

# 11. Projetos

Esta deve ser uma das principais áreas do site.

Cada projeto deve apresentar informações suficientes para que um recrutador técnico consiga compreender rapidamente:

* Qual problema foi resolvido.
* Qual foi a abordagem utilizada.
* Quais tecnologias foram empregadas.
* Qual foi o resultado.
* Qual foi a contribuição do profissional.

### Estrutura recomendada

```text
Projeto

Nome
Descrição técnica curta

Problema
Problema que motivou o projeto.

Solução
Como o problema foi abordado.

Tecnologias
Python · SQL · Docker · ...

Resultados
Principais resultados ou métricas.

Links
GitHub · Demo · Paper · Documentação
```

Sempre que existirem métricas objetivas, elas devem ser priorizadas.

Exemplo:

```text
Redução de 37% no tempo de processamento
```

é preferível a:

```text
Projeto altamente eficiente.
```

---

# 12. Destaque de projetos

Nem todos os projetos devem possuir o mesmo nível de destaque.

Criar uma hierarquia:

### Featured Projects

Projetos mais relevantes para posicionamento profissional.

### Other Projects

Projetos secundários que demonstram amplitude técnica.

A quantidade de projetos exibidos inicialmente deve ser limitada para evitar uma página excessivamente longa.

---

# 13. Experiência e formação

Apresentar informações profissionais e acadêmicas de maneira objetiva.

Cada item deve possuir:

```text
Instituição / Empresa
Cargo / Curso
Período

Descrição técnica
Principais responsabilidades, tecnologias,
resultados ou linhas de pesquisa.
```

Priorizar realizações sobre descrição de atividades.

Em vez de:

> "Responsável pelo desenvolvimento de sistemas."

Preferir:

> "Desenvolvimento e manutenção de serviços backend em Python, com integração a bancos relacionais e pipelines automatizados de processamento."

---

# 14. Conteúdo técnico

O texto existente deve ser completamente revisado.

### Objetivos da revisão

* Corrigir erros linguísticos.
* Eliminar redundâncias.
* Remover linguagem genérica.
* Aumentar precisão técnica.
* Melhorar clareza.
* Reduzir textos excessivamente longos.
* Destacar resultados.
* Utilizar terminologia profissional.
* Adequar o conteúdo ao público de tecnologia.

O conteúdo deve parecer escrito por um profissional de tecnologia experiente, e não por uma ferramenta de geração automática.

---

# 15. Navegação

A navegação deve ser simples e previsível.

Exemplo:

```text
Início
Sobre
Competências
Projetos
Experiência
Contato
```

Em mobile, utilizar menu apropriado.

A navegação deve permitir acesso rápido às principais seções.

---

# 16. Responsividade

O site deve funcionar corretamente em:

* Desktop.
* Notebook.
* Tablet.
* Smartphone.

Não deve existir dependência de uma resolução específica.

Testar pelo menos:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

---

# 17. Acessibilidade

Implementar, no mínimo:

* HTML semântico.
* Hierarquia correta de headings.
* Labels apropriados.
* `alt` em imagens relevantes.
* Navegação por teclado.
* Estados de foco visíveis.
* Contraste adequado.
* Links semanticamente corretos.
* Respeito a `prefers-reduced-motion`.
* Elementos interativos acessíveis.

A acessibilidade não deve ser implementada apenas visualmente.

---

# 18. SEO

Implementar SEO básico adequado para um portfólio profissional.

### Deve incluir

* `<title>` adequado.
* Meta description.
* Open Graph.
* Twitter/X cards quando aplicável.
* URL canônica.
* HTML semântico.
* Sitemap quando aplicável.
* `robots.txt`.
* Estrutura adequada de headings.
* Dados estruturados quando fizer sentido.

O site deve ser facilmente indexável por mecanismos de busca.

---

# 19. Performance

Como o site será hospedado no GitHub Pages, performance deve ser tratada como requisito.

Priorizar:

* Static Site Generation.
* Assets otimizados.
* Lazy loading.
* Imagens em formatos modernos.
* Minimização de JavaScript.
* Redução de dependências.
* Code splitting quando necessário.
* Evitar JavaScript para funcionalidades que CSS/HTML resolvem.
* Evitar bibliotecas pesadas sem justificativa.

O objetivo é obter excelente desempenho em Lighthouse.

---

# 20. Hospedagem

O site deverá funcionar integralmente em:

**GitHub Pages**

Portanto:

* Não depender de backend.
* Não depender de banco de dados.
* Não exigir servidor próprio.
* Não exigir infraestrutura paga.
* Não utilizar funcionalidades incompatíveis com hospedagem estática.

Caso seja necessário algum processamento, este deve ocorrer em build time ou por serviços externos adequados.

---

# 21. Arquitetura técnica

A tecnologia atual pode ser substituída.

Escolher a stack considerando:

```text
GitHub Pages
      ↓
Static Build
      ↓
HTML / CSS / JS
```

Frameworks como Astro, Hugo, Eleventy, Next.js export estático ou soluções equivalentes podem ser considerados.

A escolha deve ser justificada tecnicamente pela implementação, principalmente em relação a:

* Performance.
* SEO.
* DX.
* Manutenção.
* Complexidade.
* Compatibilidade com GitHub Pages.

Não adicionar framework apenas por preferência pessoal.

---

# 22. Qualidade do código

O projeto deve seguir princípios de:

* Clean Code.
* Separation of Concerns.
* DRY.
* KISS.
* Componentização adequada.
* Tipagem quando suportada.
* Configuração centralizada.
* Código testável.
* Baixo acoplamento.

Evitar:

* Componentes gigantes.
* Código duplicado.
* CSS desorganizado.
* Strings espalhadas pelo código.
* Configurações hardcoded.
* Dependências desnecessárias.
* Abstrações prematuras.

---

# 23. Design System

Criar uma base visual consistente.

Definir:

* Tipografia.
* Escala de tamanhos.
* Espaçamento.
* Border radius.
* Sombras.
* Cores.
* Estados de interação.
* Breakpoints.
* Componentes reutilizáveis.

Exemplo conceitual:

```text
Design Tokens
├── Colors
├── Typography
├── Spacing
├── Radius
├── Shadows
└── Breakpoints
```

O design deve ser consistente em todas as seções.

---

# 24. Dark / Light Mode

Se implementado, o modo escuro deve:

* Respeitar a preferência do sistema.
* Permitir alternância manual.
* Persistir a preferência.
* Manter contraste adequado.
* Não duplicar excessivamente estilos.

A implementação não deve prejudicar performance ou acessibilidade.

---

# 25. Animações

Utilizar animações somente quando contribuírem para:

* Hierarquia visual.
* Feedback de interação.
* Transição entre estados.
* Percepção de qualidade.

Evitar animações contínuas e excessivas.

Todas as animações devem respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 26. Integrações

Quando aplicável, disponibilizar links para:

* GitHub.
* LinkedIn.
* E-mail.
* Currículo.
* Projetos publicados.
* Artigos.
* Papers.
* Demos.

Não criar integrações backend desnecessárias.

---

# 27. GitHub Pages / CI

O projeto deve possuir pipeline automatizado para publicação.

Fluxo esperado:

```text
git push
   ↓
GitHub Actions
   ↓
Install dependencies
   ↓
Lint / Tests
   ↓
Build
   ↓
Deploy
   ↓
GitHub Pages
```

O pipeline deve falhar caso existam erros de build, lint ou testes configurados como obrigatórios.

---

# 28. Testes

Criar testes quando houver lógica relevante.

Priorizar:

* Componentes interativos.
* Funções utilitárias.
* Transformações de dados.
* Navegação crítica.
* Build.

Não criar testes artificiais apenas para aumentar cobertura.

---

# 29. Segurança

Mesmo sendo um site estático:

* Não expor secrets.
* Não armazenar tokens no frontend.
* Não incluir credenciais em arquivos de configuração.
* Validar URLs externas quando necessário.
* Manter dependências atualizadas.
* Evitar bibliotecas vulneráveis ou abandonadas.

---

# 30. Critérios de aceitação

O projeto será considerado concluído quando:

* [x] O site estiver totalmente em português.
* [x] O conteúdo tiver sido tecnicamente revisado.
* [x] O layout tiver sido modernizado.
* [x] O site for responsivo.
* [x] O site funcionar corretamente no GitHub Pages.
* [x] Não existir dependência de backend.
* [x] SEO básico estiver implementado.
* [x] Acessibilidade básica estiver implementada.
* [x] Performance estiver otimizada.
* [x] Os projetos estiverem apresentados de forma profissional.
* [x] GitHub e demais canais profissionais estiverem acessíveis.
* [x] O código estiver organizado e manutenível.
* [x] Não existirem dependências desnecessárias.
* [x] O build funcionar de forma reproduzível.
* [x] O deploy via GitHub Actions estiver configurado.
* [x] Não existirem erros no console do navegador.
* [x] Não existirem links quebrados.
* [x] O conteúdo não contenha informações profissionais inventadas.

> Evidência item a item: `docs/audit/spec-completion-2026-09.md`. A verificação
> final de "funcionar corretamente no GitHub Pages" e "links quebrados" **em
> produção** (site no ar) fica registrada na Task 013 → `Produção validada`.

---

# 31. Processo de implementação

A implementação deve seguir esta ordem:

### Fase 1 — Auditoria

Analisar o projeto atual:

* Stack.
* Estrutura.
* Componentes.
* Conteúdo.
* Dependências.
* Configuração.
* Performance.
* Problemas de UX.
* Problemas de acessibilidade.
* Compatibilidade com GitHub Pages.

### Fase 2 — Arquitetura

Definir:

* Stack final.
* Estrutura de diretórios.
* Componentização.
* Design system.
* Estratégia de conteúdo.
* Estratégia de build/deploy.

### Fase 3 — Conteúdo

Reescrever todo o conteúdo existente com foco em:

* Clareza.
* Precisão técnica.
* Recrutamento.
* Resultados.
* Experiência profissional.

### Fase 4 — Design

Redesenhar a interface seguindo os princípios de frontend design definidos neste PRD.

### Fase 5 — Implementação

Implementar o novo site utilizando a arquitetura definida.

### Fase 6 — Qualidade

Executar:

* Lint.
* Testes.
* Build.
* Lighthouse.
* Verificação de acessibilidade.
* Verificação de links.
* Testes responsivos.

### Fase 7 — Deploy

Configurar GitHub Actions e publicar no GitHub Pages.

---

# 32. Regra importante para o conteúdo

O projeto deve **preservar a veracidade das informações profissionais**.

É permitido:

* Reescrever.
* Resumir.
* Reorganizar.
* Tornar tecnicamente mais preciso.
* Alterar completamente a redação.
* Alterar a estrutura da informação.

Não é permitido inventar:

* Experiência.
* Cargos.
* Empresas.
* Projetos.
* Tecnologias.
* Resultados.
* Certificações.
* Formação.
* Métricas.

Quando uma informação estiver incompleta, utilizar o conteúdo disponível ou deixar a informação preparada para preenchimento posterior.

---

# 33. Resultado esperado

O resultado final deve parecer um **portfólio técnico profissional**, e não simplesmente uma página pessoal.

Um recrutador deve conseguir compreender em poucos segundos:

> **Quem é o profissional → o que ele faz → quais tecnologias domina → quais projetos realizou → onde encontrar seu trabalho.**

Ao mesmo tempo, um profissional técnico deve conseguir avaliar a profundidade das experiências apresentadas.

O próprio site deve funcionar como uma demonstração indireta de:

* Engenharia de software.
* Organização de código.
* Design de interface.
* Performance.
* Arquitetura.
* Qualidade.
* Atenção aos detalhes.
