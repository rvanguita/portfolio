import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/lib/data/projects";

const featuredCount = projects.filter((p) => p.featured).length;
const otherCount = projects.filter((p) => !p.featured).length;

describe("Divisão em destaque / outros projetos (PRD §12)", () => {
  it("há pelo menos dois projetos em destaque nos dados", () => {
    expect(featuredCount).toBeGreaterThanOrEqual(2);
    expect(featuredCount + otherCount).toBe(projects.length);
  });

  it("sem filtro: grid de destaque + <details> com os demais, todos no DOM", () => {
    const { container } = render(<Projects />);

    const featured = container.querySelectorAll(
      ".projects-grid-featured .project-card-item",
    );
    const others = container.querySelectorAll(
      ".projects-other .project-card-item",
    );

    expect(featured).toHaveLength(featuredCount);
    expect(others).toHaveLength(otherCount);
    expect(container.querySelectorAll(".project-card-item")).toHaveLength(
      projects.length,
    );
    expect(container.querySelector(".projects-other")?.tagName).toBe("DETAILS");
  });

  it("com filtro de categoria: some a divisão, fica só a grade filtrada", async () => {
    const user = userEvent.setup();
    const { container } = render(<Projects />);

    await user.click(screen.getByRole("button", { name: "Machine Learning" }));

    expect(container.querySelector(".projects-grid-featured")).toBeNull();
    expect(container.querySelector(".projects-other")).toBeNull();

    const shown = [...container.querySelectorAll(".project-card-item")];
    expect(shown.length).toBe(
      projects.filter((p) => p.category === "ml").length,
    );
    expect(
      shown.every((el) => el.getAttribute("data-category") === "ml"),
    ).toBe(true);
  });
});
