// data/backgrounds/minimal.ts
import type { BackgroundSpaceConfig } from "../../components/index/backgroundSpace"

export const minimalBackground: BackgroundSpaceConfig = {
  stars: [
    { count: 60, sizeRange: [1, 2], opacity: 0.4, duration: 20, seed: 123 },
    { count: 30, sizeRange: [2, 3], opacity: 0.6, duration: 15, seed: 456 },
  ],
  blobs: [
    {
      position: { top: "20%", left: "20%" },
      size: { width: "16rem", height: "16rem" },
      colors: {
        primary: "rgba(156,163,175,0.15)",
        secondary: "rgba(156,163,175,0.08)",
        opacity: 0.15
      },
      animation: {
        scale: [1, 1.1, 1],
        duration: 25
      }
    },
    {
      position: { bottom: "30%", right: "25%" },
      size: { width: "20rem", height: "20rem" },
      colors: {
        primary: "rgba(107,114,128,0.12)",
        secondary: "rgba(107,114,128,0.06)",
        opacity: 0.12
      },
      animation: {
        scale: [1, 1.05, 1],
        duration: 30
      }
    }
  ],
  vignette: {
    enabled: false
  }
} 