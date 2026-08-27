import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Separate from vite.config.js because that one's build.rollupOptions.input
// is a multi-page *client* entry map, incompatible with a single SSR entry.
// No tailwindcss plugin here: entry-server.jsx never imports base.css (only
// main.jsx and the other client entries do), so there's no CSS for it to
// process.
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist-ssr",
    rollupOptions: {
      input: "src/entry-server.jsx",
      output: {
        format: "es",
        entryFileNames: "entry-server.js",
      },
    },
  },
});
