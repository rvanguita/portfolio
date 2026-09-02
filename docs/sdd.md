Para uso com IA, eu estruturaria o **SDD (Software Design Document)** para reduzir ambiguidades e permitir que agentes de código implementem o projeto por etapas, sem tomar decisões arquiteturais arbitrárias.

````markdown
# SDD — Site Pessoal / Portfólio Técnico

## 1. Document Control

| Campo | Valor |
|---|---|
| Projeto | Personal Portfolio |
| Documento | Software Design Document |
| Versão | 1.0 |
| Status | Draft |
| Idioma da aplicação | pt-BR |
| Deploy | GitHub Pages |
| Tipo | Static Website |

---

# 2. Objetivo do Documento

Este documento define a arquitetura, decisões técnicas, estrutura de código,
padrões de implementação e critérios técnicos para implementação do site
pessoal/portfólio.

O documento deve ser utilizado como referência durante a implementação,
especialmente por agentes de IA.

### Princípio

> A IA deve implementar as decisões definidas neste documento e não
> introduzir decisões arquiteturais sem justificativa.

Quando existir ambiguidade, deve ser priorizada a solução:

1. Mais simples.
2. Mais sustentável.
3. Compatível com GitHub Pages.
4. Com menor número de dependências.
5. Consistente com as decisões já estabelecidas neste documento.

---

# 3. Relação com o PRD

O PRD define **o que o produto deve fazer**.

Este documento define **como o produto será construído**.

```text
PRD
 │
 ├── Requisitos funcionais
 ├── Requisitos não funcionais
 ├── Público-alvo
 └── Objetivos
       │
       ▼
SDD
 │
 ├── Arquitetura
 ├── Stack
 ├── Componentes
 ├── Dados
 ├── UX/UI
 ├── SEO
 ├── Performance
 ├── Testes
 └── Deploy
````

O SDD não deve contradizer o PRD.

Quando houver conflito, o conflito deve ser identificado antes da implementação.

---

# 4. Princípios Arquiteturais

A implementação deve seguir:

* KISS.
* DRY.
* Separation of Concerns.
* Clean Code.
* Progressive Enhancement.
* Accessibility First.
* Performance First.
* Security by Default.
* Static First.

### Regras

* Não adicionar dependências sem necessidade.
* Não criar abstrações prematuras.
* Não utilizar backend quando uma solução estática for suficiente.
* Não duplicar conteúdo.
* Não duplicar componentes.
* Não implementar funcionalidades não especificadas no PRD.
* Não introduzir tecnologia apenas por preferência pessoal.
* Não sacrificar acessibilidade por estética.
* Não sacrificar performance por animações.

---

# 5. Arquitetura Geral

## 5.1 Visão

```text
                    GitHub Repository
                           │
                           ▼
                    GitHub Actions
                           │
                           ▼
                       Build
                           │
                           ▼
                    Static Assets
                           │
                           ▼
                     GitHub Pages
                           │
                           ▼
                       Browser
```

O sistema não possuirá backend próprio.

---

# 6. Stack Tecnológica

## 6.1 Framework

Definir após auditoria do projeto atual.

Critérios:

| Critério          |  Prioridade |
| ----------------- | ----------: |
| GitHub Pages      | Obrigatório |
| Static generation | Obrigatório |
| SEO               |        Alta |
| Performance       |        Alta |
| Manutenção        |        Alta |
| Complexidade      |       Baixa |
| Ecossistema       |       Média |

A escolha final deve ser registrada como uma ADR.

---

## 6.2 Linguagem

A linguagem deve ser determinada pela stack escolhida.

Preferências:

* TypeScript quando JavaScript for necessário.
* CSS moderno.
* HTML semântico.

Evitar JavaScript quando HTML/CSS forem suficientes.

---

# 7. Estrutura do Projeto

Estrutura inicial esperada:

```text
/
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.*
│   ├── robots.txt
│   └── ...
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   ├── styles/
│   ├── lib/
│   └── config/
│
├── tests/
│
├── .github/
│   └── workflows/
│
├── package.json
├── README.md
└── ...
```

A estrutura definitiva pode variar conforme o framework escolhido.

---

# 8. Organização de Responsabilidades

## Components

Responsáveis exclusivamente por UI reutilizável.

Exemplos:

```text
Header
Navigation
Button
ProjectCard
SkillGroup
Timeline
SocialLinks
Footer
```

## Pages

Responsáveis pela composição das páginas.

Não devem conter lógica de negócio complexa.

## Content

Responsável pelo conteúdo apresentado ao usuário.

Exemplo:

```text
content/
├── profile
├── projects
├── experience
└── education
```

O conteúdo deve ser separado da apresentação sempre que isso melhorar
manutenção e reutilização.

## Lib

Funções utilitárias e lógica compartilhada.

## Config

Configurações centralizadas da aplicação.

---

# 9. Modelo de Conteúdo

Projetos devem possuir uma estrutura consistente.

Exemplo conceitual:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  results?: string[];
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
    paper?: string;
  };
}
```

