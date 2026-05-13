const steps = [
  {
    step: "01",
    title: "Upload a Scam Screenshot",
    desc: "A buyer uploads a WhatsApp chat or fake payment receipt. CREVA's OCR engine instantly extracts account numbers and phone numbers.",
  },
  {
    step: "02",
    title: "Verify the Vendor",
    desc: "CREVA cross-references extracted identifiers against our fraud database and fetches the real account name via Interswitch's Name Enquiry API.",
  },
  {
    step: "03",
    title: "See the Risk Score",
    desc: "The platform returns a trust verdict — Safe, Suspicious, or BLOCK: High Fraud Risk — in under 200ms.",
  },
  {
    step: "04",
    title: "Pay Safely (or Walk Away)",
    desc: "If Safe, initiate a protected payment via our embedded Interswitch virtual account. Funds are disbursed instantly to the vendor after collection.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[var(--creva-bg)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-badge mb-4">How It Works</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            From screenshot to{" "}
            <span className="text-[var(--creva-purple-light)]">safe payment</span>
            <br />in seconds.
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="glass-card p-6 flex gap-6 items-start">
              {/* Step number */}
              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--creva-purple-mid)] to-[var(--creva-purple-deep)] flex items-center justify-center font-black text-white text-lg">
                {s.step}
              </div>
              {/* Content */}
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-[var(--creva-gray-400)] text-sm leading-relaxed">{s.desc}</p>
              </div>
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="absolute left-[2.85rem] mt-20 w-0.5 h-6 bg-[var(--creva-border)]" />
              )}
            </div>
          ))}
        </div>

        {/* Demo block */}
        <div className="mt-10 glass-card p-5 font-mono text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[var(--creva-gray-400)] ml-2 text-xs">POST /api/v1/verify/risk</span>
          </div>
          <div className="text-[var(--creva-gray-400)]">
            <span className="text-[var(--creva-purple-light)]">{"{"}</span>
            <br />
            &nbsp;&nbsp;<span className="text-green-400">"account_number"</span>: <span className="text-yellow-300">"0123456789"</span>,
            <br />
            &nbsp;&nbsp;<span className="text-green-400">"bank_code"</span>: <span className="text-yellow-300">"058"</span>
            <br />
            <span className="text-[var(--creva-purple-light)]">{"}"}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--creva-border)]">
            <span className="text-red-400 font-bold">403</span>{" "}
            <span className="text-white">BLOCK: High Fraud Risk</span>
            <br />
            <span className="text-[var(--creva-gray-400)] text-xs">
              — Flagged by 14 community reports · Linked to 3 NUBANs · Last seen 2h ago
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
