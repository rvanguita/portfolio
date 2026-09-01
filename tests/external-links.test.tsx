import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import LakeFastF1Page from "@/app/projects/lake-fastf1/page";

describe("Links externos (porte de test_external_links_security_attrs)", () => {
  it.each([
    ["home", <HomePage key="home" />],
    ["case study lake-fastf1", <LakeFastF1Page key="cs" />],
  ])("todo <a target=_blank> em %s tem rel=noopener", (_label, ui) => {
    const { container } = render(ui);
    const offenders = [...container.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !(a.getAttribute("rel") ?? "").split(/\s+/).includes("noopener"))
      .map((a) => a.getAttribute("href"));
    expect(offenders).toEqual([]);
  });
});
