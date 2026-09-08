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
    repos: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    // Nome(s) do repositório no GitHub que este projeto representa — usados para
    // sobrepor metadados ao vivo (★, data, linguagem) e para removê-los da
    // seção automática "Mais no GitHub". `repo` é o principal; `reposGh` os demais.
    repo: z.string().optional(),
    reposGh: z.array(z.string()).default([]),
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
