/**
 * Tema — constantes compartilhadas entre o Server Component `app/layout.tsx`
 * (script anti-FOUC, que roda no <head> antes da hidratação) e o client
 * `context/ThemeContext.tsx`.
 *
 * Este módulo **não** tem `"use client"` de propósito: um valor importado de um
 * módulo client vira uma *referência de client* no build RSC e, interpolado
 * como string no layout, produz um `<script>` inválido
 * (`SyntaxError: missing ) after argument list`) — o script anti-FOUC deixa de
 * rodar e volta o flash de tema.
 */

export type Theme = "light" | "dark";

/** Chave do tema em `localStorage`. */
export const THEME_STORAGE_KEY = "portfolio_theme";

/**
 * Executa antes da pintura: aplica `data-theme` em `<html>` lendo o
 * `localStorage` (com try/catch) e caindo para `prefers-color-scheme`.
 */
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var t = null;
    try { t = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;