O modelo definitivo deve refletir a tecnologia escolhida.

### Regra

Conteúdo profissional não deve ficar espalhado pelos componentes.

---

# 10. Design System

Criar tokens centralizados para:

```text
Colors
Typography
Spacing
Radius
Shadows
Breakpoints
Transitions
Z-index
```

Exemplo:

```text
tokens
├── colors
├── typography
├── spacing
├── radius
└── breakpoints
```

Componentes devem consumir tokens em vez de valores arbitrários.

---

# 11. Layout

O layout deve possuir:

```text
Header
   ↓
Hero
   ↓
About
   ↓
Skills
   ↓
Featured Projects
   ↓
Other Projects
   ↓
Experience
   ↓
Education
   ↓
Contact
   ↓
Footer
```

A composição poderá ser alterada durante a implementação se testes de UX
indicarem uma estrutura superior.

Alterações estruturais devem ser registradas.

---

# 12. Responsividade

Definir abordagem mobile-first.

Breakpoints devem ser definidos pelo conteúdo e não por dispositivos específicos.

Exemplo conceitual:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
   ↓
Wide
```

Nenhum componente pode depender de uma resolução específica.

---

# 13. Acessibilidade

Objetivo mínimo:

```text
WCAG 2.2 AA
```

Requisitos:

* HTML semântico.
* Keyboard navigation.
* Focus states.
* Contraste adequado.
* ARIA somente quando necessário.
* Alt text.
* Reduced motion.
* Form labels.
* Heading hierarchy.
* Skip navigation quando aplicável.

---

# 14. SEO

Implementar:

```text
title
description
canonical
Open Graph
Twitter/X metadata
robots.txt
sitemap
structured data
```

Dados estruturados devem representar somente informações verdadeiras
presentes no site.

---

# 15. Performance

Objetivos:

* Minimizar JavaScript.
* Minimizar dependências.
* Otimizar imagens.
* Lazy-load de conteúdo não crítico.
* Preload somente de recursos críticos.
* Evitar fontes excessivas.
* Evitar scripts de terceiros desnecessários.

### Meta

Buscar:

```text
Performance >= 90
Accessibility >= 90
Best Practices >= 90
SEO >= 90
```

As métricas são objetivos, não justificativa para hacks que prejudiquem
manutenibilidade.

---

# 16. Imagens e Assets

Imagens devem:

* Ser comprimidas.
* Utilizar formatos modernos quando apropriado.
* Possuir dimensões adequadas.
* Possuir `alt`.
* Não ser carregadas quando não forem necessárias.

Assets decorativos não devem prejudicar acessibilidade.

---

# 17. Navegação

A navegação deve possuir:

* Links semanticamente corretos.
* Estados hover/focus.
* Navegação por teclado.
* Identificação da seção atual quando aplicável.
* Comportamento adequado em mobile.

Links externos devem abrir em nova aba somente quando houver justificativa
de UX.

---

# 18. SEO / Social Preview

A página deve gerar previews adequados ao ser compartilhada.

Preparar:

```text
og:title
og:description
og:image
og:url
og:type
```

A imagem social deve possuir composição específica para compartilhamento,
não simplesmente reutilizar uma imagem aleatória do site.

---

# 19. Segurança

Como o sistema é estático:

* Nenhum secret no repository.
* Nenhum token no frontend.
* Nenhuma credencial hardcoded.
* Dependências auditadas.
* Links externos controlados.
* Conteúdo externo somente quando necessário.

---

# 20. GitHub Pages

O build deve gerar artefatos estáticos.

```text
Source
  ↓
