import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Education() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const edu = data?.edu || {};

  const desc =
    edu[`desc_${lang}`] ||
    'Studied Computer Engineering & Technology, gaining a deep understanding of programming principles and software architecture. Contributed to scientific research in data modelling.';

  return (
    <section className="education-section" id="education">
      <span className="sec-label reveal">Academic Background</span>
      <h2
        className="heading reveal"
        dangerouslySetInnerHTML={{ __html: t('edu-heading') }}
      />
      <div className="edu-timeline reveal">
        <div className="edu-card">
          <div className="edu-header-info">
            <h3>Bachelor&apos;s — Computer Engineering &amp; Technology</h3>
            <p>
              <i className="fa-solid fa-building-columns" /> Tishreen University — Latakia, Syria &nbsp;|&nbsp; 2020 – 2025
            </p>
          </div>
          <hr className="edu-divider" />
          <p className="edu-desc">{desc}</p>
        </div>
      </div>
    </section>
  );
}
