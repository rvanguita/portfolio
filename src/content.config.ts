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
