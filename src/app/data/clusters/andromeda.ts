// data/clusters/andromeda.ts
import type { StarSpec } from "../../components/stars/cluster"

export const andromeda: { stars: StarSpec[] } = {
  stars: [
    {
      x: 18,
      y: 28,
      size: 8,
      color: "#fff9e6",
      glowColor: "rgba(255,245,200,0.9)",
      title: "Aurora Gate",
      description: "A bright stellar waypoint used by early explorers.",
      infoPosition: "top",
      hoverScale: 1.7,
      flickerDuration: 1.8,
    },
    {
      x: 64,
      y: 50,
      size: 10,
      color: "#e0f2ff",
      glowColor: "rgba(180,225,255,0.95)",
      title: "Andromeda Node",
      description: "Relay beacon broadcasting telemetry every 88 minutes.",
      infoPosition: "right",
    },
    {
      x: 82,
      y: 22,
      size: 7,
      color: "#fbe8ff",
      glowColor: "rgba(255,210,255,0.9)",
      title: "Iceforge",
      description: "Formed near a cold nebula, rich in volatiles.",
      infoPosition: "left",
    },
  ],
} 