import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { resolveEducationStages } from '../../data/educationStages';
import { useIsMobile, useReducedMotion } from '../../hooks/useReducedMotion';
import EducationCard from './education/EducationCard';
import type { PortfolioData } from '../../types/education';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education() {
  const { lang } = useLanguage();
  const { data } = usePortfolio() as { data?: PortfolioData };
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const stages = resolveEducationStages(data?.edu);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background drifts slower than scroll (deep parallax layer)
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  // Header drifts slightly faster (near layer)
  const headerY = useTransform(scrollYProgress, [0, 1], ['4%', '-10%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      id="education"
      ref={sectionRef}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative min-h-screen overflow-hidden px-[4%] py-28 sm:px-[6%] md:px-[9%] md:py-32"
      style={{ perspective: 1500 }}
    >
      {/* Parallax background layer — moves independently of content on scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-8%]"
        style={{
          y: reduced ? 0 : bgY,
          backgroundColor: '#050a0d',
          backgroundImage:
            'radial-gradient(ellipse 70% 55% at 15% 0%, rgba(45,212,191,0.06) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(45,212,191,0.03) 0%, transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.9) 100%), url(https://res.cloudinary.com/e2kvlfyf/video/upload/so_3/v1784386063/Labtop_eytpnl.jpg)',
          backgroundSize: 'cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center',
          backgroundAttachment: mobile ? 'scroll' : undefined,
        }}
      />

      {/* Fine grid overlay — drifts at its own parallax speed for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-8%] opacity-[0.015]"
        style={{
          y: reduced ? 0 : gridY,
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header — parallax + 3D entrance */}
        <motion.div
          className="mb-16 md:mb-24"
          style={{ y: reduced ? 0 : headerY, transformStyle: 'preserve-3d' }}
        >
          <motion.div
            variants={headerVariants}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-teal/50 sm:text-sm">
                {lang === 'ar' ? 'المسار الأكاديمي' : 'Academic Path'}
              </span>
              <motion.span
                variants={reduced ? undefined : lineVariants}
                className="h-px flex-1 origin-left bg-gradient-to-r from-teal/30 to-transparent"
                style={{ transformOrigin: lang === 'ar' ? 'right' : 'left' }}
              />
            </div>

            <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-milk sm:text-6xl md:text-7xl">
              {lang === 'ar' ? 'التعليم' : 'Education'}
            </h2>
          </motion.div>
        </motion.div>

        {/* Spotlight cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {stages.map((stage, index) => (
            <EducationCard
              key={stage.id}
              stage={stage}
              index={index}
              lang={lang}
              isLast={index === stages.length - 1}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
