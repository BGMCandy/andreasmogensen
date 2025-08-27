'use client';

import { useState } from 'react';

interface UnmuteButtonProps {
  onUnmute: () => void;
  isMuted: boolean;
  className?: string;
}

export default function UnmuteButton({ onUnmute, isMuted, className = '' }: UnmuteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!isMuted) return null; // Don't show button if already unmuted

  return (
    <button
      onClick={onUnmute}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-20 right-4 z-30 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 ${className}`}
      style={{
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered ? '0 8px 25px rgba(255,255,255,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
      }}
      title="Click to unmute video"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-300"
        style={{
          transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)'
        }}
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="m15.54 8.46 5.3 5.3"/>
        <path d="m8.46 8.46-5.3 5.3"/>
      </svg>
      
      {/* Hover text */}
      {isHovered && (
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
          Click to unmute
        </div>
      )}
    </button>
  );
} 