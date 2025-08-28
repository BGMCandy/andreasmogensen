// components/Cluster.tsx
"use client"

import React from "react"
import InteractiveStar from "./stars"

export type InfoPos = "right" | "left" | "top" | "bottom"

export type StarSpec = {
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

export type ClusterProps = {
  stars: StarSpec[]
  offsetXvw?: number
  offsetYvh?: number
  className?: string
}

const Cluster: React.FC<ClusterProps> = ({
  stars,
  offsetXvw = 0,
  offsetYvh = 0,
  className = "absolute w-full h-[80vh]",
}) => {
  return (
    <div className={`${className}`}>
      {stars.map((s, i) => (
        <InteractiveStar
          key={i}
          x={s.x + offsetXvw}
          y={s.y + offsetYvh}
          size={s.size}
          color={s.color}
          glowColor={s.glowColor}
          title={s.title}
          description={s.description}
          infoPosition={s.infoPosition}
          hoverScale={s.hoverScale}
          flickerDuration={s.flickerDuration}
        />
      ))}
    </div>
  )
}

export default Cluster
