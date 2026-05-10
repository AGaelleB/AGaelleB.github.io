"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "@/data/skills";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n/useT";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");
  const { theme } = useApp(); 
  const t = useT();

  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" ref={ref} style={{
      padding: "8rem 2rem",
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} style={{ marginBottom: "4rem" }}>
          <p className="section-label" style={{ marginBottom: "1rem" }}>{t("skills.section_label")}</p>
          <h2 className="section-title">{t("skills.title")}</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {skillCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em",
                padding: "0.4rem 1.2rem", borderRadius: "4px", border: "1px solid", cursor: "pointer",
                transition: "all 0.2s",
                background: activeCategory === cat.id ? "var(--accent)" : "transparent",
                borderColor: activeCategory === cat.id ? "var(--accent)" : "var(--border)",
                color: activeCategory === cat.id ? "var(--bg)" : "var(--text-muted)",
              }}>
              {/* Accès à la catégorie via le JSON */}
              {t(`skills.categories.${cat.id}` as any)}
            </button>
          ))}
        </motion.div>

        {/* Skills grid avec logos et progression */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {current.skills.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{
                background: "var(--bg-subtle)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "1.25rem 1.5rem",
                transition: "border-color 0.2s",
              }}
              whileHover={{ borderColor: "var(--border-hover)" } as any}
            >
              {/* Logo + name */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{
                  width: "32px", height: "32px", flexShrink: 0,
                  background: theme === "light" ? "var(--bg)" : "var(--bg-card)",
                  borderRadius: "6px", padding: "4px",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    width={22}
                    height={22}
                    style={{
                      objectFit: "contain",
                      filter: (theme === "dark" && (skill.name === "Next.js" || skill.name === "GitHub" || skill.name === "Expo")) ? "invert(1)" : "none",
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--text)", fontSize: "0.95rem" }}>
                    {skill.category === "softskills" 
                      ? t(`skills.items.${skill.name}` as any) 
                      : skill.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                    {/* On utilise t.lang pour garder la cohérence avec le hook */}
                    {t(`skills.levels.${skill.level}` as any)}
                  </div>
                </div>
              </div>

              {/* Progress bar (La courbe de progression que j'avais omise) */}
              <div style={{ height: "2px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(skill.level / 5) * 100}%` } : {}}
                  transition={{ delay: 0.3 + 0.1 * i, duration: 0.8, ease: "easeOut" }}
                  style={{ height: "100%", background: "var(--accent)", borderRadius: "2px" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}