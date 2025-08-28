// data/backgrounds/andromeda.ts
import type { BackgroundSpaceConfig } from "../../components/index/backgroundSpace"

export const andromedaBackground: BackgroundSpaceConfig = {
  stars: [
    { count: 140, sizeRange: [1, 2], opacity: 0.55, duration: 14, seed: 11 },
    { count: 90, sizeRange: [1, 2.5], opacity: 0.75, duration: 10, seed: 22 },
    { count: 60, sizeRange: [2, 3], opacity: 0.9, duration: 8, seed: 33 },
  ],
  blobs: [
    {
      position: { top: "-10rem", left: "-10rem" },
      size: { width: "34rem", height: "34rem" },
      colors: {
        primary: "rgba(168,85,247,0.25)",
        secondary: "rgba(168,85,247,0.15)",
        opacity: 0.25
      },
      animation: {
        x: [0, 30, 0],
        y: [0, 40, 0],
        duration: 20
      }
    },
    {
      position: { bottom: "-12rem", right: "-12rem" },
      size: { width: "36rem", height: "36rem" },
      colors: {
        primary: "rgba(236,72,153,0.25)",
        secondary: "rgba(236,72,153,0.15)",
        opacity: 0.25
      },
      animation: {
        x: [0, -25, 0],
        y: [0, -35, 0],
        duration: 22
      }
    },
    {
      position: { top: "50%", left: "50%" },
      size: { width: "28rem", height: "28rem" },
      colors: {
        primary: "rgba(59,130,246,0.18)",
        secondary: "rgba(59,130,246,0.10)",
        opacity: 0.18
      },
      animation: {
        scale: [1, 1.15, 1],
        duration: 14
      }
    },
    {
      position: { top: "-6rem", right: "25%" },
      size: { width: "20rem", height: "20rem" },
      colors: {
        primary: "rgba(56,189,248,0.22)",
        secondary: "rgba(56,189,248,0.12)",
        opacity: 0.22
      },
      animation: {
        x: [0, 20, 0],
        y: [0, 15, 0],
        duration: 18
      }
    },
    {
      position: { top: "33%", left: "-5rem" },
      size: { width: "18rem", height: "18rem" },
      colors: {
        primary: "rgba(244,63,94,0.22)",
        secondary: "rgba(244,63,94,0.12)",
        opacity: 0.22
      },
      animation: {
        x: [0, 18, 0],
        y: [0, -12, 0],
        duration: 16
      }
    }
  ],
  vignette: {
    enabled: true,
    position: "50% 60%",
    intensity: 0.25
  }
} 