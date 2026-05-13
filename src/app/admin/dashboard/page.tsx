"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface Registration {
  id: string; fullName: string; email: string; createdAt: string;
}

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (done.current || target === 0) { setVal(target); return; }
    done.current = true;
    const steps = 28, duration = 700;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}</>;
}

// Reusable SVG icons
const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
  </svg>
);
const IconClock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
);
const IconTarget = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" />
  </svg>
);
const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const btnBase: React.CSSProperties = {
  background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
  color: "var(--creva-gray-400)", borderRadius: "0.4rem",
  padding: "0.45rem 0.85rem", fontSize: "0.8rem", cursor: "pointer",
  transition: "border-color 0.15s, color 0.15s", display: "inline-flex",
  alignItems: "center", gap: "0.35rem",
};

export default function AdminDashboard() {
  const router  = useRouter();
  const [regs,  setRegs]    = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoad]  = useState(true);
  const [bc,    setBc]      = useState({ subject: "", body: "" });
  const [bSt,   setBSt]     = useState<"idle"|"loading"|"success"|"error">("idle");
  const [bMsg,  setBMsg]    = useState("");

  const fetchData = useCallback(async () => {
    setLoad(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) { router.push("/admin"); return; }
      const d = await res.json();
      setRegs(d.registrations || []);
    } catch { /* ignore */ }
    finally { setLoad(false); }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const sendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setBSt("loading"); setBMsg("");
    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bc),
      });
      const d = await res.json();
      if (!res.ok) { setBMsg(d.error || "Failed."); setBSt("error"); return; }
      setBMsg(`Sent to ${d.sent} registrant${d.sent !== 1 ? "s" : ""}.`);
      setBSt("success");
      setBc({ subject: "", body: "" });
    } catch { setBMsg("Network error."); setBSt("error"); }
  };

  const today    = new Date().toDateString();
  const todayCt  = regs.filter(r => new Date(r.createdAt).toDateString() === today).length;
  const filtered = regs.filter(r =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );
  const fmt = (d: string) =>
    new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const STATS = [
    { label: "Total Registrants", value: regs.length,  icon: <IconUsers />, noAnim: false },
    { label: "Joined Today",      value: todayCt,       icon: <IconClock />, noAnim: false },
    { label: "Event Date",        value: "Jul 12, '25", icon: <IconTarget />, noAnim: true  },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--creva-bg)", color: "#fff" }}>
      {/* Sticky header */}
      <header style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(7,7,9,0.92)", backdropFilter: "blur(12px)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0.85rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{
              width: 30, height: 30, borderRadius: "0.45rem",
              background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconHome />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: 0, fontFamily: "var(--font-bricolage)" }}>Start Smart</p>
              <p style={{ color: "var(--creva-gray-400)", fontSize: "0.7rem", margin: 0 }}>Admin Dashboard</p>
            </div>
          </div>
          <button id="logout-btn" onClick={logout} style={btnBase}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--creva-gray-400)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Stat cards */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: "0.85rem", marginBottom: "2rem" }}>
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <span style={{ color: "var(--creva-gray-400)", display: "block", marginBottom: "0.65rem" }}>{s.icon}</span>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--creva-purple-light)", margin: "0 0 0.25rem", lineHeight: 1, fontFamily: "var(--font-bricolage)" }}>
                {s.noAnim ? s.value : <Counter target={s.value as number} />}
              </p>
              <p style={{ fontSize: "0.73rem", color: "var(--creva-gray-400)", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: "1.25rem" }}>

          {/* Registrations table */}
          <section className="fade-up fade-up-2" style={{
            background: "rgba(18, 12, 40, 0.55)",

            border: "1px solid rgba(139,92,246,0.12)",
            borderRadius: "0.75rem", overflow: "hidden",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.28)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", flexWrap: "wrap", padding: "1rem 1.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: "0 0 0.1rem" }}>Registrations</p>
                <p style={{ color: "var(--creva-gray-400)", fontSize: "0.75rem", margin: 0 }}>{regs.length} total</p>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                <input
                  type="text" className="reg-input" placeholder="Search…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: 190, padding: "0.45rem 0.8rem", fontSize: "0.82rem" }}
                  id="search-registrations"
                />
                <button onClick={fetchData} style={btnBase}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--creva-gray-400)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--creva-gray-400)", fontSize: "0.85rem" }}>
                <span className="reg-spinner" style={{ display: "inline-block", marginRight: "0.5rem" }} />Loading…
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--creva-gray-400)", fontSize: "0.85rem" }}>
                {search ? "No results match your search." : "No registrations yet."}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {["#", "Name", "Email", "Registered"].map(h => (
                        <th key={h} style={{
                          textAlign: "left", padding: "0.6rem 1rem",
                          color: "var(--creva-gray-400)", fontWeight: 600,
                          fontSize: "0.68rem", textTransform: "uppercase",
                          letterSpacing: "0.08em", whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} className="reg-row">
                        <td style={{ padding: "0.8rem 1rem", color: "var(--creva-gray-600)", fontSize: "0.75rem" }}>{i + 1}</td>
                        <td style={{ padding: "0.8rem 1rem", fontWeight: 600, color: "#e5e7eb" }}>{r.fullName}</td>
                        <td style={{ padding: "0.8rem 1rem", color: "var(--creva-purple-light)", fontSize: "0.82rem" }}>{r.email}</td>
                        <td style={{ padding: "0.8rem 1rem", color: "var(--creva-gray-400)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>{fmt(r.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filtered.length > 0 && (
              <div style={{ padding: "0.6rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <p style={{ color: "var(--creva-gray-600)", fontSize: "0.72rem", margin: 0 }}>
                  {filtered.length} of {regs.length} shown
                </p>
              </div>
            )}
          </section>

          {/* Broadcast */}
          <section className="fade-up fade-up-3" style={{
            background: "rgba(18, 12, 40, 0.55)",

            border: "1px solid rgba(139,92,246,0.12)",
            borderRadius: "0.75rem", overflow: "hidden",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.28)",
          }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontWeight: 700, fontSize: "0.875rem", margin: "0 0 0.1rem" }}>Broadcast Email</p>
              <p style={{ color: "var(--creva-gray-400)", fontSize: "0.75rem", margin: 0 }}>
                Send a message to all {regs.length} attendee{regs.length !== 1 ? "s" : ""}
              </p>
            </div>
            <form onSubmit={sendBroadcast} style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="reg-label" htmlFor="broadcast-subject">Subject</label>
                <input id="broadcast-subject" type="text" className="reg-input"
                  placeholder="e.g. Important Update – Start Smart Event"
                  value={bc.subject} onChange={e => setBc({ ...bc, subject: e.target.value })}
                  required disabled={bSt === "loading"} />
              </div>
              <div>
                <label className="reg-label" htmlFor="broadcast-body">Message</label>
                <textarea id="broadcast-body" className="reg-input" rows={5}
                  placeholder="Write your message here…"
                  value={bc.body} onChange={e => setBc({ ...bc, body: e.target.value })}
                  required disabled={bSt === "loading"}
                  style={{ resize: "vertical", minHeight: "110px" }} />
              </div>

              {bSt !== "idle" && bMsg && (
                <div className={bSt === "success" ? "reg-success" : "reg-error"}>
                  {bSt === "success"
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  }
                  {bMsg}
                </div>
              )}

              <div>
                <button id="broadcast-send-btn" type="submit"
                  disabled={bSt === "loading" || regs.length === 0}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "var(--creva-purple-mid)", color: "#fff",
                    border: "none", borderRadius: "0.5rem",
                    padding: "0.72rem 1.2rem", fontWeight: 600, fontSize: "0.875rem",
                    cursor: bSt === "loading" || regs.length === 0 ? "not-allowed" : "pointer",
                    opacity: bSt === "loading" || regs.length === 0 ? 0.55 : 1,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (bSt !== "loading" && regs.length > 0) (e.currentTarget as HTMLElement).style.background = "var(--creva-purple)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--creva-purple-mid)"; }}
                >
                  {bSt === "loading" ? <><span className="reg-spinner" />Sending…</> : <><IconSend />Send to {regs.length} Registrant{regs.length !== 1 ? "s" : ""}</>}
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>
    </main>
  );
}
