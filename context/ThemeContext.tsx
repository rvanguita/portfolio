"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

interface ThemeState {
  theme: Theme;
}

type ThemeAction = { type: "SET"; theme: Theme } | { type: "TOGGLE" };

function reducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET":
      return { theme: action.theme };
    case "TOGGLE":
      return { theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
}

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

/** localStorage pode lançar (modo privado / política) — degradação silenciosa. */
function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* sem persistência nesta sessão */
  }
}

/** Estado inicial: o atributo que o script anti-FOUC já colocou em <html>. */
function initialState(): ThemeState {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return { theme: attr };
  }
  // Fora do browser (frame RSC do export estático) não há atributo para ler.
  // O sistema editorial é claro por padrão (`:root` puro = claro); o script
  // anti-FOUC ainda ajusta `data-theme` antes da hidratação.
  return { theme: "light" };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  // Reconciliação após a hidratação: se houver valor persistido diferente do
  // que o script inline aplicou, alinha o estado do React a ele.
  useEffect(() => {
    const stored = readStoredTheme();
    if (stored && stored !== state.theme) dispatch({ type: "SET", theme: stored });
    // Executa só na montagem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efeito colateral do tema: atributo no <html> + persistência.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    persistTheme(state.theme);
  }, [state.theme]);

  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
