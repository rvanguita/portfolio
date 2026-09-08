import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Coleção 'projetos' — 6 entradas. `kind: full` traz corpo Markdown (estudo de
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
    stack: z.string(),
    repos: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    trace: z.enum([
      "convergence",
      "power",
      "noise",
      "threshold",
      "imbalance",
      "sentiment",
      "pipeline",
      "propensity",
    ]),
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
