import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

interface ProjectPopupProps {
  title: string;
  text: string;
  image: string;
  link: string;
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
    scale: 0.3, 
    opacity: 0, 
    y: 100,
    rotateX: 45,
    rotateY: -15,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
      duration: 0.8,
    },
  },
  exit: {
    scale: 0.3,
    opacity: 0,
    y: 100,
    rotateX: -45,
    rotateY: 15,
    transition: { duration: 0.4 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateZ: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 12,
      delay: 0.3,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
      delay: 0.5,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 14,
      delay: 0.7,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 8,
      delay: 0.9,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 2,
    boxShadow: '0 15px 40px rgba(59, 130, 246, 0.6)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

const fullscreenVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

export default function ProjectPopup({ title, text, image, link, onClose }: ProjectPopupProps) {
  const { isAr } = useLanguage();
  const visitText = isAr ? 'زيارة الموقع' : 'Visit Site';
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <motion.div
        className="popup-overlay"
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
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '30px',
        }}
      >
        <motion.div
          className="popup-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            maxWidth: '900px',
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e293b 100%)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.7), 0 0 60px rgba(59, 130, 246, 0.3)',
            border: '2px solid rgba(59, 130, 246, 0.5)',
            position: 'relative',
          }}
        >
          <motion.button
            type="button"
            className="close-popup"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ rotate: 180, scale: 1.2, background: 'rgba(239, 68, 68, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.2)',
              border: '2px solid rgba(59, 130, 246, 0.6)',
              color: '#3b82f6',
              fontSize: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
          >
            &times;
          </motion.button>
          
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, rotate: 1 }}
            onClick={() => setIsFullscreen(true)}
            style={{
              width: '100%',
              height: '350px',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.4)',
              border: '3px solid rgba(59, 130, 246, 0.5)',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <motion.img
              src={image || 'https://placehold.co/900x500/1e3a5f/3b82f6?text=Project'}
              alt={title}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '20px',
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                style={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                {isAr ? 'اضغط للتكبير' : 'Click to enlarge'}
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h3
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            style={{
              color: '#3b82f6',
              marginBottom: '1.5rem',
              fontSize: '2.5rem',
              fontWeight: '800',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </motion.h3>
          
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="popup-scroll"
            style={{
              color: '#cbd5e1',
              lineHeight: '2',
              marginBottom: '2.5rem',
              fontSize: '1.15rem',
              padding: '25px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
          />

          {link && link !== '#' && (
            <motion.a
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              href={link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #2563eb 100%)',
                backgroundSize: '200% 200%',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '16px',
                fontWeight: '800',
                fontSize: '1.2rem',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              <motion.i
                className="fa-solid fa-external-link-alt"
                animate={{ x: [0, 8, 0], rotate: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse' as const,
                }}
              />
              {visitText}
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            variants={fullscreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '20px',
            }}
          >
            <motion.button
              onClick={() => setIsFullscreen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.3)',
                border: '3px solid rgba(239, 68, 68, 0.7)',
                color: '#ef4444',
                fontSize: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2001,
              }}
            >
              &times;
            </motion.button>
            <motion.img
              src={image || 'https://placehold.co/900x500/1e3a5f/3b82f6?text=Project'}
              alt={title}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              style={{
                maxWidth: '95vw',
                maxHeight: '95vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .popup-content::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .popup-content {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
