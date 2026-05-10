"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useT } from "@/lib/i18n/useT";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const t = useT();

  const stats = [
    { value: "42",   label: t("about.stats.school") },
    { value: "Junior",   label: t("about.stats.years") },
    { value: "3",   label: t("about.stats.projects") },
    { value: "FR/EN",label: t("about.stats.languages") },
  ];

  return (

    <section id="about" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "6rem", 
        alignItems: "stretch"
      }}> */}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
        gap: "3rem",
        alignItems: "stretch"
      }}>


        {/* Left: photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            position: "relative", 
            height: "100%",
            minHeight: "400px"
          }}
        >
          <div style={{
            position: "relative", 
            width: "100%", 
            height: "100%",
            borderRadius: "var(--radius)", 
            overflow: "hidden", 
            border: "1px solid var(--border)",
          }}>
            <Image 
              src="/anne-gaelle-1.jpg" 
              alt="Anne-Gaëlle Bonnefoy" 
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }} 
              priority 
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
              background: "linear-gradient(to top, rgba(10,10,10,0.7), transparent)",
            }} />
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              position: "absolute", bottom: "1.5rem", left: "1.5rem",
              background: "rgba(10,10,10,0.6)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px", padding: "0.6rem 1rem",
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              color: "#4ade80", 
              letterSpacing: "0.08em",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              zIndex: 10
            }}
          >
            <span style={{ position: "relative", display: "flex", height: "8px", width: "8px", flexShrink: 0 }}>
              <span style={{
                position: "absolute", display: "inline-flex", height: "100%", width: "100%",
                borderRadius: "50%", background: "#22c55e", opacity: 0.75,
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
              }} />
              <span style={{
                position: "relative", display: "inline-flex", borderRadius: "50%",
                height: "8px", width: "8px", background: "#22c55e"
              }} />
            </span>
            {t("about.badge")}
          </motion.div>
        </motion.div>

        {/* Right: text and stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>{t("about.section_label")}</p>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>{t("about.title")}</h2>
          
          {/* <div style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div> */}

          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              marginBottom: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "60ch",
            }}
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
            background: "var(--border)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "1.5rem",
          }}>
            {stats.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                style={{ background: "var(--bg-card)", padding: "1.5rem", textAlign: "center" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: "0.4rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            <span style={{ color: "var(--accent)" }}>→</span>
            <span>{t("about.location")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}