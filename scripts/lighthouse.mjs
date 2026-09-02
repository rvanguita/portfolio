// ============================================================================
// Lighthouse — orçamento de performance do export estático (Task 010 / ADR-008)
// ============================================================================
// Serve `out/` sob o base path `/portfolio`, roda o Lighthouse nas rotas-chave
// (home + os dois estudos de caso) nos form factors mobile e desktop, grava os
// relatórios em `lighthouse-report/` e sai com código ≠ 0 se qualquer categoria
// (Performance / Accessibility / Best Practices / SEO) ficar abaixo do limite.
//
// Requer um `next build` anterior (a pasta `out/`). `npm run lighthouse` faz o
// build antes; no CI o build já rodou no passo anterior.
//
// Sem dependências além de `lighthouse` (que já traz `chrome-launcher`).
// O binário do Chrome vem de `CHROME_PATH` quando definido (ver ci.yml).
// ============================================================================

import { createServer } from "node:http";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const ROOT = fileURLToPath(new URL("../out/", import.meta.url));
const REPORT_DIR = fileURLToPath(new URL("../lighthouse-report/", import.meta.url));
const BASE_PATH = "/portfolio";
const PORT = 4178;
const THRESHOLD = 90;

const ROUTES = [
  { slug: "home", path: `${BASE_PATH}/` },
  { slug: "case-wind-farm", path: `${BASE_PATH}/projects/wind-farm/` },
  { slug: "case-lake-fastf1", path: `${BASE_PATH}/projects/lake-fastf1/` },
];

// O score de performance móvel varia entre execuções (throttling simulado). Como
// o Lighthouse CI, roda N vezes por alvo e usa a mediana. Sobrescreva com
// `LH_RUNS=1` para uma passada rápida em desenvolvimento.
const RUNS = Math.max(1, Number(process.env.LH_RUNS) || 3);

const median = (nums) => {
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const CATEGORIES = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["best-practices", "Best Practices"],
  ["seo", "SEO"],
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".map": "application/json",
  ".webmanifest": "application/manifest+json",
};

// GitHub Pages serve os assets de texto com `Content-Encoding: gzip`. O
// servidor de teste faz o mesmo para que a simulação de rede do Lighthouse
// (Lantern) modele o transfer size real de produção, não o tamanho sem
// compressão.
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|manifest))/;

/** Servidor estático mínimo: mapeia `/portfolio/...` -> `out/...`, com gzip. */
function startServer() {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURI((req.url || "/").split("?")[0]);
      if (urlPath === BASE_PATH) urlPath = `${BASE_PATH}/`;
      if (urlPath.startsWith(`${BASE_PATH}/`)) urlPath = urlPath.slice(BASE_PATH.length);
      if (urlPath.endsWith("/")) urlPath += "index.html";

      const filePath = normalize(join(ROOT, urlPath));
      if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        return res.end("forbidden");
      }

      const acceptsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] || "");
      const send = (status, body, type) => {
        const headers = { "content-type": type };
        if (acceptsGzip && COMPRESSIBLE.test(type)) {
          const zipped = gzipSync(body);
          headers["content-encoding"] = "gzip";
          headers["content-length"] = zipped.length;
          res.writeHead(status, headers);
          return res.end(zipped);
        }
        headers["content-length"] = body.length;
        res.writeHead(status, headers);
        res.end(body);
      };

      try {
        const body = await readFile(filePath);
        return send(200, body, MIME[extname(filePath)] || "application/octet-stream");
      } catch {
        try {
          const notFound = await readFile(join(ROOT, "404.html"));
          return send(404, notFound, "text/html; charset=utf-8");
        } catch {
          res.writeHead(404);
          return res.end("not found");
        }
      }
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function renderMarkdown(rows) {
  const head = `| Rota | Form factor | ${CATEGORIES.map(([, l]) => l).join(" | ")} |`;
  const sep = `| --- | --- | ${CATEGORIES.map(() => "---:").join(" | ")} |`;
  const body = rows
    .map((r) => {
      const cells = CATEGORIES.map(([k]) => {
        const v = r.scores[k];
        return v == null ? "n/a" : v < THRESHOLD ? `**${v}** ⚠️` : String(v);
      });
      return `| \`${r.route}\` | ${r.formFactor} | ${cells.join(" | ")} |`;
    })
    .join("\n");
  const note =
    RUNS > 1
      ? `_Mediana de ${RUNS} execuções. Limite: todas as categorias ≥ ${THRESHOLD}._`
      : `_Limite: todas as categorias ≥ ${THRESHOLD}._`;
  return `${head}\n${sep}\n${body}\n\n${note}\n_Gerado por \`scripts/lighthouse.mjs\`._`;
}

