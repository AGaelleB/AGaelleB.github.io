"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n/useT";

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about",    label: t("nav.about")    },
    { href: "#skills",   label: t("nav.skills")   },
    { href: "#projects", label: t("nav.projects") },
    { href: "#timeline", label: t("nav.timeline") },
    { href: "#contact",  label: t("nav.contact")  },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const btnBase: React.CSSProperties = {
    background: "none",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    color: "var(--text-muted)",
    padding: "0.35rem 0.7rem",
    transition: "border-color 0.2s, color 0.2s",
    lineHeight: 1,
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "background 0.3s, border-color 0.3s",
      background: scrolled
        ? theme === "dark" ? "rgba(10,10,10,0.85)" : "rgba(248,246,242,0.85)"
        : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <nav style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 2rem",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem",
          color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em",
        }}>
          AGB<span style={{ color: "var(--accent)" }}></span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex" style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{
                fontFamily: "var(--font-body)", fontSize: "0.875rem",
                color: "var(--text-muted)", textDecoration: "none",
                transition: "color 0.2s", fontWeight: 500,
              }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
              >{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Controls: lang + theme + CV */}
        <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} style={btnBase} title="Switch language">
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button onClick={toggleTheme} style={{ ...btnBase, fontSize: "0.9rem", padding: "0.3rem 0.6rem" }}
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <a href="/CV_AGB_2026.pdf" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em",
              color: "var(--accent)", border: "1px solid var(--accent)",
              padding: "0.4rem 1rem", borderRadius: "4px", textDecoration: "none",
              transition: "background 0.2s, color 0.2s", marginLeft: "0.25rem",
              minWidth: "80px", textAlign: "center",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
          >{t("nav.cv")}</a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "1.5rem 2rem" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", color: "var(--text-muted)", textDecoration: "none",
                  padding: "0.75rem 0", borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-body)", fontSize: "1rem",
                }}>{link.label}</a>
            ))}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} style={btnBase}>
                {lang === "fr" ? "EN" : "FR"}
              </button>
              <button onClick={toggleTheme} style={{ ...btnBase, fontSize: "0.9rem" }}>
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
