import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  poster?: string;
}

export default function VideoBackground({ videoUrl, poster = '/profile-hero.jpg' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
    const handleVisibilityChange = () => {
      const video = videoRef.current?.querySelector('video');
      if (video) {
        if (document.hidden) {
          video.pause();
        } else {
          video.play();
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
