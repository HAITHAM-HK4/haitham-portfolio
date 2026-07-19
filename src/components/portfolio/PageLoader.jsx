export default function PageLoader({ hidden, pct }) {
  return (
    <div id="page-loader" className={hidden ? 'hide' : ''}>
      <div className="loader-grid" />
      <div className="loader-corner tl" />
      <div className="loader-corner tr" />
      <div className="loader-corner bl" />
      <div className="loader-corner br" />
      <div className="loader-avatar-wrap">
        <div className="loader-avatar-ring" />
        <div className="loader-avatar-ring" />
        <div className="loader-avatar-ring" />
        <div className="loader-arc" />
        <div className="loader-arc-2" />
        <img src="/HK444.png" alt="HK4" className="loader-avatar" />
      </div>
      <div className="loader-name">Haitham Kallab</div>
      <div className="loader-tag">Portfolio · Loading</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
        </div>
        <div className="loader-status">
          <span className="loader-status-text">Initializing...</span>
          <span className="loader-status-pct">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