Install
  ↓
Lint
  ↓
Test
  ↓
Build
  ↓
Deploy
```

O workflow deve falhar quando uma etapa obrigatória falhar.

---

# 21. CI/CD

Workflow:

```text
.github/workflows/
└── deploy.yml
```

Pipeline:

```text
Checkout
   ↓
Setup runtime
   ↓
Install dependencies
   ↓
Lint
   ↓
Tests
   ↓
Build
   ↓
Deploy GitHub Pages
```

Dependabot ou mecanismo equivalente pode ser utilizado para atualização
de dependências.

---

# 22. Testes

## Unit

Testar somente lógica relevante.

## Component

Testar componentes interativos quando necessário.

## E2E

Testar fluxos críticos:

```text
Homepage
Navigation
Project links
External links
Responsive navigation
```

Não buscar cobertura artificial.

---

# 23. Quality Gates

O Pull Request deve verificar:

```text
✓ Build
✓ Lint
✓ Tests
✓ Typecheck
✓ Broken links
```

Quando aplicável:

```text
✓ Accessibility
✓ Lighthouse
```

Nenhuma alteração deve ser considerada concluída enquanto o build estiver
quebrado.

---

# 24. Observabilidade

Como não existe backend, observabilidade deve permanecer mínima.

Opcionalmente:

* Web analytics.
* Performance monitoring.

Qualquer ferramenta de terceiros deve considerar:

* Privacidade.
* Performance.
* LGPD.
* Necessidade real.

---

# 25. Dependências

Toda dependência deve possuir justificativa.

Antes de adicionar uma biblioteca, verificar:

1. HTML/CSS/JS nativo resolve?
2. O framework já fornece a funcionalidade?
3. A dependência possui manutenção ativa?
4. Qual o impacto no bundle?
5. Existe risco de lock-in?

Se a resposta indicar que a dependência não é necessária, não adicioná-la.

---

# 26. ADR — Architecture Decision Records

Decisões arquiteturais relevantes devem ser registradas.

Estrutura:

```text
docs/
└── adr/
    ├── 001-framework.md
    ├── 002-content-architecture.md
    ├── 003-styling.md
    └── ...
```

Formato:

```markdown
# ADR-001 — Escolha do Framework

## Status

Accepted

## Context

...

## Decision

...

## Alternatives

...

## Consequences

...
```

---

# 27. Regras para Agentes de IA

Esta seção é obrigatória.

## 27.1 Antes de alterar código

A IA deve:

1. Inspecionar a estrutura existente.
2. Ler o PRD.
3. Ler este SDD.
4. Identificar decisões existentes.
5. Identificar código relacionado.
6. Verificar testes existentes.
7. Verificar dependências existentes.

Não modificar arquivos sem compreender seu contexto.

---

## 27.2 Escopo

A IA deve trabalhar em pequenas unidades.

Exemplo:

```text
Task 1
└── Implementar Header

Task 2
└── Implementar Hero

Task 3
└── Implementar Projects

Task 4
└── Implementar SEO

Task 5
└── Implementar CI/CD
```

Evitar solicitar:

> "Refatore o projeto inteiro."

Preferir tarefas isoladas e verificáveis.

---

# 28. Regras contra alucinação

A IA não pode inventar informações profissionais.

Quando uma informação não estiver disponível:

```text
UNKNOWN
```

ou utilizar um placeholder explicitamente identificável.

Nunca inventar:

* Experiência.
* Empresa.
* Cargo.
* Projeto.
* Métrica.
* Certificação.
* Tecnologia.
* Resultado.

---

# 29. Regras de alteração arquitetural

A IA não deve alterar:

* Framework.
* Arquitetura.
* Modelo de conteúdo.
* Design system.
* Estratégia de deploy.

sem:

1. Identificar o problema.
2. Explicar a necessidade.
3. Apresentar alternativa.
4. Registrar ADR quando relevante.

---

# 30. Definition of Done

Uma tarefa somente estará concluída quando:

* [ ] Implementação concluída.
* [ ] Código organizado.
* [ ] Sem duplicação desnecessária.
* [ ] Sem warnings relevantes.
* [ ] Lint aprovado.
* [ ] Typecheck aprovado.
* [ ] Testes aprovados.
* [ ] Build aprovado.
* [ ] Responsividade verificada.
* [ ] Acessibilidade verificada.
* [ ] SEO preservado.
* [ ] Nenhuma informação inventada.
* [ ] Documentação atualizada quando necessário.

---

# 31. Estratégia de Implementação por IA

A implementação deve seguir:

```text
PRD
 ↓
