import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Multi-page: the legal documents are real URLs, not client-side routes,
      // so they stay crawlable and need no SPA fallback on the host.
      input: {
        index: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "politika-privatnosti.html"),
        terms: resolve(__dirname, "uslovi-koriscenja.html"),
      },
    },
  },
});
