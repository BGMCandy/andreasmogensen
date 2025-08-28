"use client"

import { useEffect, useRef, useState } from "react"
import { usePlayerStore } from "@/app/state/playerStore"

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

  const setStore = usePlayerStore((s) => s.set)

  // Initialize audio context and analyser once
  useEffect(() => {
    const audio = new Audio(file)
    audio.loop = true
    audioRef.current = audio

    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    audioContextRef.current = audioContext

    const resumeContext = () => {
      if (audioContext.state === 'suspended') audioContext.resume()
    }
    document.addEventListener('click', resumeContext, { once: true })

    const source = audioContext.createMediaElementSource(audio)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.0001

    source.connect(analyser)
    analyserRef.current = analyser

    return () => {
      document.removeEventListener('click', resumeContext)
      audio.pause()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [file])

  // Handle play/pause sync
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.currentTime = currentTime
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTime])

  // Passive sync
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const timeDiff = Math.abs(audioRef.current.currentTime - currentTime)
      if (timeDiff > 0.0005) audioRef.current.currentTime = currentTime
    }
  }, [currentTime, isPlaying])

  // Analysis loop
  useEffect(() => {
    if (!analyserRef.current || !audioRef.current) return

    const updateLevel = () => {
      const analyser = analyserRef.current!
      const audio = audioRef.current!
      if (audio.readyState >= 2 && !audio.paused && isPlaying) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)
        const peak = Math.max(...dataArray)
        const normalizedLevel = peak / 255

        setLevel(normalizedLevel)
        // 🔥 Push into global store
        setStore({
          stemLevels: {
            ...usePlayerStore.getState().stemLevels,
            [label.toLowerCase()]: normalizedLevel,
          },
        })
      } else {
        setLevel(0)
        setStore({
          stemLevels: {
            ...usePlayerStore.getState().stemLevels,
            [label.toLowerCase()]: 0,
          },
        })
      }
      animationRef.current = requestAnimationFrame(updateLevel)
    }

    updateLevel()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, label, setStore])

  return (
    <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-white/8 to-white/5 backdrop-blur-lg rounded-xl border border-white/15 shadow-lg">
      {/* Label + bar + percentage (unchanged) */}
      <div className="w-28 text-center">
        <div className="text-lg font-semibold text-white">{label}</div>
        <div className="text-xs text-white/50 font-medium">Track</div>
      </div>
      <div className="flex-1 relative">
        <div className="relative h-10 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10" />
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-75 ease-out"
            style={{
              background: `linear-gradient(90deg, ${color}80, ${color})`,
              width: `${Math.max(20, level * 400)}px`,
              boxShadow: `0 0 30px ${color}60, inset 0 0 20px ${color}40`,
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-white/40">
          <span>0:00</span><span>Live</span><span>End</span>
        </div>
      </div>
      <div className="w-20 text-center">
        <div className="text-2xl font-bold text-white">{Math.round(level * 100)}%</div>
        <div className="text-xs text-white/50">Level</div>
      </div>
    </div>
  )
}
