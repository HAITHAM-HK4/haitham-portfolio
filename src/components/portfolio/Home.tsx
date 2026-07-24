import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { TYPEWRITER_TEXTS } from '../../data/translations';
import { useTypewriter } from '../../hooks/usePortfolioEffects';
import VideoBackground from './VideoBackground';
const profileHero = '/assets/haitham.jpg';


export default function Home() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const typedText = useTypewriter(TYPEWRITER_TEXTS);

  const desc =
    data?.home?.[`desc_${lang}` as keyof typeof data.home] ||
    'A software developer — I craft responsive websites and mobile applications using HTML, CSS, JavaScript, React Native, and Node.js.';

  return (
    <section className="home" id="home">
      <VideoBackground
        videoUrl="https://res.cloudinary.com/e2kvlfyf/video/upload/v1784386063/Labtop_eytpnl.webm"
   poster={profileHero}
      />
      <div className="home-content reveal">
        <h3><span>{t('home-hello')}</span></h3>
        <h1>Haitham Kallab</h1>
        <h3 className="typerow">
          And I&apos;m a <span className="multiple-text">{typedText}</span>
        </h3>
        <p>{desc}</p>
        <div className="social-media">
          <a href="https://www.facebook.com/share/1CqdQnYYRK/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook-f" />
          </a>
          <a href="https://wa.me/963967728034" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-whatsapp" />
          </a>
          <a href="https://www.instagram.com/haithamkallab?igsh=c2RjYXdvZzhqYWto" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="https://www.linkedin.com/in/haitham-kallab-5aa943402" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin-in" />
          </a>
        </div>
        <a href="#contact" className="btn btn-primary">{t('cv-btn')}</a>
      </div>

      <div className="home-img reveal">
        <div className="hexagon-wrapper breathe-animation">
          <div className="hexagon-frame">
            <svg className="hexagon-svg" viewBox="0 0 170 190" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="hexClip2">
                  <polygon points="100,5 195,52.5 195,177.5 100,225 5,177.5 5,52.5" />
                </clipPath>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#e040fb" />
                </linearGradient>
              </defs>
              <image
            href={profileHero}
                x="0"
                y="0"
                width="200"
                height="270"
                clipPath="url(#hexClip2)"
                preserveAspectRatio="xMidYMid slice"
              />
              <polygon points="100,5 195,52.5 195,177.5 100,225 5,177.5 5,52.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
