import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

const SECTIONS = ["projetos", "trajetoria", "competencias", "certificacoes"];

describe("HomePage", () => {
  it("renderiza sem quebrar e expõe as âncoras de seção", () => {
    const { container } = render(<HomePage />);
    for (const id of SECTIONS) {
      expect(
        container.querySelector(`section#${id}`),
        `seção #${id} ausente`,
      ).not.toBeNull();
    }
  });

  it("não tem id duplicado", () => {
    const { container } = render(<HomePage />);
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });
});
