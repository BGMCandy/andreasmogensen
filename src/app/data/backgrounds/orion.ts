// data/backgrounds/orion.ts
import type { BackgroundSpaceConfig } from "../../components/index/backgroundSpace"

export const orionBackground: BackgroundSpaceConfig = {
  stars: [
    { count: 200, sizeRange: [0.5, 1.5], opacity: 0.7, duration: 16, seed: 42 },
    { count: 120, sizeRange: [1.5, 2.5], opacity: 0.85, duration: 12, seed: 73 },
    { count: 80, sizeRange: [2.5, 4], opacity: 1, duration: 10, seed: 99 },
  ],
  blobs: [
    {
      position: { top: "-8rem", left: "10%" },
      size: { width: "32rem", height: "32rem" },
      colors: {
        primary: "rgba(34,197,94,0.3)",
        secondary: "rgba(34,197,94,0.15)",
        opacity: 0.3
      },
      animation: {
        x: [0, 25, 0],
        y: [0, 30, 0],
        duration: 18
      }
    },
    {
      position: { bottom: "-10rem", right: "15%" },
      size: { width: "28rem", height: "28rem" },
      colors: {
        primary: "rgba(251,146,60,0.28)",
        secondary: "rgba(251,146,60,0.14)",
        opacity: 0.28
      },
      animation: {
        x: [0, -20, 0],
        y: [0, -25, 0],
        duration: 20
      }
    },
    {
      position: { top: "60%", left: "60%" },
      size: { width: "24rem", height: "24rem" },
      colors: {
        primary: "rgba(139,92,246,0.2)",
        secondary: "rgba(139,92,246,0.1)",
        opacity: 0.2
      },
      animation: {
        scale: [1, 1.2, 1],
        duration: 15
      }
    }
  ],
  vignette: {
    enabled: true,
    position: "40% 70%",
    intensity: 0.3
  }
} 