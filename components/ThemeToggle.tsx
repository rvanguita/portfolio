"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

/** Botão de alternância de tema — consome o ThemeContext (Context + useReducer). */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  // O quadro estático não conhece o tema do cliente (ver lib/theme.ts). Só
  // refletimos o estado real depois da montagem — evita divergência de
  // hidratação em `aria-pressed` para quem prefere o tema escuro.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

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
