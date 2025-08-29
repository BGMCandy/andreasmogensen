"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, PanInfo } from "framer-motion"

// Type declaration for webkitAudioContext (Safari/iOS support)
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

const Player = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  // Removed unused bassLevel state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragConstraints, setDragConstraints] = useState({
    left: -1000,
    right: 1000,
    top: -1000,
    bottom: 1000
  })
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Audio analyzer refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const isAnalyzingRef = useRef<boolean>(false)
  
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

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      isAnalyzingRef.current = false
    }
  }, [])

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
    console.log('🎵 Play button clicked!')
    
    // Detect iOS specifically
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    console.log('📱 Device info:', {
      userAgent: navigator.userAgent,
      isIOS,
      audioReady: audioRef.current?.readyState,
      audioContextState: audioContextRef.current?.state
    })
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        console.log('⏸️ Audio paused')
      } else {
        // iOS-specific audio handling
        const playAudio = async () => {
          try {
            console.log('🚀 Attempting to play audio...')
            
            // iOS Safari requires AudioContext to be created/resumed on user gesture
            if (isIOS) {
              console.log('🍎 iOS detected - using iOS-specific audio handling')
              
              // Create AudioContext if it doesn't exist (iOS requirement)
              if (!audioContextRef.current) {
                console.log('🔧 Creating AudioContext for iOS...')
                const AudioContextClass = window.AudioContext || window.webkitAudioContext
                audioContextRef.current = new AudioContextClass()
              }
              
              // Resume AudioContext (critical for iOS)
              if (audioContextRef.current.state === 'suspended') {
                console.log('🔄 Resuming AudioContext for iOS...')
                await audioContextRef.current.resume()
                console.log('✅ AudioContext resumed')
              }
              
              // Setup analyzer if not already done
              if (!isAnalyzingRef.current) {
                console.log('🔧 Setting up audio analyzer for iOS...')
                await setupAudioAnalyzer()
              }
            }
            
            // Attempt to play audio
            console.log('▶️ Playing audio...')
            await audioRef.current!.play()
            setIsPlaying(true)
            console.log('✅ Audio started successfully!')
            
          } catch (error) {
            console.error('❌ Play failed:', error)
            
            // iOS-specific error handling
            if (isIOS && error instanceof Error) {
              if (error.message.includes('user gesture')) {
                console.log('🍎 iOS: User gesture required - this is normal')
              } else if (error.message.includes('autoplay')) {
                console.log('🍎 iOS: Autoplay blocked - this is normal')
              } else if (error.message.includes('not allowed')) {
                console.log('🍎 iOS: Audio not allowed - may need to reload page')
              }
            }
          }
        }
        
        playAudio()
      }
    } else {
      console.error('❌ No audio element reference!')
    }
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setPosition({ x: info.point.x, y: info.point.y })
  }

  // Start analysis function - defined first
  const startAnalysis = useCallback(() => {
    if (!isAnalyzingRef.current || !analyserRef.current) return
    
    const analyze = () => {
      try {
        if (!analyserRef.current) return
        
        // Get real frequency data from the analyser
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteFrequencyData(dataArray)
        
        // Calculate bass energy in the 40-110 Hz range
        const sampleRate = audioContextRef.current?.sampleRate || 44100
        const binWidth = sampleRate / (bufferLength * 2)
        const startBin = Math.floor(40 / binWidth)
        const endBin = Math.floor(110 / binWidth)
        
        let bassSum = 0
        let binCount = 0
        
        for (let i = startBin; i <= endBin && i < bufferLength; i++) {
          bassSum += dataArray[i]
          binCount++
        }
        
        // Calculate real bass level
        const rawAvg = bassSum / binCount // 0-255 range
        const normalized = (rawAvg - 20) / 200 // Subtract noise floor, normalize
        const finalLevel = Math.max(0, Math.min(1, normalized)) // Clamp 0-1
        
        // Bass level calculated for visual effects
        
        // Drive the hero elements with real bass data
        const elements = document.querySelectorAll('.bass-pulse')
        if (elements.length > 0) {
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              const scale = 1.0 - (finalLevel * 0.12) // Map to 1.00 → 0.88 (inverted)
              element.style.transform = `scale(${scale})`
              element.style.transition = 'transform 0.1s ease-out'
              element.style.willChange = 'transform'
            }
          })
        }
        
        // Drive elements with glow effect
        const glowElements = document.querySelectorAll('.bass-glow')
        if (glowElements.length > 0) {
          glowElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              const glowIntensity = finalLevel * 0.8
              const glowSize = finalLevel * 30
              element.style.boxShadow = `0 0 ${glowSize}px rgba(0, 255, 255, ${glowIntensity})`
              element.style.transition = 'box-shadow 0.1s ease-out'
              element.style.willChange = 'box-shadow'
            }
          })
        }
        
        // Drive elements with opacity effect
        const opacityElements = document.querySelectorAll('.bass-opacity')
        if (opacityElements.length > 0) {
          opacityElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              const opacity = 0.3 + (finalLevel * 0.7) // Map to 0.3 → 1.0
              element.style.opacity = opacity.toString()
              element.style.transition = 'opacity 0.1s ease-out'
              element.style.willChange = 'opacity'
            }
          })
        }
        
        // Drive elements with blur effect
        const blurElements = document.querySelectorAll('.bass-blur')
        if (blurElements.length > 0) {
          blurElements.forEach((element) => {
            if (element instanceof HTMLElement) {
              const blurAmount = finalLevel * 8 // Map to 0px → 8px blur
              element.style.filter = `blur(${blurAmount}px)`
              element.style.transition = 'filter 0.1s ease-out'
              element.style.willChange = 'filter'
            }
          })
        }
      
        
      } catch (error) {
        console.error('Analysis error:', error)
      }
      
      if (isAnalyzingRef.current) {
        animationRef.current = requestAnimationFrame(analyze)
      }
    }
    
    analyze()
  }, [])

  // Simple audio analyzer - integrated directly
  const setupAudioAnalyzer = useCallback(async () => {
    if (!audioRef.current || isAnalyzingRef.current) return
    
    try {
      console.log('🎯 Setting up real audio analyzer...')
      
      // Create AudioContext on first user interaction
      if (!audioContextRef.current) {
        // Mobile-friendly AudioContext creation
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        audioContextRef.current = new AudioContextClass({
          latencyHint: 'interactive', // Better for mobile
          sampleRate: 44100 // Standard sample rate
        })
        console.log('✅ AudioContext created with mobile optimizations')
      }
      
      // Resume if suspended (critical for mobile)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
        console.log('🔄 AudioContext resumed (mobile requirement)')
      }
      
      console.log('✅ AudioContext state:', audioContextRef.current.state)
      
      // Create analyser
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 2048
        analyserRef.current.smoothingTimeConstant = 0.8
        console.log('✅ Analyser created')
      }
      
      // Create MediaElementSource and connect BOTH ways
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
        
        // CORRECT WIRING: source → analyser AND source → destination
        sourceRef.current.connect(analyserRef.current)  // For analysis
        sourceRef.current.connect(audioContextRef.current.destination)  // For audio output
        
        console.log('✅ Audio connected: source → analyser AND source → speakers')
        console.log('🔗 Dual connection: analysis + playback')
      }
      
      isAnalyzingRef.current = true
      startAnalysis()
      
    } catch (error) {
      console.error('❌ Audio analyzer setup failed:', error)
    }
  }, [startAnalysis])

  return (
    <motion.div 
      className="fixed z-50"
      style={{ 
        x, 
        y,
        left: 0,
        top: 0,
        touchAction: 'none' // Ensure touch events work properly on mobile
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDrag={handleDrag}
      dragConstraints={dragConstraints}
      // Mobile-specific touch handling
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src="https://files.andreasmogensen.dk/andreasmogensen.mp3?v=2"
        crossOrigin="anonymous"
        preload="none" // iOS: don't preload to avoid issues
        playsInline // Critical for iOS
        muted={false} // Ensure not muted initially
        onPlay={() => {
          setIsPlaying(true)
          console.log('🎵 Audio play event fired')
          // Start the audio analyzer
          setupAudioAnalyzer()
        }}
        onPause={() => {
          setIsPlaying(false)
          console.log('⏸️ Audio pause event fired')
        }}
        onEnded={() => {
          setIsPlaying(false)
          console.log('🔚 Audio ended event fired')
        }}
        onError={(e) => {
          console.error('❌ Audio error:', e)
          console.error('Audio element error details:', audioRef.current?.error)
          
          // Check for CORS errors specifically
          if (audioRef.current?.error) {
            const error = audioRef.current.error
            if (error.code === 4) { // MEDIA_ERR_SRC_NOT_SUPPORTED
              console.error('🚫 CORS Error: Audio file not accessible due to CORS policy')
              console.error('💡 Check if Access-Control-Allow-Origin includes:', window.location.origin)
            }
          }
        }}
        onCanPlay={() => {
          console.log('✅ Audio can play - ready to play')
        }}
        onLoadStart={() => {
          console.log('📥 Audio loading started')
        }}
        onLoadedMetadata={() => {
          console.log('📊 Audio metadata loaded:', {
            duration: audioRef.current?.duration,
            readyState: audioRef.current?.readyState,
            networkState: audioRef.current?.networkState
          })
          
          // Check CORS headers
          fetch(audioRef.current?.src || '', { method: 'HEAD' })
            .then(response => {
              console.log('🔒 CORS Check:', {
                status: response.status,
                cors: response.headers.get('Access-Control-Allow-Origin'),
                contentType: response.headers.get('Content-Type'),
                contentLength: response.headers.get('Content-Length')
              })
            })
            .catch(error => {
              console.error('❌ CORS check failed:', error)
            })
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
              onTouchStart={() => {
                console.log('📱 Mobile: Touch start on play button')
              }}
              onTouchEnd={() => {
                console.log('📱 Mobile: Touch end on play button')
              }}
              className="w-10 h-10 md:w-6 md:h-6 bg-gradient-to-r from-zinc-700 to-zinc-600 border border-zinc-500/50 rounded-full flex items-center justify-center hover:from-zinc-600 hover:to-zinc-500 transition-all duration-200 touch-manipulation cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
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
              onTouchStart={() => {
                console.log('📱 Mobile: Touch start on mute button')
              }}
              onTouchEnd={() => {
                console.log('📱 Mobile: Touch end on mute button')
              }}
              className={`w-8 h-8 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-200 touch-manipulation ${
                isMuted 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 border border-red-400/50' 
                  : 'bg-gradient-to-r from-green-600 to-green-500 border border-green-400/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ touchAction: 'manipulation' }}
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
      {/* The AudioAnalyzer component is now integrated into the player */}
    </motion.div>
  )
}

export default Player