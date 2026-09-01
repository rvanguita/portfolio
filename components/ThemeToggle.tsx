"use client";

import { useTheme } from "@/hooks/useTheme";

/** Botão de alternância de tema — consome o ThemeContext (Context + useReducer). */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="btn-theme-toggle"
      onClick={toggle}
      aria-label="Alternar modo escuro ou claro"
      title="Alternar Tema"
      aria-pressed={isDark}
    >
      <span className="theme-icon-moon" aria-hidden="true">
        ☾
      </span>
      <span className="theme-icon-sun" aria-hidden="true">
        ☼
      </span>
    </button>
  );
}
