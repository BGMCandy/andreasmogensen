// components/BackgroundSpace.tsx
"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"

export type StarLayerConfig = {
  count: number
  sizeRange?: [number, number]
  opacity?: number
  duration?: number
  seed?: number
  className?: string
}

export type BlobConfig = {
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    x?: [number, number, number]
    y?: [number, number, number]
  }
  size: {
    width: string
    height: string
  }
  colors: {
    primary: string
    secondary: string
    opacity: number
  }
  animation: {
    x?: [number, number, number]
    y?: [number, number, number]
    scale?: [number, number, number]
    duration: number
  }
}

export type BackgroundSpaceConfig = {
  stars?: StarLayerConfig[]
  blobs?: BlobConfig[]
  vignette?: {
    enabled: boolean
    position?: string
    intensity?: number
  }
  className?: string
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const StarsLayer: React.FC<StarLayerConfig> = ({
  count,
  sizeRange = [1, 2],
  opacity = 0.6,
  duration = 12,
  seed = 1,
  className = "",
}) => {
  const stars = useMemo(() => {
    const rnd = mulberry32(seed)
    return new Array(count).fill(0).map((_, i) => {
      const top = rnd() * 100
      const left = rnd() * 100
      const size = sizeRange[0] + rnd() * (sizeRange[1] - sizeRange[0])
      const delay = rnd() * duration
      const twinkle = 0.5 + rnd() * 0.5
      return { id: i, top, left, size, delay, twinkle }
    })
  }, [count, duration, seed, sizeRange])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity,
            boxShadow: `0 0 ${Math.max(4, s.size * 3)}px rgba(255,255,255,0.7)`,
          }}
          animate={{ opacity: [opacity * 0.4, opacity * s.twinkle, opacity * 0.4] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  )
}

const BackgroundSpace: React.FC<BackgroundSpaceConfig> = ({
  stars = [],
  blobs = [],
  vignette = { enabled: true, position: "50% 60%", intensity: 0.25 },
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Stars */}
      {stars.map((starConfig, index) => (
        <StarsLayer key={`stars-${index}`} {...starConfig} />
      ))}

      {/* Blobs / nebula */}
      {blobs.map((blobConfig, index) => (
        <motion.div
          key={`blob-${index}`}
          className="absolute rounded-full blur-3xl"
          style={{
            top: blobConfig.position.top,
            bottom: blobConfig.position.bottom,
            left: blobConfig.position.left,
            right: blobConfig.position.right,
            width: blobConfig.size.width,
            height: blobConfig.size.height,
            background: `radial-gradient(closest-side, ${blobConfig.colors.primary}, ${blobConfig.colors.secondary}, transparent)`,
          }}
          animate={{
            x: blobConfig.animation.x,
            y: blobConfig.animation.y,
            scale: blobConfig.animation.scale,
          }}
          transition={{ 
            duration: blobConfig.animation.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      ))}

      {/* Vignette */}
      {vignette.enabled && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${vignette.position}, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,${vignette.intensity}) 80%)`,
          }}
        />
      )}
    </div>
  )
}

export default BackgroundSpace
