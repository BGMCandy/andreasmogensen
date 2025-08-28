"use client";

import { useEffect, useRef, useState } from "react";
import SeekBar from "./SeekBar";
import StemVisualizer from "./StemVisualizer";
import { usePlayerStore } from "@/app/state/playerStore";

type LogLine = { t: number; msg: string };

export default function MasterPlayer() {
  const masterRef = useRef<HTMLAudioElement | null>(null);
  const stemsRef = useRef<HTMLAudioElement[]>([]);
  const [duration, setDuration]  = useState(0);
  const [time, setTime]          = useState(0);
  const [bufferedEnd, setBuffer] = useState(0);
  const [playing, setPlaying]    = useState(false);
  const [ready, setReady]        = useState(false);
  const [stemsReady, setStemsReady] = useState(false);
  // const [logs, setLogs] = useState<LogLine[]>([]);
  const log = (m: string) => {
    console.log(`[Audio] ${m}`);
  };

  // ---- write to global store (only when values change)
  const setStore = usePlayerStore((s) => s.set);
  useEffect(() => { setStore({ duration }); },   [duration, setStore]);
  useEffect(() => { setStore({ currentTime: time }); }, [time, setStore]);
  useEffect(() => { setStore({ isPlaying: playing }); }, [playing, setStore]);

  // ---- FIRST click = user gesture to allow audio
  useEffect(() => {
    const h = () => {
      const a = masterRef.current;
      if (a) a.load(); // ensure it’s initialised
      log("👆 user gesture received; audio unlocked");
    };
    window.addEventListener("pointerdown", h, { once: true });
    return () => window.removeEventListener("pointerdown", h);
  }, []);

  // ---- init master listeners
  useEffect(() => {
    const a = masterRef.current;
    if (!a) return;

    const onLoaded = () => {
      setDuration(a.duration || 0);
      setReady(true);
      log(`ℹ️ loadedmetadata duration=${a.duration?.toFixed(2)}`);
    };
    const onCanPlay = () => log("✅ canplay");
    const onCanPlayThrough = () => log("✅ canplaythrough");
    const onTime = () => {
      setTime(a.currentTime || 0);
      try {
        const b = a.buffered;
        if (b && b.length) setBuffer(b.end(b.length - 1));
      } catch {}
    };
    const onPlay  = () => { setPlaying(true); log("▶️ play"); };
    const onPause = () => { setPlaying(false); log("⏸️ pause"); };
    const onSeeked = () => log(`⤴️ seeked -> ${a.currentTime.toFixed(2)}s`);
    const onError = () => log(`❌ audio error (network or path?)`);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("canplay", onCanPlay);
    a.addEventListener("canplaythrough", onCanPlayThrough);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("seeked", onSeeked);
    a.addEventListener("error", onError);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("canplay", onCanPlay);
      a.removeEventListener("canplaythrough", onCanPlayThrough);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("seeked", onSeeked);
      a.removeEventListener("error", onError);
    };
  }, []);

  // ---- init stems AFTER master is ready (prevents stalls)
  useEffect(() => {
    if (!ready) return;
    const urls = ["/kicks.mp3", "/snares.mp3", "/basses.mp3", "/instruments.mp3"];
    stemsRef.current = urls.map((u) => {
      const a = new Audio(u);
      a.preload = "auto";
      a.crossOrigin = "anonymous"; // safe on same-origin
      a.muted = true; // analysis only
      a.addEventListener("error", () => log(`❌ stem error: ${u}`));
      return a;
    });
    setStemsReady(true);
    log("🎚️ stems initialised");
    return () => stemsRef.current.forEach((a) => a.pause());
  }, [ready]);

  // ---- keep stems in lockstep with master (play/pause + periodic drift fix)
  useEffect(() => {
    if (!stemsReady) return;
    stemsRef.current.forEach((s) => {
      if (playing && s.readyState >= 2 && s.paused) s.play().catch(() => {});
      if (!playing && !s.paused) s.pause();
    });
  }, [playing, stemsReady]);

  useEffect(() => {
    if (!stemsReady) return;
    const a = masterRef.current;
    if (!a) return;
    const tick = setInterval(() => resyncStems(a, stemsRef.current), 500);
    return () => clearInterval(tick);
  }, [stemsReady]);

  const togglePlay = async () => {
    const a = masterRef.current;
    if (!a) return;
    if (a.paused) {
      try { await a.play(); } catch { log("⚠️ play() blocked"); }
    } else {
      a.pause();
    }
  };

  const onSeekStart = () => { /* pause analyser loops if needed */ };
  const onSeek      = (t: number) => setTime(t); // UI scrub only
  const onSeekEnd   = async (t: number) => {
    const a = masterRef.current;
    if (!a) return;
    const wasPlaying = !a.paused;

    // Try fastSeek, else set currentTime
    if (typeof a.fastSeek === "function") a.fastSeek(t);
    else a.currentTime = t;

    // Snap stems to same time
    stemsRef.current.forEach((s) => {
      if (s.readyState >= 2) s.currentTime = t;
    });

    // Some browsers pause on seek — resume
    if (wasPlaying && a.paused) {
      try { await a.play(); log("▶️ resumed after seek"); } catch {}
      stemsRef.current.forEach((s) => {
        if (s.readyState >= 2 && s.paused) s.play().catch(() => {});
      });
    }
  };

  return (
    <div className="rounded-3xl p-6 backdrop-blur bg-white/6 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
      {/* Hidden master audio */}
      <audio
        ref={masterRef}
        src="/master.mp3"
        preload="auto"
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Controls */}
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

      {/* Visual-only stems */}
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
  const DRIFT = 0.05; // 50ms
  const t = master.currentTime;
  for (const s of stems) {
    if (s.readyState < 2) continue;
    const dt = Math.abs(s.currentTime - t);
    if (dt > DRIFT) s.currentTime = t;
  }
}
