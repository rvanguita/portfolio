import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// jsdom não implementa matchMedia nem IntersectionObserver — usados pelo tema,
// pelo scroll-spy e pelo guard de prefers-reduced-motion. Nos testes assumimos
// "menos movimento" (matches:true p/ prefers-reduced-motion) para determinismo.
if (typeof window.matchMedia !== "function") {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: /prefers-reduced-motion/.test(query),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

// Alguns ambientes jsdom não expõem localStorage utilizável — fallback em memória.
try {
  window.localStorage.setItem("__probe__", "1");
  window.localStorage.removeItem("__probe__");
} catch {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  });
}

if (typeof window.IntersectionObserver !== "function") {
  const MockIntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(() => []),
    root: null,
    rootMargin: "",
    thresholds: [] as number[],
  }));
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
}
