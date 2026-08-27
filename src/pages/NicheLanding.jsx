import useReveal from "../lib/useReveal";
import SmoothScroll from "../lib/SmoothScroll";
import NicheHeader from "../components/niche/NicheHeader";
import NicheHero from "../components/niche/NicheHero";
import NichePain from "../components/niche/NichePain";
import NicheHow from "../components/niche/NicheHow";
import Contact from "../components/Contact";

/**
 * Shared template behind every niche landing page (see /public/niche and
 * src/data/niches.js). Each niche gets its own Vite entry — a tiny
 * `main-<slug>.jsx` that imports this with one `niche` object — rather than a
 * client-side router, matching how the legal pages are separate real URLs
 * (see vite.config.js's comment on why: crawlable, no SPA fallback needed).
 *
 * Deliberately outside <LanguageProvider>: that provider's job is overwriting
 * `document.title` and the meta description with the site-wide sr.meta values
 * on mount, which would clobber the per-niche <title>/<meta> already written
 * into this page's own HTML head. useCopy() still resolves to the same sr.js
 * tree without it — LanguageContext's default value *is* sr.
 */
export default function NicheLanding({ niche }) {
  useReveal();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-paper text-ink">
        <NicheHeader />
        <main>
          <NicheHero niche={niche} />
          <NichePain niche={niche} />
          <NicheHow niche={niche} />
          <Contact initialIndustry={niche.industryValue} />
        </main>
      </div>
    </SmoothScroll>
  );
}
