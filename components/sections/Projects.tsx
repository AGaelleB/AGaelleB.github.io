"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { useT } from "@/lib/i18n/useT";

function ProjectCard({ project, onClick, index, inView, t }: {
  project: Project;
  onClick: () => void;
  index: number;
  inView: boolean;
  t: ReturnType<typeof useT>;
}) {
  const id = project.id;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.7 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "2rem", cursor: "pointer",
        transition: "border-color 0.2s", position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
    >
      {/* Header : catégorie + statut */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--accent)",
          border: "1px solid var(--accent-dim)", padding: "0.2rem 0.6rem", borderRadius: "3px",
        }}>
          {project.category}
        </span>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {project.team && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-faint)" }}>
              ×{project.team}
            </span>
          )}
          {project.wip && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", opacity: 0.7 }}>
              {t("projects.wip")}
            </span>
          )}
        </div>
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700,
        color: "var(--text)", marginBottom: "0.5rem", lineHeight: 1.2,
      }}>
        {t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
      </h3>

      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
        {t(`projects.items.${id}.tagline` as Parameters<typeof t>[0])}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)",
            background: "var(--bg-subtle)", padding: "0.2rem 0.6rem",
            borderRadius: "3px", border: "1px solid var(--border)",
          }}>
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-faint)", padding: "0.2rem 0.4rem" }}>
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", color: "var(--text-faint)", fontSize: "1rem" }}>↗</div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose, t }: {
  project: Project;
  onClose: () => void;
  t: ReturnType<typeof useT>;
}) {
  const id = project.id;

  // Récupère le tableau de highlights depuis les JSON via t()
  // On itère sur des indices fixes (max 8) et on s'arrête si la clé n'existe pas
  const highlights: string[] = [];
  for (let i = 0; i < 8; i++) {
    const val = t(`projects.items.${id}.highlights.${i}` as Parameters<typeof t>[0]);
    // Si la clé n'est pas trouvée, useT retourne la clé elle-même
    if (val.startsWith("projects.items")) break;
    highlights.push(val);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "16px", padding: "3rem", maxWidth: "680px",
          width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative",
        }}
      >
        <button onClick={onClose} style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          background: "none", border: "none", color: "var(--text-muted)",
          cursor: "pointer", fontSize: "1.2rem", padding: "0.5rem",
        }}>✕</button>

        {/* Badges */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--accent)",
            border: "1px solid var(--accent-dim)", padding: "0.2rem 0.6rem", borderRadius: "3px",
          }}>
            {project.category}
          </span>
          {project.team && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-faint)",
              border: "1px solid var(--border)", padding: "0.2rem 0.6rem", borderRadius: "3px",
            }}>
              {t("projects.team")} {project.team}
            </span>
          )}
          {project.wip && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)",
              opacity: 0.7, border: "1px solid var(--accent-dim)",
              padding: "0.2rem 0.6rem", borderRadius: "3px",
            }}>
              {t("projects.wip")}
            </span>
          )}
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800,
          color: "var(--text)", marginBottom: "0.75rem", lineHeight: 1.1,
        }}>
          {t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
        </h2>

        <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          {t(`projects.items.${id}.description` as Parameters<typeof t>[0])}
        </p>

        {/* Highlights */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem",
        }}>
          {t("projects.key_highlights")}
        </p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
          {highlights.map((h, i) => (
            <li key={i} style={{
              color: "var(--text-muted)", fontSize: "0.9rem",
              display: "flex", gap: "0.75rem", alignItems: "flex-start",
            }}>
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>▸</span>{h}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem",
        }}>
          {t("projects.tech_stack")}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {project.stack.map((tech) => (
            <span key={tech} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)",
              background: "var(--bg-subtle)", padding: "0.3rem 0.8rem",
              borderRadius: "4px", border: "1px solid var(--border)",
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)",
                border: "1px solid var(--border)", padding: "0.5rem 1.2rem",
                borderRadius: "4px", textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >{t("projects.github")}</a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--bg)",
                background: "var(--accent)", padding: "0.5rem 1.2rem",
                borderRadius: "4px", textDecoration: "none", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >{t("projects.live_site")}</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);
  const t = useT();

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }} style={{ marginBottom: "4rem" }}
      >
        <p className="section-label" style={{ marginBottom: "1rem" }}>{t("projects.section_label")}</p>
        <h2 className="section-title">{t("projects.title")}</h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelected(project)}
            index={i}
            inView={inView}
            t={t}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} t={t} />
        )}
      </AnimatePresence>
    </section>
  );
}
