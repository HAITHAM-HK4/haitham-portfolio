import { LanguageProvider } from '../context/LanguageContext';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import PageLoader from '../components/portfolio/PageLoader';
import Header from '../components/portfolio/Header';
import Home from '../components/portfolio/Home';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Education from '../components/portfolio/Education';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';
import { usePageLoader, useRevealOnScroll, useScrollProgress } from '../hooks/usePortfolioEffects';

function PortfolioContent() {
  const { loading } = usePortfolio();
  const { progress, sticky, activeSection } = useScrollProgress();
  const { hidden, pct } = usePageLoader(loading);

 useRevealOnScroll();

  return (
    <>
      <PageLoader hidden={hidden} pct={pct} />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Header sticky={sticky} activeSection={activeSection} />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <LanguageProvider>
      <PortfolioProvider>
        <PortfolioContent />
      </PortfolioProvider>
    </LanguageProvider>
  );
}
