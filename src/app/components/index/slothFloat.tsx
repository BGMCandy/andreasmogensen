"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
  PanInfo,
} from "framer-motion"
import Image from "next/image"

const STORAGE_KEY = "slothFloatPos"
const DRAGGED_KEY = "slothFloatHasDragged"
const SIZE = 64 // Change this value to resize the sloth (in pixels)

const SlothFloat: React.FC = () => {
  // Base motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 12, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 12, mass: 0.6 })

  // Flair
  const rot = useMotionValue(0)              // rotateZ (deg)
  const scale = useMotionValue(1)            // zoom in/out "depth"
  const glow = useMotionValue(0.22)
  const vx = useMotionValue(0)
  const vy = useMotionValue(0)

  // State/refs
  const [hasDragged, setHasDragged] = useState(false)
  const isDraggingRef = useRef(false)
  const prefersReduced = useReducedMotion()
  const bounds = useRef({ w: 0, h: 0, pad: 24 })
  const size = { w: SIZE, h: SIZE } // base size; scale anim will make it pop

  // Restore position + dragged state
  useEffect(() => {
    const { innerWidth: W, innerHeight: H } = window
    bounds.current = { w: W, h: H, pad: 24 }
    const saved = localStorage.getItem(STORAGE_KEY)
    const dragged = localStorage.getItem(DRAGGED_KEY)

    if (saved) {
      const { x: px, y: py } = JSON.parse(saved)
      x.set(px); y.set(py)
    } else {
      // Position sloth on the left side of the screen
      x.set(Math.min(W - size.w - 48, W * 0.25))
      y.set(Math.min(H - size.h - 48, H * 0.5))
    }
    setHasDragged(!!dragged)

    const onResize = () => {
      const { innerWidth, innerHeight } = window
      bounds.current = { w: innerWidth, h: innerHeight, pad: 24 }
      x.set(clamp(x.get(), bounds.current.pad, innerWidth  - size.w - bounds.current.pad))
      y.set(clamp(y.get(), bounds.current.pad, innerHeight - size.h - bounds.current.pad))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Idle float: bob, rotate, and scale (depth). Pauses while dragging or reduced-motion.
  useAnimationFrame((t) => {
    if (prefersReduced || isDraggingRef.current) return
    const time = t / 1000

    // Subtle bob - sloth moves more slowly and gently
    const bobX = Math.sin(time * 0.35) * 4
    const bobY = Math.cos(time * 0.48) * 3
    x.set(x.get() + bobX * 0.06)
    y.set(y.get() + bobY * 0.06)

    // Gentle rotation - sloth rotates more slowly
    const r =
      Math.sin(time * 0.25) * 6 +   // slow sway
      Math.sin(time * 0.08 + 1.7) * 3 + // secondary wobble
      Math.cos(time * 0.05 + 0.6) * 2   // long drift
    rot.set(r)

    // Depth (scale) between ~0.95 and ~1.05 with gentle waves
    const sBase = 0.98 + Math.sin(time * 0.4) * 0.035
    const sMicro = Math.sin(time * 1.3 + 0.9) * 0.012
    scale.set(clamp(sBase + sMicro, 0.95, 1.05))

    // Gentle glow pulse
    glow.set(0.22 + (Math.sin(time * 0.9) + 1) * 0.045)
  })

  function onDragStart() {
    isDraggingRef.current = true
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    isDraggingRef.current = false
    setHasDragged(true)
    try { localStorage.setItem(DRAGGED_KEY, "1") } catch {}

    // Clamp to viewport
    const nx = clamp(info.point.x - size.w / 2, bounds.current.pad, bounds.current.w - size.w - bounds.current.pad)
    const ny = clamp(info.point.y - size.h / 2, bounds.current.pad, bounds.current.h - size.h - bounds.current.pad)
    x.set(nx); y.set(ny)

    // Velocity → quick tilt blip
    vx.set(info.velocity.x); vy.set(info.velocity.y)
    const angle = clamp(info.velocity.x / 1200, -0.15, 0.15) * 22
    rot.set(angle)
    setTimeout(() => rot.set(0), 300)

    // Ease scale back to ~1 after drag
    scale.set(1)

    // Persist
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: nx, y: ny })) } catch {}
  }

  const shadowX = () => clamp(vx.get() / 700, -8, 8)
  const shadowY = () => clamp(vy.get() / 700, -6, 10)
  const blur = () => 16 + Math.min(10, Math.abs(vx.get()) / 200)

  function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none bass-opacity">
      <motion.div
        aria-label="Floating sloth mascot — click & drag to move"
        role="img"
        style={{
          x: sx,
          y: sy,
          rotate: rot,
          scale,
          pointerEvents: "auto",
          touchAction: "none",
          filter: `drop-shadow(${shadowX()}px ${shadowY()}px ${blur()}px rgba(0,0,0,0.35))`,
          width: `${SIZE}px`,
          height: `${SIZE}px`,
        }}
        drag
        dragMomentum={false}
        dragElastic={0.15}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileHover={!prefersReduced ? { scale: 1.06 } : undefined}
        whileTap={!prefersReduced ? { scale: 0.96 } : undefined}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            opacity: glow,
            background: "radial-gradient(closest-side, rgba(34,197,94,0.65), rgba(34,197,94,0))",
            transform: "scale(1.35)",
          }}
          aria-hidden
        />

        <Image
          src="https://files.andreasmogensen.dk/floating_sloath_mascot.png"
          alt="Floating sloth mascot"
          fill
          sizes="(max-width: 768px) 64px, 128px"
          className="object-contain"
          priority
          draggable={false}
        />

        {/* Hint — shows until first drag */}
        {!hasDragged && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm text-green-300/70 font-mono pointer-events-none"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: [0, 1, 0], y: [2, 0, 0] }}
            transition={{ duration: 2.2, repeat: 3, ease: "easeInOut", delay: 0.3 }}
          >
            Click &amp; drag me!
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default SlothFloat