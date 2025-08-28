// components/InteractiveStar.tsx
"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type InfoPos = "right" | "left" | "top" | "bottom"

type InteractiveStarProps = {
  x: number // vw
  y: number // vh
  size?: number
  color?: string
  glowColor?: string
  title?: string
  description?: string
  infoPosition?: InfoPos
  hoverScale?: number
  flickerDuration?: number
}

const InteractiveStar: React.FC<InteractiveStarProps> = ({
  x,
  y,
  size = 6,
  color = "#ffffff",
  glowColor = "rgba(255,255,255,0.85)",
  title,
  description,
  infoPosition = "right",
  hoverScale = 1.6,
  flickerDuration = 2.2,
}) => {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const starRef = useRef<HTMLSpanElement | null>(null)
  const popRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (popRef.current?.contains(t) || starRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Auto-flip rule: if star is >80vw, force info box to left
  const effectivePosition: InfoPos =
    x > 80 && (infoPosition === "right" || infoPosition === "left")
      ? "left"
      : infoPosition

  // Info box offset
  const offset = 16
  const popStyle: React.CSSProperties =
    effectivePosition === "right"
      ? { top: 0, left: offset }
      : effectivePosition === "left"
      ? { top: 0, right: offset }
      : effectivePosition === "top"
      ? { bottom: offset, left: 0 }
      : { top: offset, left: 0 } // bottom

  return (
    <div
      className="absolute"
      style={{
        top: `${y}vh`,
        left: `${x}vw`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Star */}
      <motion.span
        ref={starRef}
        role="button"
        aria-label={title ?? "Star"}
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
        className="block rounded-full cursor-pointer outline-none"
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: `0 0 ${Math.max(6, size * 3)}px ${glowColor}`,
        }}
        initial={{ scale: 1, opacity: 0.85 }}
        animate={{
          opacity: hover ? [0.6, 1, 0.5, 1, 0.7] : [0.6, 0.85, 0.65],
          scale: hover ? hoverScale : 1,
        }}
        transition={{
          duration: hover ? flickerDuration * 0.6 : flickerDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Info box */}
      {open && (
        <motion.div
          ref={popRef}
          className="absolute min-w-[16rem] max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 text-white shadow-xl cursor-default"
          style={popStyle}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          transition={{ duration: 0.18 }}
        >
          {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm leading-relaxed text-white/80">{description}</p>}
        </motion.div>
      )}
    </div>
  )
}

export default InteractiveStar
