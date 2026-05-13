"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("@/components/Snowfall"), { ssr: false });

const SPEAKERS = [
  { name: "Olowu Seun", role: "Top Framer Developer" },
  { name: "Alikah Joseph", role: "Ex P.E Intern at Meta" },
  { name: "Tosin (Ruby)", role: "Host" },
];

const META = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    text: "May 23, 2026",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
      </svg>
    ),
    text: "10:00 AM – 4:00 PM WAT",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "Lagos, Nigeria",
  },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--creva-bg)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Snowfall />

      {/* Top accent */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)", position: "relative", zIndex: 1 }} />

      {/* Nav */}
      <nav style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 1.75rem", maxWidth: 1180, margin: "0 auto", width: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "0.4rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--creva-purple-light)" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", fontFamily: "var(--font-bricolage)" }}>Start Smart</span>
        </div>
        <Link href="/register" style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          background: "var(--creva-purple-mid)", color: "#fff",
          padding: "0.5rem 1.1rem", borderRadius: "0.45rem",
          fontWeight: 600, fontSize: "0.82rem", textDecoration: "none",
          transition: "background 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--creva-purple)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--creva-purple-mid)")}
        >
          Register
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1, position: "relative", zIndex: 2,
        display: "flex", alignItems: "center",
        maxWidth: 1180, margin: "0 auto", width: "100%",
        padding: "clamp(2rem, 6vw, 4rem) 1.75rem",
        gap: "3rem",
      }}>

        {/* ── LEFT: Text content ── */}
        <div style={{ flex: "0 0 auto", maxWidth: 520 }}>
          {/* Event badge */}
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)",
            borderRadius: "9999px", padding: "0.3rem 0.9rem",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--creva-purple-light)",
            marginBottom: "1.5rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--creva-purple-mid)", flexShrink: 0 }} />
            Free Event · May 23, 2026
          </div>

          {/* Title */}
          <h1 className="fade-up fade-up-1" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 800, lineHeight: 1.1,
            color: "#fff", margin: "0 0 0.2rem",
            fontFamily: "var(--font-bricolage)",
          }}>
            Start Smart
          </h1>

          {/* Curved underline on "Start Smart" */}
          <svg
            className="curved-underline fade-up fade-up-1"
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ marginBottom: "0.6rem" }}
          >
            <path
              d="M 2 7 C 50 2 100 10 150 4 C 175 1 190 6 198 7"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <p className="fade-up fade-up-1" style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 500, color: "var(--creva-gray-400)",
            margin: "0 0 1.5rem", lineHeight: 1.4,
          }}>
            Syncing Academic Excellence<br />with Industry Mastery
          </p>

          {/* Tagline */}
          <p className="fade-up fade-up-2" style={{
            fontSize: "0.95rem", color: "rgba(156, 163, 175, 0.85)",
            lineHeight: 1.7, maxWidth: 440, margin: "0 0 2rem",
          }}>
            Stop guessing. Gain the blueprint to integrate industry skills into your student life and outpace the curriculum.
          </p>

          {/* Meta info */}
          <div className="fade-up fade-up-2" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.25rem" }}>
            {META.map((m, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "9999px", padding: "0.3rem 0.8rem",
                fontSize: "0.78rem", color: "var(--creva-gray-400)",
              }}>
                {m.icon} {m.text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <Link href="/register" id="hero-register-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--creva-purple-mid)", color: "#fff",
              padding: "0.85rem 1.75rem", borderRadius: "0.55rem",
              fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
              transition: "background 0.15s, transform 0.12s",
              letterSpacing: "0.01em",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--creva-purple)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--creva-purple-mid)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Register Now
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Download flier (visible on mobile; also on desktop as secondary) */}
            <a href="/sync.png" download="StartSmart-Flier.png" id="download-flier-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem",
              background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--creva-gray-400)", padding: "0.85rem 1.4rem",
              borderRadius: "0.55rem", fontWeight: 500, fontSize: "0.875rem",
              textDecoration: "none", transition: "border-color 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--creva-gray-400)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Flier
            </a>
          </div>

          {/* Speakers strip */}
          <div className="fade-up fade-up-4" style={{ marginTop: "2.25rem" }}>
            <p style={{ color: "var(--creva-gray-600)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              Featured Speakers
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SPEAKERS.map(s => (
                <div key={s.name} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.45rem", padding: "0.45rem 0.75rem",
                }}>
                  <p style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "0.8rem", margin: 0 }}>{s.name}</p>
                  <p style={{ color: "var(--creva-purple-light)", fontSize: "0.7rem", margin: 0 }}>{s.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Flier — desktop only ── */}
        <div className="flier-wrapper fade-up fade-up-2" aria-hidden="true">
          {/* Decorative grid lines behind flier */}
          <div className="flier-deco" />

          {/* Corner accent dots */}
          <div style={{ position: "absolute", top: -16, right: -16, width: 48, height: 48, opacity: 0.18 }}>
            <svg viewBox="0 0 48 48" fill="none">
              {[0,12,24,36].map(x => [0,12,24,36].map(y => (
                <circle key={`${x}-${y}`} cx={x+6} cy={y+6} r="2" fill="#a78bfa" />
              )))}
            </svg>
          </div>
          <div style={{ position: "absolute", bottom: -16, left: -16, width: 48, height: 48, opacity: 0.18 }}>
            <svg viewBox="0 0 48 48" fill="none">
              {[0,12,24,36].map(x => [0,12,24,36].map(y => (
                <circle key={`${x}-${y}`} cx={x+6} cy={y+6} r="2" fill="#a78bfa" />
              )))}
            </svg>
          </div>

          {/* Thin border frame (slightly offset for depth) */}
          <div style={{
            position: "absolute", inset: 0,
            transform: "rotate(2.5deg) scale(1.015)",
            border: "1px solid rgba(139,92,246,0.18)",
            borderRadius: "1rem",
            pointerEvents: "none",
          }} />

          {/* Flier image */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Image
              src="/sync.png"
              alt="Start Smart Event Flier"
              width={520}
              height={370}
              priority
              style={{
                width: "100%", height: "auto",
                borderRadius: "0.85rem",
                display: "block",
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.55))",
              }}
            />
          </div>
        </div>

      </section>

      {/* Bottom rule */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.12), transparent)", position: "relative", zIndex: 2 }} />
    </main>
  );
}
