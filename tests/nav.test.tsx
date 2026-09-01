import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { NAV_ITEMS } from "@/lib/nav";

describe("Menu de navegação (porte de test_nav_sections_consistency)", () => {
  it("todo link do menu aponta para uma <section> existente na home", () => {
    const { container } = render(<HomePage />);
    const sectionIds = new Set(
      [...container.querySelectorAll("section[id]")].map((el) => el.id),
    );
    const missing = NAV_ITEMS.filter((item) => !sectionIds.has(item.id));
    expect(missing.map((m) => m.id)).toEqual([]);
  });

  it("cobre exatamente as 6 seções âncora", () => {
    expect(NAV_ITEMS.map((item) => item.id).sort()).toEqual(
      [
        "certificados",
        "experiencia",
        "formacao",
        "habilidades",
        "projetos",
        "sobre",
      ].sort(),
    );
  });
});
