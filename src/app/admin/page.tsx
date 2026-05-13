"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("@/components/Snowfall"), { ssr: false });

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed."); setStatus("error"); return; }
      router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--creva-bg)", display: "flex", flexDirection: "column" }}>
      <Snowfall />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)", position: "relative", zIndex: 1 }} />

      <div style={{
        flex: 1, isolation: "isolate", position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "2rem 1rem",
      }}>
        {/* Logo mark */}
        <div className="fade-up" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "0.75rem",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.85rem",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--creva-purple-light)" strokeWidth="1.75">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ color: "var(--creva-gray-400)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="card-in" style={{
          width: "100%", maxWidth: 400,
          background: "rgba(18, 12, 40, 0.55)",

          border: "1px solid rgba(139,92,246,0.12)",
          borderRadius: "1rem",
          padding: "clamp(1.5rem, 5vw, 2rem)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.35)",
        }}>

          <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 0.3rem", fontFamily: "var(--font-bricolage)" }}>
            Sign In
          </h1>
          <p style={{ color: "var(--creva-gray-400)", fontSize: "0.83rem", margin: "0 0 1.75rem" }}>
            Start Smart Event Dashboard
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="reg-label" htmlFor="admin-email">Email</label>
              <input
                id="admin-email" type="email" className="reg-input"
                placeholder="admin@justinch.dev"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="reg-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password" type="password" className="reg-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required disabled={status === "loading"}
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
              id="admin-login-btn" type="submit"
              disabled={status === "loading"}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "var(--creva-purple-mid)", color: "#fff",
                border: "none", borderRadius: "0.5rem",
                padding: "0.8rem 1.5rem", fontWeight: 600, fontSize: "0.9rem",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "background 0.15s",
                marginTop: "0.25rem",
              }}
              onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "var(--creva-purple)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--creva-purple-mid)"; }}
            >
              {status === "loading" ? <><span className="reg-spinner" /> Signing in…</> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="fade-up fade-up-4" style={{ color: "var(--creva-gray-600)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          Start Smart · Admin Access Only
        </p>
      </div>
    </main>
  );
}
