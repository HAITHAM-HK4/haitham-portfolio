import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface CVPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const containerVariants = {
  hidden: { 
    scale: 0.5, 
    opacity: 0, 
    rotateX: 45,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    rotateX: -45,
    transition: { duration: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      type: 'spring' as const,
      stiffness: 150,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.08,
    y: -8,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  },
};

export default function CVPopup({ isOpen, onClose }: CVPopupProps) {
  const { isAr } = useLanguage();
  
  const titleText = isAr ? 'اختر نسخة السيرة الذاتية' : 'Choose CV Version';
  const arabicText = isAr ? 'النسخة العربية' : 'Arabic Version';
  const englishText = isAr ? 'النسخة الإنجليزية' : 'English Version';
  const arabicFlag = '🇸🇾';
  const englishFlag = '🇬🇧';

  const handleViewCV = (lang: 'ar' | 'en') => {
    const cvPath = lang === 'ar' ? '/assets/CV Haitham Arabic1.pdf' : '/assets/CV Haitham1.pdf';
    window.open(cvPath, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-popup-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="presentation"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <motion.div
            className="cv-popup-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderRadius: '32px',
              padding: '60px 50px',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 50px 120px rgba(0, 0, 0, 0.8), 0 0 80px rgba(233, 69, 96, 0.3)',
              border: '3px solid rgba(233, 69, 96, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated background elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.15, rotate: 180, background: 'rgba(233, 69, 96, 0.3)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(233, 69, 96, 0.15)',
                border: '2px solid rgba(233, 69, 96, 0.5)',
                color: '#e94560',
                fontSize: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              &times;
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
            >
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(233, 69, 96, 0.5)',
                    '0 0 40px rgba(233, 69, 96, 0.8)',
                    '0 0 20px rgba(233, 69, 96, 0.5)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  color: '#e94560',
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '10px',
                  letterSpacing: '1px',
                }}
              >
                {titleText}
              </motion.div>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #e94560, transparent)',
                margin: '0 auto',
                borderRadius: '2px',
              }} />
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', zIndex: 1 }}>
              <motion.div
                variants={cardVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewCV('ar')}
                style={{
                  padding: '25px 30px',
                  background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, rgba(233, 69, 96, 0.1) 100%)',
                  border: '2px solid rgba(233, 69, 96, 0.4)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '3rem' }}>{arabicFlag}</span>
                  <div>
                    <div style={{
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '5px',
                    }}>
                      {arabicText}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.9rem',
                    }}>
                      {isAr ? 'اللغة العربية' : 'Arabic Language'}
                    </div>
                  </div>
                </div>
                <motion.i
                  className="fa-solid fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }}
                  style={{
                    color: '#e94560',
                    fontSize: '1.5rem',
                  }}
                />
              </motion.div>

              <motion.div
                variants={cardVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewCV('en')}
                style={{
                  padding: '25px 30px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '3rem' }}>{englishFlag}</span>
                  <div>
                    <div style={{
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '5px',
                    }}>
                      {englishText}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.9rem',
                    }}>
                      {isAr ? 'اللغة الإنجليزية' : 'English Language'}
                    </div>
                  </div>
                </div>
                <motion.i
                  className="fa-solid fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }}
                  style={{
                    color: '#3b82f6',
                    fontSize: '1.5rem',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface CVPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const containerVariants = {
  hidden: { 
    scale: 0.5, 
    opacity: 0, 
    rotateX: 45,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    rotateX: -45,
    transition: { duration: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      type: 'spring' as const,
      stiffness: 150,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.08,
    y: -8,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  },
};

export default function CVPopup({ isOpen, onClose }: CVPopupProps) {
  const { isAr } = useLanguage();
  
  const titleText = isAr ? 'اختر نسخة السيرة الذاتية' : 'Choose CV Version';
  const arabicText = isAr ? 'النسخة العربية' : 'Arabic Version';
  const englishText = isAr ? 'النسخة الإنجليزية' : 'English Version';
  const arabicFlag = '🇸🇾';
  const englishFlag = '🇬🇧';

  const handleViewCV = (lang: 'ar' | 'en') => {
    const cvPath = lang === 'ar' ? '/assets/CV Haitham Arabic1.pdf' : '/assets/CV Haitham1.pdf';
    window.open(cvPath, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cv-popup-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="presentation"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <motion.div
            className="cv-popup-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderRadius: '32px',
              padding: '60px 50px',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 50px 120px rgba(0, 0, 0, 0.8), 0 0 80px rgba(233, 69, 96, 0.3)',
              border: '3px solid rgba(233, 69, 96, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated background elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.15, rotate: 180, background: 'rgba(233, 69, 96, 0.3)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(233, 69, 96, 0.15)',
                border: '2px solid rgba(233, 69, 96, 0.5)',
                color: '#e94560',
                fontSize: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              &times;
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
            >
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(233, 69, 96, 0.5)',
                    '0 0 40px rgba(233, 69, 96, 0.8)',
                    '0 0 20px rgba(233, 69, 96, 0.5)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  color: '#e94560',
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  marginBottom: '10px',
                  letterSpacing: '1px',
                }}
              >
                {titleText}
              </motion.div>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #e94560, transparent)',
                margin: '0 auto',
                borderRadius: '2px',
              }} />
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', zIndex: 1 }}>
              <motion.div
                variants={cardVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewCV('ar')}
                style={{
                  padding: '25px 30px',
                  background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, rgba(233, 69, 96, 0.1) 100%)',
                  border: '2px solid rgba(233, 69, 96, 0.4)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '3rem' }}>{arabicFlag}</span>
                  <div>
                    <div style={{
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '5px',
                    }}>
                      {arabicText}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.9rem',
                    }}>
                      {isAr ? 'اللغة العربية' : 'Arabic Language'}
                    </div>
                  </div>
                </div>
                <motion.i
                  className="fa-solid fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }}
                  style={{
                    color: '#e94560',
                    fontSize: '1.5rem',
                  }}
                />
              </motion.div>

              <motion.div
                variants={cardVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewCV('en')}
                style={{
                  padding: '25px 30px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '3rem' }}>{englishFlag}</span>
                  <div>
                    <div style={{
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '5px',
                    }}>
                      {englishText}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.9rem',
                    }}>
                      {isAr ? 'اللغة الإنجليزية' : 'English Language'}
                    </div>
                  </div>
                </div>
                <motion.i
                  className="fa-solid fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }}
                  style={{
                    color: '#3b82f6',
                    fontSize: '1.5rem',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
