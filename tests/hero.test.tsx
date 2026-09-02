import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { HeroSignature } from "@/components/HeroSignature";
import { HERO_STATS } from "@/lib/site-stats";

describe("Hero (redesign Telemetria)", () => {
  it("renderiza o rótulo de canal CH0 e as readout tiles", () => {
    render(<Hero />);
    expect(screen.getByText(/CH0 ·/)).toBeInTheDocument();
    for (const stat of HERO_STATS) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("HeroSignature monta sem quebrar e é decorativo", () => {
    const { container } = render(<HeroSignature />);
    const sig = container.querySelector(".hero-signature");
    expect(sig).not.toBeNull();
    expect(sig).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg path")).not.toBeNull();
  });
});
