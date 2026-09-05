// One-off generator: turns src/data/niches.js into the per-niche HTML shells
// and Vite entry files. Not part of the build — run manually after editing
// niches.js, then delete/ignore this script. Mirrors index.html's <head>
// pattern (see that file's OG/canonical/JSON-LD block) but per niche.
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import niches from "../src/data/niches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const htmlEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

for (const n of niches) {
  const url = `https://aplory.dev/${n.slug}.html`;

  /* FAQPage only when the niche actually has questions — an empty mainEntity
     is an invalid graph, and Google treats FAQ markup that does not match
     visible page text as a violation, so this is written from the same array
     Faq.jsx renders. */
  const faqSchema = n.faq?.length
    ? `
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: n.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }, null, 2).split("\n").join("\n      ")}
    </script>`
    : "";

  const html = `<!doctype html>
<html lang="sr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${htmlEscape(n.metaTitle)}</title>
    <meta name="description" content="${htmlEscape(n.metaDescription)}" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${htmlEscape(n.metaTitle)}" />
    <meta property="og:description" content="${htmlEscape(n.metaDescription)}" />
    <meta property="og:locale" content="sr_RS" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://aplory.dev${n.photo}" />
    <meta property="og:image:alt" content="${htmlEscape(n.photoAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://aplory.dev${n.photo}" />

    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
    <link rel="apple-touch-icon" href="/icon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "APLORY — ${htmlEscape(n.eyebrow)}",
        "description": "${htmlEscape(n.metaDescription)}",
        "provider": {
          "@type": "ProfessionalService",
          "name": "APLORY",
          "email": "office.aplory@gmail.com",
          "telephone": "+381698440885",
          "url": "https://aplory.dev/"
        },
        "areaServed": "RS",
        "availableLanguage": "sr"
      }
    </script>${faqSchema}
    <script id="vtag-ai-js" async src="https://r2.leadsy.ai/tag.js" data-pid="9EwRUwjpc16QLzvi" data-version="062024"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/main-${n.slug}.jsx"></script>
    <script>
      (function () {
        // Largest render-blocking third-party resource on the page (see
        // GEO/SEO audits): the LeadConnector chat widget loads on first real
        // user interaction, or after a short idle fallback so keyboard-only
        // visitors who never scroll or move the mouse still get it.
        var loaded = false;
        var events = ["scroll", "mousemove", "touchstart", "keydown"];
        function loadChatWidget() {
          if (loaded) return;
          loaded = true;
          events.forEach(function (e) {
            window.removeEventListener(e, loadChatWidget);
          });
          clearTimeout(fallback);
          var s = document.createElement("script");
          s.src = "https://widgets.leadconnectorhq.com/loader.js";
          s.setAttribute(
            "data-resources-url",
            "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
          );
          s.setAttribute("data-widget-id", "6a896cfe07754ad08a5225ae");
          document.body.appendChild(s);
        }
        events.forEach(function (e) {
          window.addEventListener(e, loadChatWidget, { passive: true, once: true });
        });
        var fallback = setTimeout(loadChatWidget, 6000);
      })();
    </script>
  </body>
</html>
`;

  const entry = `import { StrictMode } from "react";
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
    <NicheLanding niche={nicheBySlug["${n.slug}"]} />
  </StrictMode>,
);
`;

  writeFileSync(resolve(ROOT, `${n.slug}.html`), html);
  writeFileSync(resolve(ROOT, `src/entries/main-${n.slug}.jsx`), entry);
  console.log(`wrote ${n.slug}.html + src/entries/main-${n.slug}.jsx`);
}

// Print the vite.config.js input block to paste in.
console.log("\n--- vite.config.js input entries ---");
for (const n of niches) {
  console.log(`        ${n.slug.replace(/-/g, "_")}: resolve(__dirname, "${n.slug}.html"),`);
}
