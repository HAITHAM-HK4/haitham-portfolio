import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';


export default function Skills() {
  const { t, lang } = useLanguage();
  const { data } = usePortfolio();
  const skills = data?.skills || [];

  const directions = [
    { x: -80, y: 0 },
    { x: 80, y: 0 },
    { x: 0, y: 80 },
  ];

  return (
   <section
  className="skills-section"
  id="skills"
  style={{
    position: 'relative',
    backgroundImage:
      'linear-gradient(rgba(5, 5, 15, 0.82), rgba(5, 5, 15, 0.82)), url(https://res.cloudinary.com/e2kvlfyf/video/upload/so_2,q_100,w_2560/v1784386086/Security_tma2l0.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  }}
>
      

      
  
      <span className="sec-label reveal">{t('skills-label')}</span>
      <h2
        className="heading reveal"
        dangerouslySetInnerHTML={{ __html: t('skills-heading') }}
      />
      <div className="skills-grid">
        {skills.map((s, i) => {
          const dir = directions[i % directions.length];
          return (
            <motion.div
              className="skill-card"
              key={`${s.name_en}-${i}`}
              initial={{ opacity: 0, x: dir.x, y: dir.y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
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
                {s[`name_${lang}` as keyof typeof s] || ''}
              </div>
              <div className="skill-card-desc">{s[`desc_${lang}` as keyof typeof s] || ''}</div>
              <div className="skill-tags">
                {(s.tags || '')
                  .split(',')
                  .filter((tag) => tag.trim())
                  .map((tag) => (
                    <span className="skill-tag" key={tag.trim()}>{tag.trim()}</span>
                  ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
