import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The modulepreload polyfill gets hoisted into a shared chunk as soon as
    // there is more than one entry, which leaves the main bundle starting with
    // a relative `import`. That breaks the single-file artifact build, where
    // there is no sibling chunk to resolve. We don't need the polyfill (it
    // targets older Safari), so drop it and keep each entry self-contained.
    modulePreload: { polyfill: false },
    rollupOptions: {
      // Multi-page: the legal documents are real URLs, not client-side routes,
      // so they stay crawlable and need no SPA fallback on the host.
      input: {
        index: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "politika-privatnosti.html"),
        terms: resolve(__dirname, "uslovi-koriscenja.html"),
        cookies: resolve(__dirname, "politika-kolacica.html"),
        accessibility: resolve(__dirname, "izjava-o-pristupacnosti.html"),
        // "Šta radimo" — the old homepage Services section, now its own page
        // via src/pages/StaRadimo.jsx / src/entries/main-sta-radimo.jsx.
        staRadimo: resolve(__dirname, "sta-radimo.html"),
        // Niche landing pages — one per profession, all sharing
        // src/pages/NicheLanding.jsx via their own src/entries/main-<slug>.jsx.
        // Regenerated from src/data/niches.js by scripts/gen-niche-pages.mjs.
        stomatolozi: resolve(__dirname, "stomatolozi.html"),
        veterinari: resolve(__dirname, "veterinari.html"),
        advokati: resolve(__dirname, "advokati.html"),
        auto_servisi: resolve(__dirname, "auto-servisi.html"),
        saloni: resolve(__dirname, "saloni.html"),
        ecommerce: resolve(__dirname, "ecommerce.html"),
        klimatizacija: resolve(__dirname, "klimatizacija.html"),
        pvc_stolarija: resolve(__dirname, "pvc-stolarija.html"),
        majstori: resolve(__dirname, "majstori.html"),
        // Netlify serves a root 404.html for unknown paths automatically.
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
