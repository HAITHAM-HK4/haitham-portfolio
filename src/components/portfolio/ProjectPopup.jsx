export default function ProjectPopup({ title, text, onClose }) {
  return (
    <div
      className="popup-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div className="popup-content">
        <button type="button" className="close-popup" onClick={onClose}>&times;</button>
        <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>{title}</h3>
        <div
          className="popup-scroll"
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
        />
      </div>
    </div>
  );
}
