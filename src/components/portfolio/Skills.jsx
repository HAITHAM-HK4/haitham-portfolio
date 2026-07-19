import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Skills() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const skills = data?.skills || [];

  return (
    <section className="skills-section" id="skills">
      <span className="sec-label reveal">{t('skills-label')}</span>
      <h2
        className="heading reveal"
        dangerouslySetInnerHTML={{ __html: t('skills-heading') }}
      />
      <div className="skills-grid reveal">
        {skills.map((s, i) => (
          <div className="skill-card" key={`${s.name_en}-${i}`}>
            <div className="skill-card-title">
              <i
                className="fa-solid fa-microchip"
                style={{
                  fontSize: '2rem',
                  color: '#a855f7',
                  marginBottom: '.8rem',
                  display: 'block',
                }}
              />
              {s[`name_${lang}`] || ''}
            </div>
            <div className="skill-card-desc">{s[`desc_${lang}`] || ''}</div>
            <div className="skill-tags">
              {(s.tags || '')
                .split(',')
                .filter((tag) => tag.trim())
                .map((tag) => (
                  <span className="skill-tag" key={tag.trim()}>{tag.trim()}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
