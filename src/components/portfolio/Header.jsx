import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { NAV_SECTIONS } from '../../data/translations';

export default function Header({ sticky, activeSection }) {
  const { t, toggleLang, isAr } = useLanguage();
  const [navVisible, setNavVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setNavVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <>
      <header className={`header ${sticky ? 'sticky' : ''} ${navVisible ? 'nav-visible' : ''}`}>
        <a href="#home" className="logo">
          <img src="/HK4.png" alt="HK4" />
        </a>
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
        <button
          type="button"
          className={`hamburger-btn ${mobileOpen ? 'open' : ''}`}
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span /><span /><span />
        </button>
      </header>

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
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-globe" />&nbsp;{isAr ? 'EN' : 'AR'}
          </button>
        </div>
      </div>
    </>
  );
}
