import LanguageProvider from "./i18n";
import SmoothScroll from "./lib/SmoothScroll";
import useReveal from "./lib/useReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Niches from "./components/Niches";
import Faq from "./components/Faq";
import Contact from "./components/Contact";

export default function App() {
  useReveal();

  return (
    <LanguageProvider>
      <SmoothScroll>
      <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        {/* Kako radi -> Za koga -> Problem: what happens, who it's for, what's
            broken. "Šta radimo" moved to its own page (sta-radimo.html). */}
        <Hero />
        <HowItWorks />
        <Niches />
        <Problem />
        <Faq />
        <Contact />
      </main>
      </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
