import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { HERO_STATS } from "@/lib/site-stats";

describe("Hero (bloco de autoria editorial)", () => {
  it("renderiza o kicker de função e as telhas de estatística", () => {
    render(<Hero />);
    expect(screen.getByText("Cientista de Dados")).toBeInTheDocument();
    for (const stat of HERO_STATS) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });
});
