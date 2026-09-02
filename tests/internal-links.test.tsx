import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/base-path";
import { projects } from "@/lib/data/projects";
import { certificates } from "@/lib/data/certificates";

// Rotas geradas pelo App Router (uma page.tsx por rota + trailingSlash).
const ROUTES = ["/", "/projects/lake-fastf1/", "/projects/wind-farm/"];

describe("Links internos e recursos referenciados (Task 011)", () => {
  it("sitemap.ts cobre exatamente as rotas geradas", () => {
    const sitemapPaths = sitemap()
      .map((entry) => entry.url.replace(SITE_URL, ""))
      .sort();
    expect(sitemapPaths).toEqual([...ROUTES].sort());
  });

  it("toda action de projeto é um link https externo ou uma rota interna existente", () => {
    for (const project of projects) {
      for (const action of project.actions) {
        if (action.url.includes("://")) {
          expect(
            action.url.startsWith("https://"),
            `${project.key}: ${action.url} não é https`,
          ).toBe(true);
        } else {
          expect(ROUTES, `${project.key}: rota ${action.url}`).toContain(
            action.url,
          );
        }
      }
    }
  });

  it("todo PDF de certificado existe em /public", () => {
    const missing: string[] = [];
    for (const group of certificates) {
      for (const item of group.items) {
        if (!existsSync(join(process.cwd(), "public", item.path))) {
          missing.push(item.path);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});
