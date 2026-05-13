export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
      {/* Badge */}
      <div className="section-badge mb-6">
        <span className="dot w-1.5 h-1.5 rounded-full bg-[var(--creva-purple-light)] inline-block" />
        Trusted Fraud Intelligence for Africa
      </div>

      {/* Headline */}
      <h1 className="font-[family-name:var(--font-bricolage)] text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mb-6">
        <span className="text-[var(--creva-purple-light)]">Secure your</span>
        <br />
        <span className="text-[var(--creva-purple-mid)]">global payments.</span>
        <br />
        <span className="text-white">Instantly.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-[var(--creva-gray-400)] text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
        Crowdsourced fraud intelligence meets secure payment infrastructure.
        CREVA verifies vendors, blocks scammers, and powers safe payments — all in one platform.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button className="btn-primary text-base px-8 py-3.5">
          Start Building with CREVA
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="btn-outline text-base px-8 py-3.5">
          View API Docs
        </button>
      </div>

      {/* Floating stats row */}
      <div className="mt-16 flex flex-wrap justify-center gap-8">
        {[
          { value: "99.9%", label: "Fraud Detection Rate" },
          { value: "<200ms", label: "API Response Time" },
          { value: "₦0", label: "Loss to Vendor Scams" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-black text-[var(--creva-purple-light)]">{stat.value}</div>
            <div className="text-xs text-[var(--creva-gray-400)] mt-1 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
