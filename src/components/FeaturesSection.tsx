const features = [
  {
    icon: "🛡️",
    title: "Real-Time Risk Verification",
    desc: "Partner fintechs call /verify-risk before processing any transfer. Fraudulent accounts are blocked instantly with a 403 BLOCK response.",
    tag: "B2B API",
  },
  {
    icon: "🔍",
    title: "AI-Powered OCR Extraction",
    desc: "Victims upload scam screenshots. Our AI extracts NUBANs and phone numbers automatically, feeding the community fraud database.",
    tag: "AI / OCR",
  },
  {
    icon: "🔗",
    title: "Entity Resolution",
    desc: "We link NUBANs to Interswitch-verified account names and wallet metadata. Scammers who reuse identifiers are proactively flagged across the network.",
    tag: "Intelligence",
  },
  {
    icon: "💸",
    title: "Embedded Safe Pay",
    desc: "Mark a vendor Safe? Pay directly in-app via a dynamic Interswitch virtual account showing 'CREVA – Vendor Name' as a visual trust anchor.",
    tag: "Payments",
  },
  {
    icon: "⚡",
    title: "Instant Disbursement",
    desc: "Once payment is confirmed, funds are disbursed instantly to the vendor's actual account via the Interswitch Transfers API on NIBSS rails.",
    tag: "Infrastructure",
  },
  {
    icon: "🌍",
    title: "Crowdsourced Intelligence",
    desc: "Every report strengthens the network. Partners both consume and push flagged accounts, creating an ecosystem-wide, self-improving fraud database.",
    tag: "Community",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[var(--creva-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">Platform Features</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            A seamless, powerful platform<br />
            <span className="text-[var(--creva-purple-light)]">for payment security.</span>
          </h2>
          <p className="text-[var(--creva-gray-400)] max-w-xl mx-auto">
            Three pillars working together — fraud intelligence, AI extraction, and secure embedded payments.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="section-badge mb-3 text-xs">{f.tag}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-[var(--creva-gray-400)] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
