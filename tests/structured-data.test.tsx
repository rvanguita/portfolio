import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import LakeFastF1Page from "@/app/projects/lake-fastf1/page";
import WindFarmPage from "@/app/projects/wind-farm/page";
import { SITE_URL } from "@/lib/base-path";
import { profile } from "@/lib/data/profile";

type Node = Record<string, unknown> & { "@type"?: string };

function blocks(container: HTMLElement): Record<string, unknown>[] {
  return [
    ...container.querySelectorAll('script[type="application/ld+json"]'),
  ].map((el) => JSON.parse(el.textContent || "{}"));
}

function nodes(container: HTMLElement): Node[] {
  return blocks(container).flatMap(
    (b) => (b["@graph"] as Node[] | undefined) ?? [b as Node],
  );
}

describe("Dados estruturados (JSON-LD)", () => {
  it("home: Person + WebSite, @context e @id sob SITE_URL", () => {
    const { container } = render(<HomePage />);
    const graph = nodes(container);
    const person = graph.find((n) => n["@type"] === "Person");
    const site = graph.find((n) => n["@type"] === "WebSite");

    expect(blocks(container)[0]["@context"]).toBe("https://schema.org");
    expect(person).toBeDefined();
    expect(site).toBeDefined();
    expect(person!.name).toBe(profile.name);
    expect((person!["@id"] as string).startsWith(SITE_URL)).toBe(true);
    expect((site!.publisher as { "@id": string })["@id"]).toBe(person!["@id"]);
  });

  it("home: Person não declara campos não verificáveis", () => {
    const { container } = render(<HomePage />);
    const person = nodes(container).find((n) => n["@type"] === "Person")!;
    for (const forbidden of ["worksFor", "birthDate", "award"]) {
      expect(person).not.toHaveProperty(forbidden);
    }
  });

  it.each([
    ["lake-fastf1", LakeFastF1Page],
    ["wind-farm", WindFarmPage],
  ] as const)(
    "%s: BreadcrumbList + Article ligados a #person / #website",
    (slug, Page) => {
      const { container } = render(<Page />);
      const graph = nodes(container);
      const crumb = graph.find((n) => n["@type"] === "BreadcrumbList");
      const article = graph.find((n) => n["@type"] === "Article");

      expect(crumb).toBeDefined();
      expect(article).toBeDefined();
      expect(article!.url).toBe(`${SITE_URL}/projects/${slug}/`);
      expect((article!.author as { "@id": string })["@id"]).toBe(
        `${SITE_URL}/#person`,
      );
      expect((article!.isPartOf as { "@id": string })["@id"]).toBe(
        `${SITE_URL}/#website`,
      );
      expect(article).not.toHaveProperty("datePublished");
    },
  );
});
