import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import StaRadimo from "./pages/StaRadimo";
import NicheLanding from "./pages/NicheLanding";
import niches from "./data/niches";

/**
 * One entry per built HTML page, keyed the same as its file's basename
 * (index.html -> "index", stomatolozi.html -> "stomatolozi"). Built to
 * dist-ssr/entry-server.js by vite.ssr.config.js, then walked by
 * scripts/prerender.mjs to bake each page's markup into its dist/*.html
 * before the client script hydrates it.
 */
const pages = {
  index: () => <App />,
  "sta-radimo": () => <StaRadimo />,
};
for (const niche of niches) {
  pages[niche.slug] = () => <NicheLanding niche={niche} />;
}

export const pageNames = Object.keys(pages);

export function render(page) {
  const Page = pages[page];
  if (!Page) throw new Error(`entry-server: unknown page "${page}"`);
  return renderToString(<StrictMode>{Page()}</StrictMode>);
}
