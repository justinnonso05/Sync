const links = {
  Product: ["Verify Risk API", "Safe Pay", "OCR Extraction", "Entity Resolution"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Security"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--creva-border)] bg-[var(--creva-bg)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 justify-between mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--creva-purple-mid)] to-[var(--creva-purple-deep)] flex items-center justify-center">
                <span className="text-white font-black text-xs">C</span>
              </div>
              <span className="text-white font-bold text-base">CREVA</span>
            </div>
            <p className="text-[var(--creva-gray-400)] text-sm leading-relaxed">
              Crowdsourced Risk Evaluation &amp; Vendor Authentication. Africa&apos;s fraud intelligence layer for the payment ecosystem.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[var(--creva-gray-400)] text-sm hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[var(--creva-border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--creva-gray-400)] text-xs">
            © {new Date().getFullYear()} CREVA. Built for the Enyata × Interswitch Buildathon.
          </p>
          <p className="text-[var(--creva-gray-400)] text-xs">
            Powered by{" "}
            <span className="text-[var(--creva-purple-light)] font-medium">Interswitch APIs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
