"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  file: string
  label: string
  color: string
  isPlaying: boolean
  currentTime: number
}

export default function StemVisualizer({ file, label, color, isPlaying, currentTime }: Props) {
  const [level, setLevel] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const animationRef = useRef<number>(0)

  // Initialize audio context and analyser once
  useEffect(() => {
    const audio = new Audio(file)
    audio.loop = true
    audioRef.current = audio

    // Create audio context and analyser
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContextRef.current = audioContext
    
    // Resume audio context when user interacts
    const resumeContext = () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
    }
    document.addEventListener('click', resumeContext, { once: true })
    
    const source = audioContext.createMediaElementSource(audio)
    const analyser = audioContext.createAnalyser()
    
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.001 // Much more responsive for transients
    
    // Connect source to analyser, but DON'T connect to destination (no audio output)
    source.connect(analyser)
    // analyser.connect(audioContext.destination) // REMOVED - no audio output
    
    analyserRef.current = analyser

    // Wait for audio to be ready
    const handleCanPlay = () => {
      console.log(`${label} audio ready, duration:`, audio.duration)
      // Test if analyser is working
      if (analyser) {
        const testArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(testArray)
        console.log(`${label} analyser test - array length:`, testArray.length, 'first few values:', testArray.slice(0, 5))
      }
    }
    
    const handleError = (e: any) => {
      console.error(`${label} audio error:`, e)
    }
    
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      document.removeEventListener('click', resumeContext)
      audio.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      // Don't close audioContext here as it might be shared
    }
  }, [file, label])

  // Handle play/pause with perfect sync
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        console.log(`${label} starting playback at ${currentTime.toFixed(3)}`)
        // Set the exact time before playing to ensure sync
        audioRef.current.currentTime = currentTime
        audioRef.current.play().catch(err => console.log(`${label} play error:`, err))
      } else {
        console.log(`${label} pausing`)
        audioRef.current.pause()
      }
    }
  }, [isPlaying, label, currentTime])

  // Passive sync - only snap when drift is detected
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const timeDiff = Math.abs(audioRef.current.currentTime - currentTime)
      if (timeDiff > 0.05) { // 50ms drift threshold
        console.log(`${label} passive sync from ${audioRef.current.currentTime.toFixed(3)} to ${currentTime.toFixed(3)}`)
        audioRef.current.currentTime = currentTime
      }
    }
  }, [currentTime, isPlaying, label])

  // Analysis loop - much faster and more responsive
  useEffect(() => {
    if (!analyserRef.current || !audioRef.current) return

    const updateLevel = () => {
      const analyser = analyserRef.current
      const audio = audioRef.current
      if (!analyser || !audio) return

      try {
        // Check if audio is actually playing and has data
        if (audio.readyState >= 2 && !audio.paused && isPlaying) { // HAVE_CURRENT_DATA and not paused
          const dataArray = new Uint8Array(analyser.frequencyBinCount)
          analyser.getByteFrequencyData(dataArray)
          
          // For transient sounds, use peak detection instead of RMS
          const peak = Math.max(...dataArray)
          const normalizedLevel = peak / 255
          
          setLevel(normalizedLevel)
          
          // Debug: log levels occasionally
          if (Math.random() < 0.005) { // 0.5% chance to log
            console.log(`${label} peak level:`, normalizedLevel.toFixed(3), 'readyState:', audio.readyState, 'paused:', audio.paused)
          }
        } else {
          setLevel(0)
        }
      } catch (error) {
        console.error(`${label} analysis error:`, error)
        setLevel(0)
      }
      
      // Always continue the loop for responsive updates
      animationRef.current = requestAnimationFrame(updateLevel)
    }

    updateLevel()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, label])

  return (
    <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-white/8 to-white/5 backdrop-blur-lg rounded-xl border border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Label */}
      <div className="w-28 text-center">
        <div className="text-lg font-semibold text-white">{label}</div>
        <div className="text-xs text-white/50 font-medium">Track</div>
      </div>
      
      {/* Visual Bar */}
      <div className="flex-1 relative">
        <div className="relative h-10 bg-white/5 rounded-full overflow-hidden border border-white/10">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10" />
          
          {/* Animated level bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-75 ease-out shadow-lg"
            style={{
              background: `linear-gradient(90deg, ${color}80, ${color})`,
              width: `${Math.max(20, level * 400)}px`,
              boxShadow: `0 0 30px ${color}60, inset 0 0 20px ${color}40`,
            }}
          />
          
          {/* Glow effect */}
          <div
            className="absolute top-0 left-0 h-full rounded-full opacity-30 blur-sm"
            style={{
              background: color,
              width: `${Math.max(20, level * 400)}px`,
            }}
          />
        </div>
        
        {/* Time markers */}
        <div className="mt-2 flex justify-between text-xs text-white/40">
          <span>0:00</span>
          <span>Live</span>
          <span>End</span>
        </div>
      </div>
      
      {/* Level Display */}
      <div className="w-20 text-center">
        <div className="text-2xl font-bold text-white">{Math.round(level * 100)}%</div>
        <div className="text-xs text-white/50">Level</div>
      </div>
      
      {/* Status Indicator */}
      <div className="w-16 text-center">
        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        <div className="text-xs text-white/50">{isPlaying ? 'Live' : 'Idle'}</div>
      </div>
    </div>
  )
}
