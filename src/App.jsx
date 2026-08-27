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
        {/* Problem -> Kako radi -> Za koga: what's broken, what happens, who
            it's for. "Šta radimo" moved to its own page (sta-radimo.html). */}
        <Hero />
        <Problem />
        <HowItWorks />
        <Niches />
        <Faq />
        <Contact />
      </main>
      </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
