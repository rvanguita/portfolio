import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { projects } from "@/lib/data/projects";
import { certificates } from "@/lib/data/certificates";

/** Coleta os data-* dos botões de filtro renderizados. */
function filterValues(container: HTMLElement, selector: string, attr: string) {
  return new Set(
    [...container.querySelectorAll(selector)]
      .map((el) => el.getAttribute(attr))
      .filter((v): v is string => v !== null && v !== "all"),
  );
}

describe("Filtros de projeto (porte de test_category_filters_consistency)", () => {
  it("toda categoria de projeto tem botão de filtro e vice-versa", () => {
    const { container } = render(<Projects />);
    const buttons = filterValues(container, ".filter-btn", "data-category");
    const cats = new Set(projects.map((p) => p.category));
    expect([...cats].filter((c) => !buttons.has(c))).toEqual([]);
    expect([...buttons].filter((b) => !cats.has(b as never))).toEqual([]);
  });

  it("clicar num filtro esconde os cards que não casam", async () => {
    const user = userEvent.setup();
    const { container } = render(<Projects />);
    expect(container.querySelectorAll(".project-card-item")).toHaveLength(
      projects.length,
    );
    await user.click(screen.getByRole("button", { name: "Machine Learning" }));
    const shown = [...container.querySelectorAll(".project-card-item")];
    expect(shown.length).toBe(
      projects.filter((p) => p.category === "ml").length,
    );
    expect(
      shown.every((el) => el.getAttribute("data-category") === "ml"),
    ).toBe(true);
  });
});

describe("Filtros de certificado (porte de test_cert_filters_consistency)", () => {
  it("toda categoria de certificado tem botão de filtro e vice-versa", () => {
    const { container } = render(<Certificates />);
    const buttons = filterValues(
      container,
      ".cert-filter-btn",
      "data-cert-category",
    );
    const cats = new Set(certificates.map((g) => g.key));
    expect([...cats].filter((c) => !buttons.has(c))).toEqual([]);
    expect([...buttons].filter((b) => !cats.has(b as never))).toEqual([]);
  });
});
