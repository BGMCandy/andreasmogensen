"use client";
import { create } from "zustand";

type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  stemLevels: Record<string, number>;  // e.g. { kicks: 0.2, snares: 0.5 }
  set: (s: Partial<PlayerState>) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  stemLevels: {},
  set: (s) => set(s),
}));
