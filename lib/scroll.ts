import { BASE_PATH } from "@/lib/base-path";

/** Caminho da home considerando o basePath (ex.: "/portfolio/"). */
export function homePath(): string {
  return `${BASE_PATH}/`;
}

export function isOnHome(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.replace(/\/+$/, "/");
  return path === homePath() || path === `${BASE_PATH}` || path === "/";
}

/**
 * Rola até um elemento respeitando prefers-reduced-motion. `behavior: 'smooth'`
 * passado aqui sobrepõe o `scroll-behavior` do CSS, então o guard é feito no JS.
 */
export function scrollToId(id: string, reducedMotion: boolean): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

export function scrollToTop(reducedMotion: boolean): void {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
}
