// Bakes each page's React output into its built dist/*.html, so AI and
// search crawlers that don't execute JavaScript (GPTBot, PerplexityBot,
// ClaudeBot) see real content instead of an empty <div id="root">. Runs
// after both `vite build` (client, produces dist/) and
// `vite build --config vite.ssr.config.js` (server, produces
// dist-ssr/entry-server.js). The client entries hydrate this markup rather
// than mounting fresh, so there's no flash of re-rendered content.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render, pageNames } from "../dist-ssr/entry-server.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const fileFor = (page) => resolve(ROOT, "dist", page === "index" ? "index.html" : `${page}.html`);

for (const page of pageNames) {
  const file = fileFor(page);
  const shell = readFileSync(file, "utf8");
  const appHtml = render(page);

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error(`prerender: ${file} has no empty <div id="root"></div> to fill`);
  }

  writeFileSync(file, shell.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`));
  console.log(`prerendered ${page}`);
}
