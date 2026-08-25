import LanguageProvider from "./i18n";
import SmoothScroll from "./lib/SmoothScroll";
import useReveal from "./lib/useReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
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
        {/* Problem -> Kako radi -> Šta radimo: what's broken, what happens, what we do. */}
        <Hero />
        <Problem />
        <HowItWorks />
        <Services />
        <Faq />
        <Contact />
      </main>
      </div>
      </SmoothScroll>
    </LanguageProvider>
  );
}
