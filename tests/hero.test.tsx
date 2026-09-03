import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { profile } from "@/lib/data/profile";

describe("Hero", () => {
  it("renderiza o kicker de função e o nome no <h1>", () => {
    render(<Hero />);
    expect(screen.getByText(profile.jobTitle)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
  });
});
