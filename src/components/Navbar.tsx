"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Solutions", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Fintechs", href: "#" },
  { label: "Company", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar-bar">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-(--creva-purple-mid) to-(--creva-purple-deep) flex items-center justify-center animate-glow">
          <span className="text-white font-black text-sm">C</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">CREVA</span>
      </Link>

      {/* Centered nav pill */}
      <div className="hidden md:flex nav-pill items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={`nav-link ${l.active ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Right CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="#" className="nav-link">Sign In</Link>
        <button className="btn-outline text-sm">Create Free Account</button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-2 ml-auto"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
        <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${open ? "opacity-0" : ""}`} />
        <div className={`w-5 h-0.5 bg-white transition-all origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 glass-card rounded-none border-x-0 p-5 flex flex-col gap-3 z-50">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-white/80 hover:text-white py-1 transition-colors">
              {l.label}
            </Link>
          ))}
          <button className="btn-primary mt-2 justify-center">Create Free Account</button>
        </div>
      )}
    </nav>
  );
}
