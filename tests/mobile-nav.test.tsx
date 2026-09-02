import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";

/** Navbar renderiza <ThemeToggle>, que precisa do ThemeProvider. */
function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );
}

function getMenu(container: HTMLElement) {
  const menu = container.querySelector("#navMenu");
  if (!menu) throw new Error("#navMenu não encontrado");
  return menu;
}

describe("Navegação mobile (menu hambúrguer)", () => {
  it("abre e fecha ao clicar no botão", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    const toggle = screen.getByRole("button", {
      name: "Abrir menu de navegação",
    });
    const menu = getMenu(container);

    expect(menu.classList.contains("open")).toBe(false);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(menu.classList.contains("open")).toBe(true);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);
    expect(menu.classList.contains("open")).toBe(false);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("Escape fecha o menu e devolve o foco ao botão", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    const toggle = screen.getByRole("button", {
      name: "Abrir menu de navegação",
    });
    const menu = getMenu(container);

    await user.click(toggle);
    expect(menu.classList.contains("open")).toBe(true);

    await user.keyboard("{Escape}");
    expect(menu.classList.contains("open")).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it("clique fora fecha o menu", async () => {
    const user = userEvent.setup();
    const { container } = renderNavbar();
    const toggle = screen.getByRole("button", {
      name: "Abrir menu de navegação",
    });
    const menu = getMenu(container);

    await user.click(toggle);
    expect(menu.classList.contains("open")).toBe(true);

    await user.click(document.body);
    expect(menu.classList.contains("open")).toBe(false);
  });
});
