import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import LakeFastF1Page from "@/app/projects/lake-fastf1/page";
import WindFarmPage from "@/app/projects/wind-farm/page";

describe("Estrutura de acessibilidade", () => {
  it("home: cada <section> tem aria-labelledby resolvível; um único <h1>", () => {
    const { container } = render(<HomePage />);
    const sections = [...container.querySelectorAll("section")];

    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const id = section.getAttribute("aria-labelledby");
      expect(id, `section#${section.id} sem aria-labelledby`).toBeTruthy();
      expect(
        container.querySelector(`#${id}`),
        `heading #${id} inexistente`,
      ).not.toBeNull();
    }

    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it.each([
    ["lake-fastf1", LakeFastF1Page],
    ["wind-farm", WindFarmPage],
  ] as const)("%s: um único <h1>", (_slug, Page) => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});
