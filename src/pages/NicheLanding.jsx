import useReveal from "../lib/useReveal";
import SmoothScroll from "../lib/SmoothScroll";
import NicheHeader from "../components/niche/NicheHeader";
import NicheHero from "../components/niche/NicheHero";
import NicheCapabilities from "../components/niche/NicheCapabilities";
import Problem from "../components/Problem";
import HowItWorks from "../components/HowItWorks";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

/**
 * Shared template behind every niche landing page (see /public/niche and
 * src/data/niches.js). Each niche gets its own Vite entry — a tiny
 * `main-<slug>.jsx` that imports this with one `niche` object — rather than a
 * client-side router, matching how the legal pages are separate real URLs
 * (see vite.config.js's comment on why: crawlable, no SPA fallback needed).
 *
 * The page is not the home page with a photo swapped in. Problem, HowItWorks
 * and Faq are the home page's own components driven by this niche's data
 * (which is why NichePain.jsx and NicheHow.jsx — near-copies that had already
 * drifted from their originals — are gone), and NicheCapabilities exists only
 * here: what APLORY does for this profession specifically, rather than the
 * generic service list. That section and the FAQ render only when the niche
 * defines their data, so a niche whose copy is not written yet degrades to a
 * shorter page rather than a broken one.
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
          <Problem title={niche.painTitle} cards={niche.pains} />
          <HowItWorks title={niche.howTitle} demo={niche.demo} steps={niche.steps} />
          <NicheCapabilities capabilities={niche.capabilities} />
          {niche.faq && <Faq title={niche.faqTitle} items={niche.faq} />}
          <Contact initialIndustry={niche.industryValue} />
        </main>
      </div>
    </SmoothScroll>
  );
}