async function main() {
  const server = await startServer();
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless=new",
      "--disable-gpu",
      ...(process.env.CI ? ["--no-sandbox", "--disable-dev-shm-usage"] : []),
    ],
  });

  await rm(REPORT_DIR, { recursive: true, force: true });
  await mkdir(REPORT_DIR, { recursive: true });

  const rows = [];
  const failures = [];

  try {
    for (const route of ROUTES) {
      for (const [formFactor, config] of [
        ["mobile", undefined],
        ["desktop", desktopConfig],
      ]) {
        const url = `http://localhost:${PORT}${route.path}`;
        const base = `${route.slug}-${formFactor}`;
        const perRun = [];

        for (let run = 1; run <= RUNS; run++) {
          const result = await lighthouse(
            url,
            { port: chrome.port, output: ["html", "json"], logLevel: "error" },
            config,
          );
          const pcts = {};
          for (const [key] of CATEGORIES) {
            const raw = result.lhr.categories[key]?.score;
            pcts[key] = raw == null ? null : Math.round(raw * 100);
          }
          perRun.push(pcts);

          // Mantém o relatório navegável da execução de performance mediana.
          const isMedianRun =
            (pcts.performance ?? 0) === median(perRun.map((p) => p.performance ?? 0));
          if (run === 1 || isMedianRun) {
            const [html, json] = result.report;
            await writeFile(join(REPORT_DIR, `${base}.report.html`), html);
            await writeFile(join(REPORT_DIR, `${base}.report.json`), json);
          }
        }

        const scores = {};
        for (const [key] of CATEGORIES) {
          const vals = perRun.map((p) => p[key]).filter((v) => v != null);
          const pct = vals.length ? median(vals) : null;
          scores[key] = pct;
          if (pct == null || pct < THRESHOLD) {
            failures.push(`${base} — ${key}: ${pct ?? "n/a"} (execuções: ${perRun.map((p) => p[key]).join("/")})`);
          }
        }
        rows.push({ route: route.slug, formFactor, scores, runs: perRun });
        console.log(
          `${base.padEnd(24)} ${CATEGORIES.map(([k]) => `${k}=${scores[k] ?? "n/a"}`).join("  ")}` +
            (RUNS > 1 ? `   (mediana de ${RUNS})` : ""),
        );
      }
    }
  } finally {
    await chrome.kill();
    server.close();
  }

  const markdown = renderMarkdown(rows);
  await writeFile(join(REPORT_DIR, "summary.json"), `${JSON.stringify(rows, null, 2)}\n`);
  await writeFile(join(REPORT_DIR, "summary.md"), `${markdown}\n`);
  console.log(`\n${markdown}\n`);

  if (failures.length > 0) {
    console.error(`✖ ${failures.length} categoria(s) abaixo de ${THRESHOLD}:`);
    for (const line of failures) console.error(`  - ${line}`);
    process.exit(1);
  }
  console.log(`✓ Todas as categorias ≥ ${THRESHOLD} nas ${ROUTES.length} rotas (mobile + desktop).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
