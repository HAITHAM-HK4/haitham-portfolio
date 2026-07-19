import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectPopup from './ProjectPopup';
import {motion} from "framer-motion";

export default function Projects() {
  const { t, lang, isAr } = useLanguage();
  const { data } = usePortfolio();
  const projects = data?.projects || [];
  const [popup, setPopup] = useState(null);

  const visitText = isAr ? 'زيارة الموقع' : 'Visit Site';
  const detailText = isAr ? 'تفاصيل' : 'Details';

  return (
    <>
      <section className="portfolio" id="portfolio">
        <span className="sec-label reveal">Selected Works</span>
        <h2
          className="heading reveal"
          dangerouslySetInnerHTML={{ __html: t('projects-heading') }}
        />
        <div className="bento-grid reveal">
          {projects.map((p, i) => (
            <div className="bento-card reveal" key={`${p.name_en}-${i}`}>
              <div className="bento-img-area">
                <img
                  src={p.img || 'https://placehold.co/400x250/0b0025/a855f7?text=Project'}
                  alt={p[`name_${lang}`] || 'Project'}
                />
              </div>
              <div className="bento-body">
                <div className="bento-name">{p[`name_${lang}`] || ''}</div>
                <div className="bento-tags">
                  {(p.tags || '')
                    .split(',')
                    .filter((tag) => tag.trim())
                    .map((tag) => (
                      <span className="bento-tag" key={tag.trim()}>{tag.trim()}</span>
                    ))}
                </div>
                <div className="bento-desc">{p[`short_${lang}`] || ''}</div>
                <div className="bento-actions">
                  <a href={p.link || '#'} target="_blank" rel="noreferrer" className="bento-btn-visit">
                    <i className="fa-solid fa-link" /> {visitText}
                  </a>
                  <button
                    type="button"
                    className="bento-btn-desc"
                    onClick={() =>
                      setPopup({
                        title: p[`name_${lang}`] || '',
                        text: p[`full_${lang}`] || '',
                      })
                    }
                  >
                    <i className="fa-solid fa-circle-info" /> {detailText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {popup && <ProjectPopup {...popup} onClose={() => setPopup(null)} />}
    </>
  );
}
