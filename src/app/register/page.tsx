"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("@/components/Snowfall"), { ssr: false });
const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });

// SVG icon components — no emojis
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8"  y1="2" x2="8"  y2="6" strokeLinecap="round" />
    <line x1="3"  y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
);
const VideoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M15.6 11.6L22 7v10l-6.4-4.6v4.6H2V7h13.6v4.6z" />
  </svg>
);
const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EVENT_INFO = [
  { icon: <CalendarIcon />, value: "May 23, 2026" },
  { icon: <ClockIcon />,    value: "10:00 AM – 4:00 PM WAT" },
  { icon: <VideoIcon />,    value: "Google Meet" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ fullName: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "confetti" | "error">("idle");
  const [errorMsg, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res  = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed."); setStatus("error"); return; }
      setStatus("confetti"); // show celebration
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleConfettiDone = useCallback(() => {
    router.push("/register/success?name=" + encodeURIComponent(form.fullName));
  }, [router, form.fullName]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--creva-bg)", display: "flex", flexDirection: "column" }}>
      {/* Snowfall layer */}
      <Snowfall />

      {/* Confetti celebration overlay */}
      {status === "confetti" && <Confetti onDone={handleConfettiDone} />}

      {/* Top accent line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)", isolation: "isolate", position: "relative", zIndex: 1 }} />

      <div style={{
        flex: 1, isolation: "isolate", position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "3rem 1rem",
      }}>
        {/* Back */}
        <div className="fade-up" style={{ width: "100%", maxWidth: 440, marginBottom: "2rem" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            color: "var(--creva-gray-400)", fontSize: "0.85rem", textDecoration: "none",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--creva-gray-400)")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="fade-up fade-up-1 text-center" style={{ marginBottom: "2.25rem", maxWidth: 440 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)",
            borderRadius: "9999px", padding: "0.3rem 0.85rem",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.09em",
            textTransform: "uppercase", color: "var(--creva-purple-light)",
            marginBottom: "1.25rem",
          }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--creva-purple-mid)" }} />
            Free Event · Open Registration
          </div>
          <h1 style={{
            fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 800, lineHeight: 1.2,
            color: "#fff", margin: "0 0 0.75rem", fontFamily: "var(--font-bricolage)",
            display: "inline-block",
          }}>
            Start Smart
            {/* Curved SVG underline — S-curve for organic brushstroke feel */}
            <svg
              className="curved-underline"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 2 7 C 50 2 100 10 150 4 C 175 1 190 6 198 7"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <p style={{ color: "var(--creva-gray-400)", fontSize: "0.92rem", lineHeight: 1.65, margin: 0 }}>
            Syncing Academic Excellence with Tech Industry
          </p>
        </div>

        {/* Form card */}
        <div className="card-in" style={{
          width: "100%", maxWidth: 440,
          background: "rgba(18, 12, 40, 0.55)",

          border: "1px solid rgba(139,92,246,0.12)",
          borderRadius: "1rem",
          padding: "clamp(1.5rem, 5vw, 2.25rem)",
          marginBottom: "1.5rem",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.35)",
        }}>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "0.5rem",
              background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <UsersIcon />
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>Reserve Your Spot</p>
              <p style={{ color: "var(--creva-gray-400)", fontSize: "0.8rem", margin: 0 }}>Confirmation email sent instantly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label className="reg-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName" type="text" className="reg-input"
                placeholder="e.g. Amara Johnson"
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                required disabled={status === "loading" || status === "confetti"}
              />
            </div>
            <div>
              <label className="reg-label" htmlFor="email">Email Address</label>
              <input
                id="email" type="email" className="reg-input"
                placeholder="e.g. amara@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required disabled={status === "loading" || status === "confetti"}
              />
            </div>

            {status === "error" && (
              <div className="reg-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMsg}
              </div>
            )}

            <button
              id="register-submit" type="submit"
              disabled={status === "loading" || status === "confetti"}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "var(--creva-purple-mid)", color: "#fff",
                border: "none", borderRadius: "0.5rem",
                padding: "0.8rem 1.5rem", fontWeight: 600, fontSize: "0.9rem",
                cursor: status === "loading" || status === "confetti" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "background 0.15s",
                marginTop: "0.25rem",
              }}
              onMouseEnter={e => { if (status === "idle" || status === "error") e.currentTarget.style.background = "var(--creva-purple)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--creva-purple-mid)"; }}
            >
              {status === "loading" ? (
                <><span className="reg-spinner" /> Registering…</>
              ) : (
                <>
                  Register Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Event pills */}
        <div className="fade-up fade-up-4" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {EVENT_INFO.map((d, i) => (
            <span key={i} className="ev-pill" style={{ color: "var(--creva-gray-400)" }}>
              {d.icon}&nbsp;{d.value}
            </span>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.12), transparent)", position: "relative", zIndex: 3 }} />
    </main>
  );
}
