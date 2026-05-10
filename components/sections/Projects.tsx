"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { useT } from "@/lib/i18n/useT";

/* ── Card projet avec image + GIF au hover ── */
function ProjectCard({ project, onClick, index, inView, t }: {
  project: Project;
  onClick: () => void;
  index: number;
  inView: boolean;
  t: ReturnType<typeof useT>;
}) {
  const id = project.id;
  const [hovered, setHovered] = useState(false);
  const displayGif = project.gif && hovered;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.7 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      {/* Zone image — fixe à 200px de haut */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "var(--bg-subtle)" }}>
        {/* Image statique toujours présente */}
        <Image
          src={project.image}
          alt={t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transition: "opacity 0.3s ease, transform 0.4s ease",
            opacity: displayGif ? 0 : 1,
            transform: hovered && !project.gif ? "scale(1.04)" : "scale(1)",
          }}
          unoptimized={project.image.endsWith(".gif")}
        />

        {/* GIF au hover — apparaît par-dessus */}
        {project.gif && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.gif}
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: displayGif ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Overlay gradient bas */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to top, var(--bg-card), transparent)",
          pointerEvents: "none",
        }} />

        {/* Badges en haut à droite */}
        <div style={{
          position: "absolute", top: "0.75rem", right: "0.75rem",
          display: "flex", gap: "0.35rem", flexWrap: "wrap", justifyContent: "flex-end",
        }}>
          {project.wip && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em",
              background: "rgba(10,10,10,0.75)", color: "var(--accent)",
              border: "1px solid rgba(212,168,83,0.4)",
              padding: "0.2rem 0.5rem", borderRadius: "3px", backdropFilter: "blur(6px)",
            }}>
              {t("projects.wip")}
            </span>
          )}
          {project.team && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              background: "rgba(10,10,10,0.75)", color: "var(--text-muted)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0.2rem 0.5rem", borderRadius: "3px", backdropFilter: "blur(6px)",
            }}>
              ×{project.team}
            </span>
          )}
        </div>

        {/* Indicateur GIF */}
        {project.gif && (
          <span style={{
            position: "absolute", bottom: "0.6rem", left: "0.75rem",
            fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em",
            color: "var(--text-faint)", opacity: hovered ? 0 : 0.6,
            transition: "opacity 0.2s",
          }}>
            hover to preview
          </span>
        )}
      </div>

      {/* Contenu texte */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--accent)",
            border: "1px solid var(--accent-dim)", padding: "0.15rem 0.5rem", borderRadius: "3px",
          }}>
            {project.category}
          </span>
          <span style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>↗</span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700,
          color: "var(--text)", marginBottom: "0.4rem", lineHeight: 1.2,
        }}>
          {t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
        </h3>

        <p style={{
          color: "var(--text-muted)", fontSize: "0.85rem",
          lineHeight: 1.5, marginBottom: "1rem",
        }}>
          {t(`projects.items.${id}.tagline` as Parameters<typeof t>[0])}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)",
              background: "var(--bg-subtle)", padding: "0.15rem 0.5rem",
              borderRadius: "3px", border: "1px solid var(--border)",
            }}>
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-faint)", padding: "0.15rem 0.3rem" }}>
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Modal détail avec GIF ou image en header ── */
function ProjectModal({ project, onClose, t }: {
  project: Project;
  onClose: () => void;
  t: ReturnType<typeof useT>;
}) {
  const id = project.id;
  const mediaToShow = project.gif ?? project.image;

  const highlights: string[] = [];
  for (let i = 0; i < 8; i++) {
    const val = t(`projects.items.${id}.highlights.${i}` as Parameters<typeof t>[0]);
    if (val.startsWith("projects.items")) break;
    highlights.push(val);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
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
          borderRadius: "16px", maxWidth: "720px", width: "100%",
          maxHeight: "90vh", overflowY: "auto", position: "relative",
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "1rem", right: "1rem", zIndex: 10,
          background: "rgba(10,10,10,0.6)", border: "1px solid var(--border)",
          borderRadius: "6px", color: "var(--text-muted)",
          cursor: "pointer", fontSize: "1rem", padding: "0.4rem 0.7rem",
          backdropFilter: "blur(6px)",
        }}>✕</button>

        {/* Header image / GIF — pleine largeur */}
        <div style={{ position: "relative", height: "280px", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaToShow}
            alt={t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--bg-card) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }} />
        </div>

        {/* Corps */}
        <div style={{ padding: "2rem 2.5rem 2.5rem" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
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
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", opacity: 0.8,
                border: "1px solid var(--accent-dim)", padding: "0.2rem 0.6rem", borderRadius: "3px",
              }}>
                {t("projects.wip")}
              </span>
            )}
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800,
            color: "var(--text)", marginBottom: "0.75rem", lineHeight: 1.1,
          }}>
            {t(`projects.items.${id}.title` as Parameters<typeof t>[0])}
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            {t(`projects.items.${id}.description` as Parameters<typeof t>[0])}
          </p>

          {/* Highlights */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.75rem",
          }}>
            {t("projects.key_highlights")}
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2rem" }}>
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
            textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.75rem",
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
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section principale ── */
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

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}>
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
