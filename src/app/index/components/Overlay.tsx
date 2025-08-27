"use client";
import { usePlayerStore } from "@/app/state/playerStore";
import { useEffect, useRef } from "react";

export default function Overlay() {
  const stemLevels = usePlayerStore((s) => s.stemLevels);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    blobRefs.current = Object.entries(stemLevels).map(([name, _], i) => {
      const el = document.createElement("div");
      el.className = "absolute rounded-full mix-blend-screen pointer-events-none";
      el.style.background = `radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)`;
      containerRef.current!.appendChild(el);
      return el;
    });
  }, []);

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      const w = window.innerWidth;
      const h = window.innerHeight;
      Object.entries(stemLevels).forEach(([name, val], i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const size = 150 + 400 * (val || 0); // scale with RMS
        const cx = w * 0.5 + Math.sin(performance.now()/1000 + i) * 200;
        const cy = h * 0.5 + Math.cos(performance.now()/1200 + i*2) * 200;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.transform = `translate(${cx - size/2}px, ${cy - size/2}px)`;
        el.style.opacity = String(0.3 + (val || 0) * 0.7);
      });
    };
    animate();
  }, [stemLevels]);

  return <div ref={containerRef} className="fixed inset-0 z-[2147483647] pointer-events-none" />;
}
