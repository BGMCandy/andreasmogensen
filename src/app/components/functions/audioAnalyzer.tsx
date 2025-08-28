"use client"

import React, { useEffect, useRef, useCallback } from 'react'

interface AudioAnalyzerProps {
  audioElement: HTMLAudioElement | null
  className?: string
}

// Bass detection configuration
const BASS_CONFIG = {
  fftSize: 1024,
  smoothingTimeConstant: 0.8,
  bassRange: { start: 40, end: 110 },
  noiseFloor: 0.02,
  envelopeAttack: 0.1,
  envelopeRelease: 0.3,
  scaleRange: { min: 1.0, max: 1.12 }
}

const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ audioElement, className = "" }) => {
  const animationRef = useRef<number | undefined>(undefined)
  const isRunningRef = useRef<boolean>(false)
  const lastBassValueRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  // Calculate frequency bins for bass range
  const getBassBins = useCallback((sampleRate: number, fftSize: number) => {
    const binWidth = sampleRate / (fftSize * 2)
    const startBin = Math.floor(BASS_CONFIG.bassRange.start / binWidth)
    const endBin = Math.floor(BASS_CONFIG.bassRange.end / binWidth)
    return { startBin, endBin, binWidth }
  }, [])

  // Envelope follower for smooth bass response
  const applyEnvelope = useCallback((input: number, current: number, deltaTime: number) => {
    if (input > current) {
      const attackRate = 1 / BASS_CONFIG.envelopeAttack
      return current + attackRate * deltaTime * (input - current)
    } else {
      const releaseRate = 1 / BASS_CONFIG.envelopeRelease
      return current + releaseRate * deltaTime * (input - current)
    }
  }, [])

  // Main analysis loop
  const analyze = useCallback(() => {
    if (!analyserRef.current || !isRunningRef.current) return

    try {
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyserRef.current.getByteFrequencyData(dataArray)

      const sampleRate = audioContextRef.current?.sampleRate || 44100
      const { startBin, endBin } = getBassBins(sampleRate, BASS_CONFIG.fftSize)
      
      let bassEnergy = 0
      let binCount = 0
      
      for (let i = startBin; i <= endBin && i < bufferLength; i++) {
        const amplitude = dataArray[i] / 255
        bassEnergy += amplitude * amplitude
        binCount++
      }
      
      const bassRMS = binCount > 0 ? Math.sqrt(bassEnergy / binCount) : 0
      
      const now = Date.now()
      const deltaTime = (now - (lastBassValueRef.current || now)) / 1000
      lastBassValueRef.current = now
      
      const envelopeValue = applyEnvelope(bassRMS, lastBassValueRef.current, deltaTime)
      
      const normalizedBass = Math.max(0, Math.min(1, 
        (envelopeValue - BASS_CONFIG.noiseFloor) * 2
      ))
      
      frameCountRef.current++
      if (frameCountRef.current % 2 === 0) {
        const elements = document.querySelectorAll('.bass-pulse')
        elements.forEach((element) => {
          if (element instanceof HTMLElement) {
            const scale = BASS_CONFIG.scaleRange.min + 
                         (normalizedBass * (BASS_CONFIG.scaleRange.max - BASS_CONFIG.scaleRange.min))
            
            element.style.transform = `scale(${scale})`
            element.style.transformOrigin = 'center'
            element.style.transition = `transform ${BASS_CONFIG.envelopeRelease * 0.5}s ease-out`
            
            const glowIntensity = normalizedBass * 0.6
            element.style.boxShadow = `0 0 ${glowIntensity * 20}px rgba(0, 255, 255, ${glowIntensity * 0.4})`
          }
        })
      }
      
    } catch (error) {
      // Silent error handling
    }
    
    animationRef.current = requestAnimationFrame(analyze)
  }, [getBassBins, applyEnvelope])

  // Setup audio graph
  const setupAudioGraph = useCallback(async () => {
    if (!audioElement || audioElement.readyState < 2) return
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = BASS_CONFIG.fftSize
        analyserRef.current.smoothingTimeConstant = BASS_CONFIG.smoothingTimeConstant
      }
      
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement)
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      }
      
      isRunningRef.current = true
      analyze()
      
    } catch (error) {
      // Silent error handling
    }
  }, [audioElement, analyze])

  // Start analyzer on play
  useEffect(() => {
    if (!audioElement) return
    
    const handlePlay = () => {
      const trySetup = () => {
        if (audioElement.readyState >= 2) {
          setupAudioGraph()
        } else {
          setTimeout(trySetup, 100)
        }
      }
      trySetup()
    }
    
    audioElement.addEventListener('play', handlePlay)
    
    return () => {
      audioElement.removeEventListener('play', handlePlay)
    }
  }, [audioElement, setupAudioGraph])

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      isRunningRef.current = false
    }
  }, [])

  return null
}

export default AudioAnalyzer
