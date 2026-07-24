import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import VideoBackground from './VideoBackground';
const profileHero = '/assets/haitham3.jpg';

export default function About() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const about = data?.about || {};

  const desc =
    about[`desc_${lang}` as keyof typeof about] ||
    'I am Haitham Kallab, a Front-End Developer and Web Designer based in Lattakia, Syrian Arab Republic. I build clean, responsive interfaces and well-structured code using HTML, CSS, JS, TypeScript, React.js, and Next.js.';

  return (
    <section className="about" id="about">
      <VideoBackground
        videoUrl="https://res.cloudinary.com/e2kvlfyf/video/upload/v1784386071/Key_ywmc6o.webm"
   poster="/assets/haitham3.jpg"
      />
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
          <a href="/cv.pdf" download="Haitham_Kallab_CV.pdf" className="btn btn-primary">
            {t('about-btn-download')}
          </a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
            {t('about-btn-view')}
          </a>
        </div>
      </div>
      <div className="about-photo slide-right">
      <img src="/assets/haitham3.jpg" alt="Profile" className="about-photo-img" />
      </div>
    </section>
  );
}
