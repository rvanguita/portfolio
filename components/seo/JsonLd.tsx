/**
 * Emite um bloco JSON-LD (<script type="application/ld+json">) direto no HTML
 * estático. Server Component — zero JavaScript no cliente. O conteúdo vem de
 * lib/seo/schema.ts (repo-authored, não é entrada de usuário), então a injeção
 * é segura — mesmo racional de <Rich> e do script de tema em app/layout.tsx.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
