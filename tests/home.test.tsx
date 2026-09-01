import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

const REQUIRED_SECTIONS = [
  "sobre",
  "habilidades",
  "projetos",
  "experiencia",
  "formacao",
  "certificados",
];

describe("HomePage", () => {
  it("renderiza sem quebrar e expõe todas as âncoras de navegação", () => {
    const { container } = render(<HomePage />);
    for (const id of REQUIRED_SECTIONS) {
      expect(
        container.querySelector(`section#${id}`),
        `seção #${id} ausente`,
      ).not.toBeNull();
    }
  });

  it("não tem id duplicado (porte de test_unique_ids)", () => {
    const { container } = render(<HomePage />);
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });
});
