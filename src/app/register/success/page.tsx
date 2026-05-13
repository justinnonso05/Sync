"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("@/components/Snowfall"), { ssr: false });

const gcalUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Start+Smart%3A+Syncing+Academic+Excellence+with+Tech+Industry" +
  "&dates=20260523T090000Z%2F20260523T150000Z" +
  "&details=Join+us+for+an+inspiring+day+where+academic+excellence+meets+the+tech+industry." +
  "&location=Google+Meet";

const EVENT_ROWS = [
  {
    label: "Date", value: "May 23, 2026",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--creva-purple-light)" strokeWidth="1.75">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Time", value: "10:00 AM – 4:00 PM WAT",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--creva-purple-light)" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Location", value: "Google Meet",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--creva-purple-light)" strokeWidth="1.75">
        <path d="M15.6 11.6L22 7v10l-6.4-4.6v4.6H2V7h13.6v4.6z" />
      </svg>
    ),
  },
];

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get("name") || "there";
  const firstName = name.split(" ")[0];

  return (
    <main style={{ minHeight: "100vh", background: "var(--creva-bg)", display: "flex", flexDirection: "column" }}>
      <Snowfall />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)", position: "relative", zIndex: 1 }} />

      <div style={{
        flex: 1, isolation: "isolate", position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "3rem 1rem", textAlign: "center",
      }}>
        {/* Draw-check circle */}
        <div className="scale-in" style={{ marginBottom: "2rem" }}>
          <svg width="76" height="76" viewBox="0 0 76 76" fill="none">
            <circle cx="38" cy="38" r="37" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
            <circle cx="38" cy="38" r="29" stroke="rgba(139,92,246,0.08)" strokeWidth="0.75" />
            <path
              className="check-draw"
              d="M23 38l11 11 19-22"
              stroke="var(--creva-purple-mid)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Badge */}
        <div className="fade-up" style={{ marginBottom: "1rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)",
            borderRadius: "9999px", padding: "0.3rem 0.85rem",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.09em",
            textTransform: "uppercase", color: "#86efac",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Registration Confirmed
          </span>
        </div>

        <h1 className="fade-up fade-up-1" style={{
          fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, color: "#fff",
          margin: "0 0 0.75rem", fontFamily: "var(--font-bricolage)", maxWidth: 380,
        }}>
          You&apos;re in, {firstName}!
        </h1>

        <p className="fade-up fade-up-2" style={{
          color: "var(--creva-gray-400)", fontSize: "0.9rem", lineHeight: 1.7,
          maxWidth: 360, margin: "0 auto 2.5rem",
        }}>
          A confirmation email with event details and an .ics calendar file is on its way to your inbox.
        </p>

        {/* Action buttons */}
        <div className="fade-up fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          <a
            href={gcalUrl} target="_blank" rel="noreferrer" id="add-to-calendar"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--creva-purple-mid)", color: "#fff",
              padding: "0.75rem 1.35rem", borderRadius: "0.5rem",
              fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--creva-purple)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--creva-purple-mid)")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Calendar
          </a>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--creva-gray-400)", padding: "0.75rem 1.35rem",
            borderRadius: "0.5rem", fontWeight: 500, fontSize: "0.875rem", textDecoration: "none",
            transition: "border-color 0.15s, color 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--creva-gray-400)"; }}
          >
            Back to Home
          </Link>
        </div>

        {/* Event detail card */}
        <div className="fade-up fade-up-4" style={{
          width: "100%", maxWidth: 360,
          background: "rgba(18, 12, 40, 0.55)",

          border: "1px solid rgba(139,92,246,0.12)",
          borderRadius: "0.75rem", overflow: "hidden",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.35)",
        }}>

          <div style={{ padding: "0.7rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
            <p style={{ color: "var(--creva-gray-400)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", margin: 0 }}>
              Event Details
            </p>
          </div>
          {EVENT_ROWS.map((d, i) => (
            <div key={d.label} style={{
              display: "flex", alignItems: "center", gap: "0.85rem",
              padding: "0.9rem 1.25rem",
              borderBottom: i < EVENT_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{ flexShrink: 0 }}>{d.icon}</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ color: "var(--creva-gray-400)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 2px" }}>{d.label}</p>
                <p style={{ color: "#e5e7eb", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>;
}
