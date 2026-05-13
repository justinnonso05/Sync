const partners = ["Interswitch", "NIBSS", "Stripe", "Flutterwave", "Paystack", "Moniepoint"];

export default function TrustedBy() {
  return (
    <section className="py-12 border-t border-b border-[var(--creva-border)] bg-[var(--creva-bg)]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--creva-gray-400)] mb-8 font-semibold">
          Featured In &amp; Trusted By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 logo-strip">
          {partners.map((p) => (
            <span
              key={p}
              className="text-white/60 font-bold text-lg md:text-xl tracking-tight select-none"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
