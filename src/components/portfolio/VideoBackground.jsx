import { useEffect, useRef, useState } from 'react';

export default function VideoBackground({ videoUrl, poster = '/haitham.jpg' }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Lazy load: only load when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

  useEffect(() => {
    // Page Visibility API: pause video when tab is hidden
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div className="video-background" ref={videoRef}>
      {isVisible && (
        <video
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onLoadedData={handleLoadedData}
        >
          <source src={videoUrl} type="video/webm" />
        </video>
      )}
      {!isLoaded && (
        <div className="video-fallback">
          <img src={poster} alt="Fallback" className="fallback-image" />
        </div>
      )}
      <div className="video-overlay" />
      <div className="video-vignette" />
    </div>
  );
}