SDD
 ↓
ADR / Decisions
 ↓
Task Breakdown
 ↓
Implementation
 ↓
Verification
 ↓
Review
 ↓
Next Task
```

Nunca:

```text
Prompt
 ↓
IA modifica todo o projeto
 ↓
"parece funcionar"
```

---

# 32. Task Specification

Cada tarefa para a IA deve possuir:

```markdown
# Task

## Objective

O que deve ser implementado.

## Context

Contexto necessário.

## Scope

Arquivos/componentes que podem ser alterados.

## Constraints

Restrições técnicas.

## Acceptance Criteria

Critérios objetivos para considerar a tarefa concluída.

## Validation

Comandos ou verificações necessárias.

## Out of Scope

O que explicitamente não deve ser alterado.
```

---

# 33. Exemplo de Task

```markdown
# Task — Implementar ProjectCard

## Objective

Criar o componente responsável pela apresentação de projetos.

## Context

O componente será utilizado na seção Featured Projects.

## Scope

Criar:

src/components/ProjectCard.*

## Constraints

- Não adicionar dependências.
- Utilizar tokens do Design System.
- Ser responsivo.
- Ser acessível.
- Não conter dados hardcoded.

## Acceptance Criteria

- [ ] Recebe dados de um Project.
- [ ] Exibe título.
- [ ] Exibe descrição.
- [ ] Exibe tecnologias.
- [ ] Exibe links disponíveis.
- [ ] Links possuem estados de foco.
- [ ] Componente funciona em mobile.
- [ ] Testes passam.

## Validation

npm run lint
npm run test
npm run build

## Out of Scope

- Alteração do layout geral.
- Alteração do modelo Project.
- Alteração do Design System.
```

---

# 34. Contexto mínimo para IA

Cada agente deve receber, quando aplicável:

```text
PRD
SDD
ADR relevantes
Task atual
Arquivos relacionados
Critérios de aceitação
```

Não é necessário fornecer todo o repository como contexto textual.

A IA deve consultar os arquivos necessários.

---

# 35. Regra de Verificação

Após cada alteração relevante, a IA deve verificar:

```text
1. O código compila?
2. O lint passa?
3. Os testes passam?
4. O build passa?
5. A alteração respeita o PRD?
6. A alteração respeita o SDD?
7. Algum requisito existente foi quebrado?
8. Foi adicionada complexidade desnecessária?
```

Se alguma resposta for negativa, a tarefa não está concluída.

---

# 36. Gestão de Mudanças

Mudanças nos requisitos devem seguir:

```text
Change Request
      ↓
Impact Analysis
      ↓
PRD Update
      ↓
SDD Update
      ↓
ADR (se necessário)
      ↓
Implementation
```

Não implementar requisitos novos apenas porque parecem úteis.

---

# 37. Anti-Patterns

A IA não deve:

* Reescrever arquivos sem necessidade.
* Alterar dezenas de arquivos para uma tarefa pequena.
* Adicionar bibliotecas para problemas simples.
* Criar abstrações sem uso real.
* Introduzir estado global sem necessidade.
* Criar backend.
* Criar APIs desnecessárias.
* Inventar conteúdo.
* Ignorar erros de lint.
* Ignorar warnings importantes.
* Remover testes para fazer o build passar.
* Alterar configuração de infraestrutura sem necessidade.
* Fazer refatorações não relacionadas à tarefa.

---

# 38. Critério de Sucesso Técnico

O projeto deve demonstrar, através de sua própria implementação:

```text
Performance
    +
Accessibility
    +
SEO
    +
Maintainability
    +
Clean Architecture
    +
Good UI/UX
    +
Automated Delivery
```

O site não deve apenas apresentar competência técnica.

A implementação deve ser uma evidência dessa competência.

```

A diferença principal em relação ao PRD é que este SDD deve funcionar também como **contrato operacional para a IA**: reduz liberdade onde decisões precisam ser consistentes e mantém liberdade apenas onde existe uma decisão explicitamente delegada.
```
