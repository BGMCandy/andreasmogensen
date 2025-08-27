'use client';

import { useEffect, useRef, useState } from 'react';
import UnmuteButton from './unmuteButton';

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
      console.log('✅ Video can play');
      console.log('📏 Video dimensions:', video.videoWidth, 'x', video.videoHeight);
      console.log('🎬 Video element:', video);
      console.log('🎬 Video element styles:', window.getComputedStyle(video));
      setVideoLoaded(true);
      setError(null);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      console.error('❌ Video error:', target.error);
      setError(`Video error: ${target.error?.message || 'Unknown error'}`);
      setVideoLoaded(false);
    };

    const handleLoadStart = () => {
      console.log('🔄 Video load started');
    };

    const handleLoadedMetadata = () => {
      console.log('📊 Video metadata loaded');
    };

    const handleProgress = () => {
      console.log('📈 Video loading progress');
    };

    const handleCanPlayThrough = () => {
      console.log('🎯 Video can play through');
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    // Start playing the video
    const startVideo = async () => {
      try {
        console.log('🎬 Setting video source:', videoUrl);
        video.src = videoUrl;
        video.muted = true;
        
        // Wait for the video to be ready
        video.addEventListener('loadeddata', async () => {
          console.log('📊 Video data loaded, attempting to play...');
          try {
            await video.play();
            console.log('🎬 Video started playing (muted)');
          } catch (playErr) {
            console.error('❌ Failed to play video:', playErr);
            setError('Failed to play video');
          }
        }, { once: true });
        
      } catch (err) {
        console.error('❌ Failed to setup video:', err);
        setError('Failed to setup video');
      }
    };

    startVideo();

    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  const handleUnmute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      setIsMuted(false);
      console.log('🔊 Video unmuted');
      console.log('🔊 Video muted state:', video.muted);
      
      // Try to play the video again if it was paused due to autoplay restrictions
      if (video.paused) {
        video.play().then(() => {
          console.log('🎬 Video resumed playing after unmute');
        }).catch(err => {
          console.error('❌ Failed to resume video:', err);
        });
      }
    }
  };

  return (
    <div 
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
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
          pointerEvents: 'none',
          opacity: 1, // Force full opacity
          zIndex: 0, // Ensure it's at the bottom
        }}
      />
      
      {/* Unmute button */}
      <UnmuteButton onUnmute={handleUnmute} isMuted={isMuted} />
      
    </div>
  );
}