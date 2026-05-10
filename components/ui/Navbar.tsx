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

  const btnStyle = {
    height: "32px",
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--text-faint)",
    borderRadius: "6px",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    color: "var(--text-muted)",
    transition: "border-color 0.2s, color 0.2s",
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? theme === "dark"
            ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-md border-b border-[var(--border)]"
            : "bg-[rgba(248,246,242,0.85)] backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-[1.1rem] tracking-[-0.02em] text-[var(--text)] no-underline shrink-0"
        >
          AGB<span className="text-[var(--accent)]"></span>
        </a>

        {/* Desktop — liens de navigation */}
        <ul className="hidden md:flex gap-8 list-none items-center m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm font-medium text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop — contrôles lang + theme + CV */}
        <div className="hidden md:flex items-center shrink-0" style={{ gap: "0.75rem" }}>

          {/* Langue */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            title="Switch language"
            style={{ ...btnStyle, padding: "0 0.75rem", fontSize: "0.7rem", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--text-faint)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          {/* Thème */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            style={{ ...btnStyle, padding: "0 0.6rem", fontSize: "0.9rem" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--text-faint)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          {/* CV */}
          <a
            href="/CV_AGB_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--accent)",
              borderRadius: "4px",
              padding: "0 1rem",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              color: "var(--accent)",
              textDecoration: "none",
              minWidth: "80px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
          >
            {t("nav.cv")}
          </a>
        </div>

        {/* Mobile — hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none text-[var(--text)] cursor-pointer p-2 text-xl leading-none"
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile — menu déroulant */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--bg-card)] border-t border-[var(--border)] px-6 pb-6 pt-2"
          >
            {/* Liens */}
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-base text-[var(--text-muted)] no-underline py-3 border-b border-[var(--border)] transition-colors duration-200 hover:text-[var(--text)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Contrôles en bas du menu mobile */}
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[var(--border)]">
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                style={{ ...btnStyle, padding: "0 0.75rem", fontSize: "0.7rem", letterSpacing: "0.08em" }}
              >
                {lang === "fr" ? "EN" : "FR"}
              </button>

              <button
                onClick={toggleTheme}
                style={{ ...btnStyle, padding: "0 0.6rem", fontSize: "0.9rem" }}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>

              <a
                href="/CV_AGB_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--accent)",
                  borderRadius: "4px",
                  padding: "0 1rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  textDecoration: "none",
                  minWidth: "80px",
                  marginLeft: "auto",
                }}
              >
                {t("nav.cv")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
