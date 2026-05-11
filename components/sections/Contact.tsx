"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useT } from "@/lib/i18n/useT";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = useT();

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "3rem",
        alignItems: "center",
      }}>

        {/* Left: texte */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>
            {t("contact.section_label")}
          </p>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em",
            color: "var(--text)", marginBottom: "1.5rem",
          }}>
            {t("contact.title_line1")}<br />
            <span className="gradient-text">{t("contact.title_line2")}</span>
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            {t("contact.description")}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
            <a
              href="mailto:annegaelle.bonnefoy@gmail.com"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.06em",
                background: "var(--accent)", color: "var(--bg)", padding: "0.9rem 2rem",
                borderRadius: "4px", textDecoration: "none", fontWeight: 500,
                transition: "opacity 0.2s", textAlign: "center",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {t("contact.cta_mail")}
            </a>
            <a
              href="https://www.linkedin.com/in/anne-ga%C3%ABlle-bonnefoy-3b7348107/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "0.06em",
                color: "var(--text-muted)", padding: "0.9rem 2rem", borderRadius: "4px",
                textDecoration: "none", border: "1px solid var(--border)",
                transition: "border-color 0.2s, color 0.2s", textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              }}
            >
              {t("contact.cta_linkedin")}
            </a>
          </div>

          {/* Footer */}
          <div style={{
            paddingTop: "2rem", borderTop: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-faint)", letterSpacing: "0.08em" }}>
              {t("contact.footer")}
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "GitHub", href: "https://github.com/AGaelleB" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/anne-ga%C3%ABlle-bonnefoy-3b7348107/" },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-faint)", textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-faint)")}
                >{link.label}</a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: photo avec cadre décalé */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: "relative", height: "520px", minHeight: "400px" }}
        >
          {/* Cadre décoratif décalé — masqué sur mobile pour éviter le débordement */}
          <div style={{
            position: "absolute", top: "16px", left: "16px", right: "-16px", bottom: "-16px",
            border: "1px solid var(--border)", borderRadius: "var(--radius)",
          }} />
          <div style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)",
          }}>
            <Image
              src="/anne-gaelle-2.jpg"
              alt="Anne-Gaëlle Bonnefoy"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
