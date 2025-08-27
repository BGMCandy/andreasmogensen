"use client";

import { usePlayerStore } from "@/app/state/playerStore";

export default function StoreDebug() {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-[10000]">
      <div>Playing: {isPlaying ? "✅" : "❌"}</div>
      <div>Time: {currentTime.toFixed(2)}s</div>
      <div>Duration: {duration.toFixed(2)}s</div>
    </div>
  );
}
