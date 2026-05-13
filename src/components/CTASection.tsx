export default function CTASection() {
  return (
    <section className="py-24 bg-[var(--creva-bg)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.14) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="section-badge mb-6 mx-auto">Get Early Access</div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Stop fraud before{" "}
          <span className="text-[var(--creva-purple-light)]">it happens.</span>
        </h2>
        <p className="text-[var(--creva-gray-400)] text-lg mb-10 max-w-xl mx-auto">
          Join the waitlist for CREVA's enterprise API and be the first fintech to protect your
          customers with Africa's most intelligent payment fraud network.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@company.com"
            className="flex-1 bg-[var(--creva-card-bg)] border border-[var(--creva-border)] text-white placeholder-[var(--creva-gray-400)] rounded-full px-5 py-3.5 text-sm outline-none focus:border-[var(--creva-purple-mid)] transition-colors"
          />
          <button className="btn-primary whitespace-nowrap">
            Join Waitlist
          </button>
        </div>

        <p className="text-[var(--creva-gray-400)] text-xs mt-4">
          No spam. We&apos;ll only reach out when access is ready. 🔒
        </p>
      </div>
    </section>
  );
}
