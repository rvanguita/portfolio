import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import LakeFastF1Page from "@/app/projects/lake-fastf1/page";
import WindFarmPage from "@/app/projects/wind-farm/page";

describe("Estrutura de acessibilidade (Task 009)", () => {
  it("home: cada <section> tem aria-labelledby resolvível; um único <h1>", () => {
    const { container } = render(<HomePage />);
    const sections = [...container.querySelectorAll("section")];

    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const id = section.getAttribute("aria-labelledby");
      expect(id, `section#${section.id || "(hero)"} sem aria-labelledby`).toBeTruthy();
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
  ] as const)(
    "%s: <pre> como imagem, <table> com <caption> e th[scope=col]",
    (_slug, Page) => {
      const { container } = render(<Page />);

      const pre = container.querySelector("pre");
      expect(pre?.getAttribute("role")).toBe("img");
      expect((pre?.getAttribute("aria-label") ?? "").length).toBeGreaterThan(20);

      const table = container.querySelector("table.stack-table");
      expect(table?.querySelector("caption")).not.toBeNull();
      expect(table?.querySelectorAll('th[scope="col"]')).toHaveLength(3);

      expect(container.querySelectorAll("h1")).toHaveLength(1);
    },
  );
});
