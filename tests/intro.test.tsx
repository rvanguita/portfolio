import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Intro } from "@/components/Intro";
import { profile } from "@/lib/data/profile";

describe("Intro", () => {
  it("renderiza o nome no <h1> e o link de e-mail", () => {
    render(<Intro />);
    expect(
      screen.getByRole("heading", { level: 1, name: profile.name }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
});
