"use client";

import { useEffect, useRef, useState } from "react";
import SeekBar from "./SeekBar"; // from earlier message
import StemVisualizer from "./StemVisualizer";

export default function MasterPlayer() {
  const masterRef = useRef<HTMLAudioElement | null>(null);
  const stemsRef = useRef<HTMLAudioElement[]>([]);
  const [duration, setDuration]   = useState(0);
  const [time, setTime]           = useState(0);
  const [bufferedEnd, setBuffer]  = useState(0);
  const [playing, setPlaying]     = useState(false);
  const [ready, setReady]         = useState(false);

  // init stems (silent followers)
  useEffect(() => {
    const urls = ["/kicks.mp3", "/snares.mp3", "/basses.mp3", "/instruments.mp3"];
    stemsRef.current = urls.map(u => {
      const a = new Audio(u);
      a.preload = "auto";
      a.muted = true;                 // analysis only
      a.crossOrigin = "anonymous";
      return a;
    });
    return () => stemsRef.current.forEach(a => a.pause());
  }, []);

  // master listeners
  useEffect(() => {
    const a = masterRef.current!;
    const onLoaded = () => { setDuration(a.duration || 0); setReady(true); };
    const onTime   = () => {
      setTime(a.currentTime || 0);
      const b = a.buffered; if (b?.length) setBuffer(b.end(b.length-1));
      resyncStems(a, stemsRef.current);
    };
    const onPlay   = () => setPlaying(true);
    const onPause  = () => setPlaying(false);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    const tick = setInterval(() => resyncStems(a, stemsRef.current), 500);
    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      clearInterval(tick);
    };
  }, []);

  // mirror play/pause to stems
  useEffect(() => {
    stemsRef.current.forEach(s => {
      if (playing && s.readyState >= 2 && s.paused) s.play().catch(()=>{});
      if (!playing && !s.paused) s.pause();
    });
  }, [playing]);

  const togglePlay = async () => {
    const a = masterRef.current!;
    if (a.paused) { try { await a.play(); } catch {} } else { a.pause(); }
  };

  const onSeekStart = () => {/* optional: pause analyser loops */};
  const onSeek = (t: number) => setTime(t); // UI scrub only
  const onSeekEnd = async (t: number) => {
    const a = masterRef.current!;
    const wasPlaying = !a.paused;
    // @ts-ignore
    if (typeof a.fastSeek === "function") a.fastSeek(t); else a.currentTime = t;
    stemsRef.current.forEach(s => { if (s.readyState >= 2) s.currentTime = t; });
    if (wasPlaying && a.paused) { try { await a.play(); } catch {} }
  };

  return (
    <div className="rounded-3xl p-6 backdrop-blur bg-white/6 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
      {/* Hidden master audio (no native controls) */}
      <audio ref={masterRef} src="/master.mp3" preload="auto" className="hidden" />

      {/* Custom controls row */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={!ready}
          aria-label={playing ? "Pause" : "Play"}
          className="h-12 w-12 grid place-items-center rounded-full bg-white text-black
                     shadow-lg hover:scale-105 active:scale-95 transition"
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <div className="flex-1">
          <SeekBar
            duration={duration}
            currentTime={time}
            bufferedEnd={bufferedEnd}
            onSeekStart={onSeekStart}
            onSeek={onSeek}
            onSeekEnd={onSeekEnd}
          />
        </div>
      </div>

      {/* Stems — visual only */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <StemVisualizer label="Kicks"        file="/kicks.mp3"        isPlaying={playing} currentTime={time} color="#ff4d4d" />
        <StemVisualizer label="Snares"       file="/snares.mp3"       isPlaying={playing} currentTime={time} color="#7aa2ff" />
        <StemVisualizer label="Basses"       file="/basses.mp3"       isPlaying={playing} currentTime={time} color="#5ee7df" />
        <StemVisualizer label="Instruments"  file="/instruments.mp3"  isPlaying={playing} currentTime={time} color="#ffd633" />
      </div>
    </div>
  );
}

function resyncStems(master: HTMLAudioElement, stems: HTMLAudioElement[]) {
  const DRIFT = 0.05; // 50 ms
  const t = master.currentTime;
  for (const s of stems) {
    if (s.readyState < 2) continue;
    const dt = Math.abs(s.currentTime - t);
    if (dt > DRIFT) s.currentTime = t;
  }
}
