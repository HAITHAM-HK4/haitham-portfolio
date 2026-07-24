import { motion } from 'framer-motion';

interface ProjectPopupProps {
  title: string;
  text: string;
  onClose: () => void;
}

export default function ProjectPopup({ title, text, onClose }: ProjectPopupProps) {
  return (
    <motion.div
      className="popup-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="popup-content"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button type="button" className="close-popup" onClick={onClose}>&times;</button>
        <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>{title}</h3>
        <div
          className="popup-scroll"
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
        />
      </motion.div>
    </motion.div>
  );
}
