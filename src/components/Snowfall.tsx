"use client";
import { useEffect, useRef } from "react";

interface Flake {
  x: number; y: number;
  r: number; speed: number;
  opacity: number; phase: number;
}

export default function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const FLAKES = 70;
    const flakes: Flake[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < FLAKES; i++) {
      flakes.push({
        x:       Math.random() * window.innerWidth,
        y:       Math.random() * window.innerHeight,
        r:       Math.random() * 2.2 + 0.6,
        speed:   Math.random() * 0.55 + 0.18,
        opacity: Math.random() * 0.45 + 0.2,
        phase:   Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      for (const f of flakes) {
        f.y += f.speed;
        f.x += Math.sin(f.phase + t) * 0.28;
        if (f.y > canvas.height + 8) { f.y = -8; f.x = Math.random() * canvas.width; }
        if (f.x > canvas.width + 8)  f.x = -8;
        if (f.x < -8)                f.x = canvas.width + 8;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}

    />
  );
}
