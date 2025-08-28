"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type Props = {
  duration: number;
  currentTime: number;
  bufferedEnd?: number;
  onSeekStart?: () => void;
  onSeek?: (t: number) => void;     // live UI scrub only
  onSeekEnd?: (t: number) => void;  // commit here
  className?: string;
};

export default function SeekBar({
  duration,
  currentTime,
  bufferedEnd = 0,
  onSeekStart,
  onSeek,
  onSeekEnd,
  className,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [t, setT] = useState(currentTime);

  useEffect(() => { if (!dragging) setT(currentTime); }, [currentTime, dragging]);

  const pct = duration ? (t / duration) * 100 : 0;
  const bufPct = duration ? (bufferedEnd / duration) * 100 : 0;

  const posToTime = useCallback((clientX: number) => {
    const el = trackRef.current!;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    return (r.width ? x / r.width : 0) * duration;
  }, [duration]);

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    onSeekStart?.();
    setDragging(true);
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const nt = posToTime(x);
    setT(nt); onSeek?.(nt);
    e.preventDefault();
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (ev: PointerEvent | TouchEvent) => {
      const x = "touches" in ev ? ev.touches[0].clientX : (ev as PointerEvent).clientX;
      if (x == null) return;
      const nt = posToTime(x);
      setT(nt); onSeek?.(nt);
    };
    const up = () => { setDragging(false); onSeekEnd?.(t); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, t, onSeek, onSeekEnd, posToTime]);

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60), ss = Math.floor(s % 60).toString().padStart(2,"0");
    return `${m}:${ss}`;
  };

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onMouseDown={start}
        onTouchStart={start}
        role="slider" tabIndex={0}
        aria-valuemin={0} aria-valuemax={Math.floor(duration||0)} aria-valuenow={Math.floor(t||0)}
        className="relative h-3 w-full rounded-full bg-white/15 overflow-hidden group shadow-[inset_0_1px_2px_rgba(0,0,0,.25)]"
      >
        <div className="absolute left-0 top-0 h-full bg-white/20" style={{ width: `${bufPct}%` }} />
        <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5ee7df] to-[#b490ca]" style={{ width: `${pct}%` }} />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow-lg ring-2 ring-[#b490ca] cursor-pointer"
          initial={false}
          animate={{ left: `calc(${pct}% - 10px)` }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#b490ca]/15 blur opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${pct}% - 20px)` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-white/70">
        <span>{fmt(t)}</span><span>{fmt(duration)}</span>
      </div>
    </div>
  );
}
