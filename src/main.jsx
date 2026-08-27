import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./base.css";
import App from "./App";

/* Left as "auto", the browser restores whatever scroll position the tab had
   before a reload — on a page this tall that reliably lands the visitor
   somewhere past the hero instead of at the top. */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App />
  </StrictMode>,
);
