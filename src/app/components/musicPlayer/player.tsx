"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, PanInfo } from "framer-motion"
import AudioAnalyzer from "../functions/audioAnalyzer"

const Player = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragConstraints, setDragConstraints] = useState({
    left: -1000,
    right: 1000,
    top: -1000,
    bottom: 1000
  })
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Motion values for dragging
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      
      // Test if audio can load
      audioRef.current.addEventListener('canplay', () => {
        console.log('Audio loaded successfully')
      })
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio failed to load:', e)
      })
    }
  }, [])

  // Set drag constraints and default position after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDragConstraints({
        left: -window.innerWidth + 300,
        right: window.innerWidth - 20,
        top: -window.innerHeight + 300,
        bottom: window.innerHeight - 20
      })
      
      // Set default position to bottom right corner
      const newPosition = { 
        x: window.innerWidth - 120,
        y: window.innerHeight - 120
      }
      setPosition(newPosition)
      
      // Update motion values to actually move the player
      x.set(newPosition.x)
      y.set(newPosition.y)
    }
  }, [x, y])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false
        setIsMuted(false)
      } else {
        audioRef.current.muted = true
        setIsMuted(true)
      }
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Ensure audio context is resumed on first user interaction
        if (audioRef.current.readyState >= 2) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error('Play failed:', error)
            })
        } else {
          // Wait for audio to be ready
          audioRef.current.addEventListener('canplay', () => {
            audioRef.current?.play()
              .then(() => setIsPlaying(true))
              .catch(console.error)
          }, { once: true })
        }
      }
    }
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setPosition({ x: info.point.x, y: info.point.y })
  }

  return (
    <motion.div 
      className="fixed z-50"
      style={{ 
        x, 
        y,
        left: 0,
        top: 0
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDrag={handleDrag}
      dragConstraints={dragConstraints}
    >
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src="https://files.andreasmogensen.dk/andreasmogensen.mp3"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Audio error:', e)
        }}
        onCanPlay={() => {
          console.log('Audio can play')
        }}
      />
      
      {/* Player container */}
      <motion.div
        className="relative bg-black/80 backdrop-blur-md border border-zinc-600/50 rounded-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Draggable header */}
        <motion.div 
          className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 px-2 py-1.5 border-b border-zinc-600/50 cursor-move select-none"
          whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.9)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              {/* Animated dots */}
              <div className="flex space-x-0.5">
                <motion.div
                  className="w-1.5 h-1.5 bg-red-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-300 cursor-move">AUDIO</span>
            </div>
            <div className="text-xs font-mono text-zinc-400 cursor-move">v1.0</div>
          </div>
        </motion.div>

        {/* Main player body */}
        <div className="p-3">
          {/* Visualizer bars */}
          <div className="flex items-end justify-center space-x-0.5 mb-3 h-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full"
                animate={{
                  height: isPlaying && !isMuted 
                    ? [2, Math.random() * 20 + 4, 2] 
                    : 2
                }}
                transition={{
                  duration: 0.8,
                  repeat: isPlaying && !isMuted ? Infinity : 0,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Track info */}
          <div className="text-center mb-3">
            <div className="text-xs font-mono text-zinc-400 mb-0.5">TRACK</div>
            <div className="text-xs font-mono text-zinc-200 truncate max-w-28">
              andreasmogensen.mp3
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-2">
            {/* Play/Pause button */}
            <motion.button
              onClick={togglePlayPause}
              className="w-6 h-6 bg-gradient-to-r from-zinc-700 to-zinc-600 border border-zinc-500/50 rounded-full flex items-center justify-center hover:from-zinc-600 hover:to-zinc-500 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-2 bg-zinc-300 rounded-sm" />
                  <div className="w-0.5 h-2 bg-zinc-300 rounded-sm" />
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[4px] border-l-zinc-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
              )}
            </motion.button>

            {/* Mute/Unmute button */}
            <motion.button
              onClick={toggleMute}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                isMuted 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 border border-red-400/50' 
                  : 'bg-gradient-to-r from-green-600 to-green-500 border border-green-400/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Test button */}
          <div className="text-center mt-2">
            <button 
              onClick={() => {
                if (audioRef.current) {
                  console.log('Audio state:', {
                    readyState: audioRef.current.readyState,
                    networkState: audioRef.current.networkState,
                    paused: audioRef.current.paused,
                    currentTime: audioRef.current.currentTime,
                    duration: audioRef.current.duration
                  })
                  
                  // Test play
                  audioRef.current.play()
                    .then(() => console.log('Test play successful'))
                    .catch(e => console.error('Test play failed:', e))
                }
              }}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Test Audio
            </button>
          </div>

          {/* Status indicator */}
          <div className="text-center mt-2">
            <div className="text-xs font-mono text-zinc-500">
              {isMuted ? 'MUTED' : isPlaying ? 'PLAYING' : 'STOPPED'}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
      </motion.div>
      
      {/* Audio Analyzer - invisible component that analyzes audio */}
      {/* <AudioAnalyzer audioElement={audioRef.current} /> */}
    </motion.div>
  )
}

export default Player