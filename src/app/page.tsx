'use client';

import BgVideo from "./index/components/bgVideo";
import MasterPlayer from "./index/components/MasterPlayer";
import StoreDebug from "./index/components/StoreDebug";
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
      <StoreDebug />
      <BgVideo />
      
      {/* Mute/Unmute toggle button */}
      <button
        onClick={handleToggleMute}
        className="fixed top-18 right-18 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full p-3 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group z-50"
      >
        <div className="flex items-center justify-center">
          {isVideoMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="m15.54 8.46 5.3 5.3"/>
              <path d="m8.46 8.46-5.3 5.3"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="m19.07 4.93-5.3 5.3"/>
              <path d="m19.07 14.93 5.3-5.3"/>
            </svg>
          )}
        </div>
      </button>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
            Andreas Mogensen
          </h1>
          <p className="text-white/90 text-xl md:text-2xl drop-shadow-lg mb-12 leading-relaxed font-light">
            Welcome to this unofficial fansite dedicated to Andreas Mogensen, the Danish astronaut.
          </p>
          <div className="mt-8 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-white/80 text-lg leading-relaxed">
              Experience the wonder of space exploration through the journey of Denmark&apos;s pioneering astronaut.
            </p>
          </div>
          
          {/* Audio Stem Visualization System */}
          <div className="mt-8 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <MasterPlayer />
          </div>
        </div>
      </div>
    </>
  );
}
