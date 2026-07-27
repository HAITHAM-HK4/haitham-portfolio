import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';

const profileHero = '/assets/haitham3.jpg';

export default function About() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const [isChoicePopupOpen, setIsChoicePopupOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<null | 'ar' | 'en'>(null);
  const [isClosing, setIsClosing] = useState(false);
  const about = data?.about || {};

  const desc =
    about[`desc_${lang}` as keyof typeof about] ||
    'I am Haitham Kallab, a Front-End Developer and Web Designer based in Lattakia, Syrian Arab Republic. I build clean, responsive interfaces and well-structured code using HTML, CSS, JS, TypeScript, React.js, and Next.js.';

const cvFileAr = encodeURI('/assets/CV Haitham Arabic1.pdf');
const cvFileEn = encodeURI('/assets/CV Haitham1.pdf');
  const cvFile = selectedCV === 'ar' ? cvFileAr : cvFileEn;

  const isPreviewOpen = selectedCV !== null;

  // إغلاق ناعم لأي بوب أب مفتوح
  const closeAll = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsChoicePopupOpen(false);
      setSelectedCV(null);
      setIsClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!isChoicePopupOpen && !isPreviewOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isChoicePopupOpen, isPreviewOpen]);

  return (
    <section
      className="about"
      id="about"
      style={{
        position: 'relative',
        backgroundImage:
          'linear-gradient(rgba(5, 5, 15, 0.82), rgba(5, 5, 15, 0.82)), url(https://res.cloudinary.com/e2kvlfyf/video/upload/so_2,q_100,w_2560/v1784386071/Key_ywmc6o.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="about-card slide-left">
        <h2
          className="heading"
          style={{ textAlign: 'left', marginBottom: '2rem' }}
          dangerouslySetInnerHTML={{ __html: t('about-heading') }}
        />
        <p className="about-card-desc">{desc}</p>
        <div className="about-info-grid">
          <div className="about-info-item">
            <span className="about-info-label">{t('lbl-name-title')}</span>
            <span className="about-info-value">{about[`name_${lang}` as keyof typeof about] || 'Haitham Kallab'}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">{t('lbl-title-title')}</span>
            <span className="about-info-value">{about[`title_${lang}` as keyof typeof about] || 'Full-Stack Dev'}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">{t('lbl-email-title')}</span>
            <span className="about-info-value">{about.email || 'hk4@example.com'}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">{t('lbl-loc-title')}</span>
            <span className="about-info-value">{about[`loc_${lang}` as keyof typeof about] || 'Latakia, Syria'}</span>
          </div>
        </div>
        <div className="about-card-btns">
          <a href={cvFile} download="Haitham_Kallab_CV.pdf" className="btn btn-primary">
            {t('about-btn-download')}
          </a>
          <button
            type="button"
            onClick={() => setIsChoicePopupOpen(true)}
            className="btn btn-outline"
            style={{ cursor: 'pointer' }}
          >
            {t('about-btn-view')}
          </button>
        </div>
      </div>
      <div className="about-photo slide-right">
        <img src="/assets/haitham3.jpg" alt="Profile" className="about-photo-img" />
      </div>

      {/* Popup اختيار اللغة */}
      {isChoicePopupOpen && (
        <div
          className={`cv-modal-overlay ${isClosing ? 'is-closing' : ''}`}
          onClick={closeAll}
        >
          <div
            className={`cv-choice-modal ${isClosing ? 'is-closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cv-modal-close" onClick={closeAll} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <div className="cv-choice-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="cv-choice-title">اختر نسخة السيرة الذاتية</h3>
            <p className="cv-choice-subtitle">Choose your preferred CV language</p>

            <div className="cv-choice-options">
              <button
                onClick={() => {
                  setSelectedCV('ar');
                  setIsChoicePopupOpen(false);
                }}
                className="cv-choice-option cv-choice-option-arabic"
              >
                <span className="cv-choice-option-flag">🇸🇾</span>
                <span className="cv-choice-option-text">
                  <span className="cv-choice-option-main">النسخة العربية</span>
                  <span className="cv-choice-option-sub">Arabic Version</span>
                </span>
                <span className="cv-choice-option-arrow">←</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCV('en');
                  setIsChoicePopupOpen(false);
                }}
                className="cv-choice-option"
              >
                <span className="cv-choice-option-flag">🇬🇧</span>
                <span className="cv-choice-option-text">
                  <span className="cv-choice-option-main">English Version</span>
                  <span className="cv-choice-option-sub">النسخة الإنكليزية</span>
                </span>
                <span className="cv-choice-option-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup عرض الـ PDF */}
      {isPreviewOpen && (
        <div
          className={`cv-modal-overlay ${isClosing ? 'is-closing' : ''}`}
          onClick={closeAll}
        >
          <div
            className={`cv-preview-modal ${isClosing ? 'is-closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cv-preview-header">
              <div className="cv-preview-header-info">
                <span className="cv-preview-badge">{selectedCV === 'ar' ? 'AR' : 'EN'}</span>
                <span className="cv-preview-filename">
                  {selectedCV === 'ar' ? 'السيرة الذاتية - عربي' : 'CV - English'}
                </span>
              </div>
              <div className="cv-preview-header-actions">
                <a
                  href={cvFile}
                  download="Haitham_Kallab_CV.pdf"
                  className="cv-preview-action-btn"
                  aria-label="Download"
                  title="Download"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={closeAll}
                  className="cv-preview-action-btn"
                  aria-label="Close"
                  title="Close"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="cv-preview-body">
              <iframe src={cvFile} title="CV Preview" className="cv-preview-iframe" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
