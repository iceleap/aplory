import SmoothScroll from "./lib/SmoothScroll";
import useReveal from "./lib/useReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Services from "./components/Services";
import Flow from "./components/Flow";
import Results from "./components/Results";
import Faq from "./components/Faq";
import Contact from "./components/Contact";

export default function App() {
  useReveal();

  return (
    <SmoothScroll>
      <Header />
      <main>
        {/* Problem -> Rešenje -> Rezultat: what's broken, what we do, what changes. */}
        <Hero />
        <Problem />
        <Services />
        <Flow />
        <Results />
        <Faq />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
