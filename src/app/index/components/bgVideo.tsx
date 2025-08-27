'use client';

import { useEffect, useRef, useState } from 'react';

interface BgVideoProps {
  videoId?: string;
  className?: string;
}

export default function BgVideo({ 
  videoId = 'SoXX4D8Bd48', 
  className = '' 
}: BgVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Use your working video URL
  const videoUrl = "https://files.andreasmogensen.dk/%5BFREE%20download%5D%20andreas%20mogensen%20astronaut%20cute%20floating%20around%20in%20space.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setError(null);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      setError(`Video error: ${target.error?.message || 'Unknown error'}`);
      setVideoLoaded(false);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Start playing the video
    const startVideo = async () => {
      try {
        video.src = videoUrl;
        video.muted = true;
        
        video.addEventListener('loadeddata', async () => {
          try {
            await video.play();
          } catch (playErr) {
            setError('Failed to play video');
          }
        }, { once: true });
        
      } catch (err) {
        setError('Failed to setup video');
      }
    };

    startVideo();

    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: -10 }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        title="Background Video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          border: 'none',
          pointerEvents: 'none',
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          zIndex: -10,
        }}
      />
    </div>
  );
}