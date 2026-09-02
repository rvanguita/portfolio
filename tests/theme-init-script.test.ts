import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "@/lib/theme";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

// Regressão: `THEME_STORAGE_KEY` já foi importado de `context/ThemeContext`
// (módulo `"use client"`) e interpolado no <script> inline do layout. No build
// RSC isso vira uma referência de client e o script sai como JS inválido
// (`SyntaxError: missing ) after argument list`) — o anti-FOUC deixa de rodar e
// aparece um erro no console (PRD §30). O script mora em `lib/theme.ts`, um
// módulo sem `"use client"`, justamente para não quebrar assim.
describe("script anti-FOUC do tema", () => {
  it("é JavaScript sintaticamente válido", () => {
    expect(() => new Function(THEME_INIT_SCRIPT)).not.toThrow();
  });

  it("lê a chave real do localStorage (não um stub de client reference)", () => {
    expect(THEME_INIT_SCRIPT).toContain(
      `localStorage.getItem('${THEME_STORAGE_KEY}')`,
    );
    expect(THEME_INIT_SCRIPT).not.toMatch(
      /Attempted to call|client function|from the server/i,
    );
  });

  it("aplica data-theme e cai para prefers-color-scheme", () => {
    expect(THEME_INIT_SCRIPT).toContain("setAttribute('data-theme'");
    expect(THEME_INIT_SCRIPT).toContain("prefers-color-scheme: dark");
  });

  it("lib/theme.ts não é um módulo client", () => {
    // diretiva "use client" isolada numa linha — não o menção no comentário
    expect(read("lib/theme.ts")).not.toMatch(/^\s*(['"])use client\1\s*;?\s*$/m);
  });

  it("app/layout.tsx injeta o script vindo de @/lib/theme", () => {
    const layout = read("app/layout.tsx");
    expect(layout).toMatch(/THEME_INIT_SCRIPT.*from "@\/lib\/theme"/s);
    expect(layout).toContain("__html: THEME_INIT_SCRIPT");
  });
});
