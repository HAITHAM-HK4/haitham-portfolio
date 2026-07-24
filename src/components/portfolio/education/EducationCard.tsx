import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import type { EducationStage } from '../../../types/education';

interface EducationCardProps {
  stage: EducationStage;
  index: number;
  lang: 'en' | 'ar';
  isLast: boolean;
  reduced: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 90, rotateX: -18, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 * i, ease: 'easeOut' },
  }),
};

export default function EducationCard({ stage, index, lang, reduced }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse position within the card, -0.5 to 0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed for buttery tilt
  const smoothMx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.5 });
  const smoothMy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.5 });

  const rotateX = useTransform(smoothMy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMx, [-0.5, 0.5], [-12, 12]);

  // Parallax offsets for inner layers (number sits "further back")
  const numberX = useTransform(smoothMx, [-0.5, 0.5], [-18, 18]);
  const numberY = useTransform(smoothMy, [-0.5, 0.5], [-14, 14]);
  const contentX = useTransform(smoothMx, [-0.5, 0.5], [-6, 6]);
  const contentY = useTransform(smoothMy, [-0.5, 0.5], [-4, 4]);
  const glowX = useTransform(smoothMx, [-0.5, 0.5], [-40, 40]);
  const glowY = useTransform(smoothMy, [-0.5, 0.5], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const degree = lang === 'ar' ? stage.degree_ar : stage.degree_en;
  const institution = lang === 'ar' ? stage.institution_ar : stage.institution_en;
  const location = lang === 'ar' ? stage.location_ar : stage.location_en;
  const desc = lang === 'ar' ? stage.desc_ar : stage.desc_en;
  const highlights = lang === 'ar' ? stage.highlights_ar : stage.highlights_en;
  const order = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={reduced ? undefined : cardVariants}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: 'rgba(8, 14, 20, 0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow:
            '0 0 0 1px rgba(45,212,191,0.05), 0 25px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
        className="group relative isolate overflow-hidden rounded-[28px] border border-teal/20 transition-[box-shadow,border-color] duration-300"
      >
        {/* Cursor-following radial glow, sits in its own z-layer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(320px circle at 50% 50%, rgba(45,212,191,0.16), transparent 70%)',
            x: glowX,
            y: glowY,
            translateZ: 30,
          }}
        />

        {/* Neon edge on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              '0 0 0 1px rgba(45,212,191,0.45), 0 0 60px rgba(45,212,191,0.2), inset 0 0 60px rgba(45,212,191,0.06)',
          }}
        />

        {/* Giant ghost order number — parallax layer, floats deepest */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-6 select-none font-display font-black leading-none text-teal/[0.07] transition-colors duration-500 group-hover:text-teal/[0.13]"
          style={{
            fontSize: 'clamp(7rem, 18vw, 13rem)',
            insetInlineEnd: '-0.5rem',
            x: reduced ? 0 : numberX,
            y: reduced ? 0 : numberY,
            translateZ: -40,
          }}
        >
          {order}
        </motion.span>

        {/* Content layer — floats closest to viewer */}
        <motion.div
          variants={reduced ? undefined : contentVariants}
          style={{
            x: reduced ? 0 : contentX,
            y: reduced ? 0 : contentY,
            translateZ: 50,
          }}
          className="relative z-10 flex flex-col gap-6 p-7 sm:p-10 md:p-12"
        >
          {/* Top row: period + order marker */}
          <motion.div variants={reduced ? undefined : itemUp} className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_2px_rgba(45,212,191,0.7)]" />
              {stage.period}
            </span>
            <span className="font-mono text-xs font-medium tracking-[0.3em] text-teal/40">
              {order}
            </span>
          </motion.div>

          {/* Degree */}
          <motion.h3
            variants={reduced ? undefined : itemUp}
            className="font-display text-3xl font-extrabold leading-[1.1] text-milk sm:text-4xl md:text-[2.75rem]"
          >
            {degree}
          </motion.h3>

          {/* Institution row */}
          <motion.div
            variants={reduced ? undefined : itemUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-s-2 border-teal/50 ps-4"
          >
            <span className="text-base font-semibold text-milk/90 sm:text-lg">{institution}</span>
            {location && (
              <span className="inline-flex items-center gap-1.5 text-sm text-milk/50">
                <i className="fa-solid fa-location-dot text-teal/70" aria-hidden="true" />
                {location}
              </span>
            )}
          </motion.div>

          {/* Description */}
          {desc && (
            <motion.p
              variants={reduced ? undefined : itemUp}
              className="max-w-2xl text-base leading-relaxed text-milk/65 sm:text-lg"
            >
              {desc}
            </motion.p>
          )}

          {/* Highlights */}
          {highlights?.length ? (
            <div className="flex flex-wrap gap-2.5 pt-2">
              {highlights.map((item, i) => (
                <motion.span
                  key={`${stage.id}-highlight-${i}`}
                  custom={i}
                  variants={reduced ? undefined : highlightVariants}
                  className="inline-flex items-center gap-2 rounded-lg border border-copper/30 bg-copper/[0.08] px-3.5 py-2 text-sm font-medium text-copper transition-colors duration-300 hover:bg-copper/[0.15]"
                >
                  <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
                  {item}
                </motion.span>
              ))}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
