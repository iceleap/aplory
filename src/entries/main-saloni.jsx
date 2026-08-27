import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "../base.css";
import NicheLanding from "../pages/NicheLanding";
import { nicheBySlug } from "../data/niches";

/* Same rationale as src/main.jsx: without this, a reload restores whatever
   scroll position the tab had before, which on a page this tall lands the
   visitor past the hero instead of at the top. */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <NicheLanding niche={nicheBySlug["saloni"]} />
  </StrictMode>,
);
