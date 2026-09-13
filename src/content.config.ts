import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Coleção 'projetos'. `kind: full` traz corpo Markdown (estudo de
// caso migrado verbatim); `kind: light` traz só a ficha `spec` estruturada.
const projetos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    category: z.string(),
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
  }),
});

export const collections = { projetos };
