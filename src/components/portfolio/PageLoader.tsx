interface PageLoaderProps {
  hidden: boolean;
  pct: number;
}

export default function PageLoader({ hidden, pct }: PageLoaderProps) {
  return (
    <div id="page-loader" className={hidden ? 'hide' : ''}>
      <video
        className="loader-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://res.cloudinary.com/e2kvlfyf/video/upload/v1784386047/Chat_u3uwfo.webm"
          type="video/webm"
        />
      </video>
      <div className="loader-video-overlay" />
      <div className="loader-content">
        <div className="loader-avatar-container">
          <div className="loader-spinner" />
          <img src="/assets/loader-avatar.png" alt="HK4" className="loader-avatar" />
        </div>
        <div className="loader-name">Haitham Kallab</div>
        <div className="loader-tag">Portfolio · Loading</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-track">
            <div className="loader-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="loader-status">
            <span className="loader-status-pct">{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
