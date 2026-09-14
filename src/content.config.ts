import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Coleção 'projetos'. `kind: full` traz corpo Markdown (estudo de
// caso migrado verbatim); `kind: light` traz só a ficha `spec` estruturada.
const projetos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
  schema: z
    .object({
      title: z.string(),
      order: z.number(),
      category: z.string(),
      // Período do trabalho, para o leitor situar recência. Vem da data real dos
      // repositórios do projeto (criação → último push), nunca de estimativa.
      periodo: z.string(),
      // Data do último trabalho no projeto, em ISO. Alimenta o `lastmod` do
      // sitemap, que precisa de timestamp — `periodo` é intervalo de exibição.
      atualizadoEm: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      kind: z.enum(["full", "light"]),
      summary: z.string(),
      leadHtml: z.string().optional(),
      metric: z.object({
        label: z.string(),
        value: z.string(),
        sub: z.string().optional(),
      }),
      // O que `metric` de fato é. Obrigatório e sem valor padrão de propósito:
      // só 3 dos 9 projetos têm métrica aferida, e um padrão silencioso faria
      // escopo, arquitetura e propriedade de dataset passarem por resultado.
      metricKind: z.enum([
        "medida",
        "arquitetura",
        "publicacao",
        "desenvolvimento",
      ]),
      stack: z.string(),
      // Arquitetura em camadas, quando o projeto tem uma de verdade. Opcional de
      // propósito: só 4 dos 9 projetos têm fluxo medalhão, e um diagrama genérico
      // nos outros inventaria um pipeline que o estudo de caso não descreve.
      // Cada diagrama tem de ser fiel ao seu próprio caso — o Rota do Perfume,
      // por exemplo, vai de bronze a gold e não tem camada raw.
      architecture: z
        .object({
          caption: z.string(),
          orchestrator: z.string().optional(),
          stages: z
            .array(
              z.object({
                layer: z.enum(["source", "raw", "bronze", "silver", "gold"]),
                name: z.string(),
                detail: z.string(),
                tech: z.string(),
              }),
            )
            .min(2),
          outputs: z
            .array(z.object({ role: z.string(), tech: z.string() }))
            .default([]),
        })
        .optional(),
      repos: z
        .array(z.object({ label: z.string(), url: z.string() }))
        .default([]),
      spec: z
        .object({
          problema: z.string(),
          dados: z.string(),
          metodo: z.string(),
          resultado: z.string(),
        })
        .optional(),
      description: z.string(),
    })
    // `spec` é opcional no objeto porque `kind: full` não a usa — mas um projeto
    // `light` sem ela publicaria quatro <dd> vazios e passaria no build. Amarrar
    // as duas coisas aqui transforma esse descuido em erro de schema.
    .superRefine((project, ctx) => {
      if (project.kind === "light" && !project.spec) {
        ctx.addIssue({
          code: "custom",
          path: ["spec"],
          message:
            "kind: light exige a ficha `spec` (problema, dados, metodo, resultado).",
        });
      }
    }),
});

export const collections = { projetos };
