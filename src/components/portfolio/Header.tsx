import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { NAV_SECTIONS } from '../../data/translations';
import { motion, AnimatePresence } from 'framer-motion';


interface HeaderProps {
  sticky: boolean;
  activeSection: string;
}

export default function Header({ sticky, activeSection }: HeaderProps) {
  const { t, toggleLang, isAr } = useLanguage();
  const { isPopupOpen } = usePortfolio();
  const [navVisible, setNavVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setNavVisible(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNavVisible(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <>
<motion.header
  className="header"
  initial={{ x: '-50%' }}
  animate={{
    x: '-50%',
    scaleX: navVisible && !isPopupOpen ? 1 : 0,
    opacity: navVisible && !isPopupOpen ? 1 : 0,
  }}
  transition={{
    duration: navVisible && !isPopupOpen ? 1.5 : 1.0,
    ease: 'easeInOut',
  }}
  style={{ transformOrigin: 'center' }}
>

        <div className="logo">
       <img src="/assets/logo.png" alt="HK4" style={{ width: '45px', height: 'auto', display: 'block' }} />
        </div>
        <div className="nav-sep" />
        <nav className="navbar">
          {NAV_SECTIONS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
            >
              {t(key)}
            </a>
          ))}
          <button type="button" className="lang-switcher" onClick={toggleLang}>
            <i className="fa-solid fa-globe" />&nbsp;{isAr ? 'EN' : 'AR'}
          </button>
        </nav>
        <button type="button" className="lang-switcher mobile-lang-switcher" onClick={toggleLang}>
          <i className="fa-solid fa-globe" />&nbsp;{isAr ? 'EN' : 'AR'}
        </button>
        <button
          type="button"
          className={`hamburger-btn ${mobileOpen ? 'open' : ''}`}
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span /><span /><span />
        </button>
      </motion.header>

      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={(e) => e.target === e.currentTarget && closeMobileNav()}
        role="presentation"
      >
        <button
          type="button"
          className="mobile-nav-close"
          aria-label="Close menu"
          onClick={closeMobileNav}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="mobile-nav-content">
          <nav className="mobile-nav-links">
            {NAV_SECTIONS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                onClick={closeMobileNav}
              >
                {t(key)}
              </a>
            ))}
          </nav>
          <div className="mobile-nav-footer">
            <button
              type="button"
              className="lang-switcher"
              onClick={() => {
                toggleLang();
                closeMobileNav();
              }}
            >
              <i className="fa-solid fa-globe" />&nbsp;{isAr ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
