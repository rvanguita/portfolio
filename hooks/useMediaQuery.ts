"use client";

import { useEffect, useState } from "react";

/**
 * Observa uma media query. Retorna `false` no primeiro render (SSR / antes da
 * hidratação) e sincroniza com o valor real no `useEffect`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * `true` quando o sistema pede menos movimento. Consultado antes de qualquer
 * rolagem programática ou animação Framer — `behavior: 'smooth'` em JS ignora
 * o `@media (prefers-reduced-motion)` do CSS.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
