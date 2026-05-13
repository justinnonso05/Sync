"use client";
import { useEffect, useRef, useState } from "react";

interface Piece {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  w: number; h: number;
  color: string; opacity: number;
}

const COLORS = [
  "#7c3aed","#a78bfa","#c4b5fd","#ffffff",
  "#ddd6fe","#8b5cf6","#e0e7ff","#6d28d9",
  "#ede9fe","#f5f3ff",
];

export default function Confetti({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: Piece[] = [];
    const COUNT = 140;

    // Burst from several points near top center for a ribbon-shower feel
    const origins = [
      { x: canvas.width * 0.35, y: canvas.height * 0.3 },
      { x: canvas.width * 0.5,  y: canvas.height * 0.2 },
      { x: canvas.width * 0.65, y: canvas.height * 0.3 },
    ];

    for (let i = 0; i < COUNT; i++) {
      const o = origins[i % origins.length];
      const angle  = Math.random() * Math.PI * 2;
      const speed  = Math.random() * 9 + 2;
      pieces.push({
        x: o.x + (Math.random() - 0.5) * 40,
        y: o.y + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 6,
        rot:  Math.random() * 360,
        rotV: (Math.random() - 0.5) * 10,
        w: Math.random() * 14 + 4,
        h: Math.random() * 5  + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
      });
    }

    let animId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      let alive = false;

      for (const p of pieces) {
        p.vy  += 0.18;
        p.vx  *= 0.992;
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.rotV;
        if (frame > 55) p.opacity = Math.max(0, p.opacity - 0.022);
        if (p.opacity > 0.01) alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // Draw ribbon shape
        const rx = p.w / 2, ry = p.h / 2;
        ctx.beginPath();
        ctx.moveTo(-rx, -ry);
        ctx.lineTo(rx, -ry);
        ctx.lineTo(rx * 0.7, 0);
        ctx.lineTo(rx, ry);
        ctx.lineTo(-rx, ry);
        ctx.lineTo(-rx * 0.7, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (!alive || frame > 180) {
        cancelAnimationFrame(animId);
        setVisible(false);
        onDone();
        return;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  if (!visible) return null;

  return (
    <>
      {/* Darkened overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "rgba(7,7,9,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeOverlay 0.3s ease both",
      }}>
        {/* Center card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: "1.25rem",
          padding: "2.5rem 3rem",
          textAlign: "center",
          position: "relative", zIndex: 92,
        }}>
          {/* Animated checkmark */}
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ display: "block", margin: "0 auto 1.25rem" }}>
            <circle cx="28" cy="28" r="27" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
            <path
              d="M16 28l9 9 15-16"
              stroke="#a78bfa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 0,
                animation: "drawCheck 0.45s 0.1s ease-out both",
              }}
            />
          </svg>
          <p style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.3rem",
            fontFamily: "var(--font-bricolage)",
            margin: "0 0 0.4rem",
          }}>
            You&apos;re Registered!
          </p>
          <p style={{ color: "var(--creva-gray-400)", fontSize: "0.875rem", margin: 0 }}>
            Redirecting to your confirmation…
          </p>
        </div>
      </div>

      {/* Ribbon canvas on top */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 95 }}
      />
    </>
  );
}
