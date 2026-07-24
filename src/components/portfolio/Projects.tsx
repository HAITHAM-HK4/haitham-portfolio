import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectPopup from './ProjectPopup';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import type { Project } from '../../types/portfolio';

interface PopupData {
  title: string;
  text: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

function getCardVariants() {
  return {
    hidden: {
      opacity: 0,
      x: '40vw',
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 85,
        damping: 22,
        mass: 1,
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.5, x: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

const actionVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 12 },
  },
};

interface ProjectCardProps {
  project: Project;
  lang: 'en' | 'ar';
  visitText: string;
  detailText: string;
  onDetails: (project: Project) => void;
}

function ProjectCard({ project, lang, visitText, detailText, onDetails }: ProjectCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateX.set((mouseY / (rect.height / 2)) * -6);
    rotateY.set((mouseX / (rect.width / 2)) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="bento-card"
      variants={getCardVariants()}
      whileHover={{
        scale: 1.03,
        y: -10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(0, 210, 255, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        margin: 0,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bento-img-area" style={{ transform: 'translateZ(30px)' }}>
        <img
          src={project.img || 'https://placehold.co/400x250/0b0025/a855f7?text=Project'}
          alt={project[`name_${lang}` as keyof Project] || 'Project'}
          loading="eager"
        />
      </div>

      <div className="bento-body" style={{ transform: 'translateZ(15px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="bento-name">{project[`name_${lang}` as keyof Project] || ''}</div>

        <div
          className="bento-tags"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            margin: '12px 0',
          }}
        >
          {(project.tags || '')
            .split(',')
            .filter((tag) => tag.trim())
            .map((tag) => (
              <motion.span variants={tagVariants} className="bento-tag" key={tag.trim()}>
                {tag.trim()}
              </motion.span>
            ))}
        </div>

        <div className="bento-desc">{project[`short_${lang}` as keyof Project] || ''}</div>

        <motion.div
          className="bento-actions"
          variants={actionVariants}
          style={{
            marginTop: 'auto',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <a
            href={project.link || '#'}
            target="_blank"
            rel="noreferrer"
            className="bento-btn-visit"
            style={{ flex: 1, textAlign: 'center' }}
          >
            <i className="fa-solid fa-link" /> {visitText}
          </a>
          <button
            type="button"
            className="bento-btn-desc"
            onClick={() => onDetails(project)}
            style={{ flex: 1, textAlign: 'center' }}
          >
            <i className="fa-solid fa-circle-info" /> {detailText}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t, lang, isAr } = useLanguage();
  const { data } = usePortfolio();
  const projects = data?.projects || [];
  const [popup, setPopup] = useState<PopupData | null>(null);

  const visitText = isAr ? 'زيارة الموقع' : 'Visit Site';
  const detailText = isAr ? 'تفاصيل' : 'Details';

  const handleDetails = (project: Project) => {
    setPopup({
      title: project[`name_${lang}` as keyof Project] || '',
      text: project[`full_${lang}` as keyof Project] || '',
    });
  };

  return (
    <>
      <section
        className="portfolio"
        id="portfolio"
        style={{
          overflowX: 'hidden',
          position: 'relative',
          backgroundImage:
            'linear-gradient(rgba(5, 5, 15, 0.82), rgba(5, 5, 15, 0.82)), url(https://res.cloudinary.com/e2kvlfyf/video/upload/so_3/v1784386071/Key_ywmc6o.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <span className="sec-label reveal">Selected Works</span>
        <h2 className="heading reveal" dangerouslySetInnerHTML={{ __html: t('projects-heading') }} />
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={`${p.name_en}-${i}`}
              project={p}
              lang={lang}
              visitText={visitText}
              detailText={detailText}
              onDetails={handleDetails}
            />
          ))}
        </motion.div>
      </section>
      <AnimatePresence>{popup && <ProjectPopup {...popup} onClose={() => setPopup(null)} />}</AnimatePresence>
    </>
  );
}
