'use client';

import Image from "next/image";
import BgVideo from "./index/components/bgVideo";
import { useState } from "react";

export default function Home() {
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const handleToggleMute = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(video.muted);
    }
  };

  return (
    <>
      <BgVideo />
      
      {/* Mute/Unmute toggle button */}
      <button
        onClick={handleToggleMute}
        className="fixed top-8 right-8 bg-white text-black px-4 py-2 rounded font-bold shadow-lg hover:bg-gray-100"
        style={{ zIndex: 1000 }}
      >
        {isVideoMuted ? '🔊 Unmute' : '🔇 Mute'}
      </button>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Andreas Mogensen
          </h1>
          <p className="text-white text-xl md:text-2xl drop-shadow-lg mb-8 leading-relaxed">
            Welcome to this unofficial fansite dedicated to Andreas Mogensen, the Danish astronaut.
          </p>
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-white text-lg">
              The background video should be playing behind this text.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
