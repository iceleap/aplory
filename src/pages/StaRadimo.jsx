import useReveal from "../lib/useReveal";
import SmoothScroll from "../lib/SmoothScroll";
import NicheHeader from "../components/niche/NicheHeader";
import Services from "../components/Services";
import Contact from "../components/Contact";

/**
 * Standalone "Šta radimo" page — previously the Services section on the
 * homepage (src/components/Services.jsx), now its own URL so it can be
 * linked to directly instead of scrolled to. Same template pattern as
 * src/pages/NicheLanding.jsx: its own Vite entry (main-sta-radimo.jsx)
 * rather than a client-side route, and NicheHeader instead of the
 * homepage's Header since there is no set of homepage section ids here for
 * a scroll-spy to track.
 */
export default function StaRadimo() {
  useReveal();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-paper text-ink">
        <NicheHeader />
        <main>
          <Services titleAs="h1" />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
