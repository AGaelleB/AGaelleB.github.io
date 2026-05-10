"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timelineData, type TimelineItem } from "@/data/timeline";
import { useT } from "@/lib/i18n/useT";

const typeColors: Record<string, string> = {
  work: "var(--accent)",
  education: "#7c6fcd",
  project: "#4ea8a8",
};

/* ── Chaque item a son propre useInView ── */
function TimelineRow({
  item,
  index,
  t,
}: {
  item: TimelineItem;
  index: number;
  t: (key: Parameters<ReturnType<typeof useT>>[0]) => string;
}) {
  const ref = useRef(null);
  // margin: "0px 0px -80px 0px" → se déclenche quand l'item
  // entre dans le bas du viewport, pas avant
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const isLeft = index % 2 === 0;
  const color = typeColors[item.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        alignItems: "start",
        marginBottom: "3rem",
        position: "relative",
      }}
    >
      {/* Colonne gauche */}
      <div style={{ padding: "0 2rem 0 0", textAlign: "right" }}>
        {isLeft ? (
          <TimelineCard item={item} color={color} t={t} />
        ) : (
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-faint)",
            paddingTop: "0.35rem",
          }}>
            {item.date}
          </p>
        )}
      </div>

      {/* Point central */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.4rem" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, type: "spring", delay: 0.2 }}
          style={{
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: color,
            border: "2px solid var(--bg-card)",
            boxShadow: `0 0 0 3px ${color}33, 0 0 16px ${color}22`,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Colonne droite */}
      <div style={{ padding: "0 0 0 2rem" }}>
        {!isLeft ? (
          <TimelineCard item={item} color={color} t={t} />
        ) : (
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-faint)",
            paddingTop: "0.35rem",
          }}>
            {item.date}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Card contenu ── */
function TimelineCard({
  item,
  color,
  t,
}: {
  item: TimelineItem;
  color: string;
  t: (key: Parameters<ReturnType<typeof useT>>[0]) => string;
}) {
  return (
    <div
      style={{
        background: "var(--bg-subtle)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1.5rem",
        textAlign: "left",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = color + "66")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
      }
    >
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: color, border: `1px solid ${color}44`,
          padding: "0.15rem 0.5rem", borderRadius: "3px",
        }}>
          {t(`timeline.types.${item.type}` as Parameters<typeof t>[0])}
        </span>
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1.05rem",
        fontWeight: 700, color: "var(--text)", lineHeight: 1.3, marginBottom: "0.3rem",
      }}>
        {t(`timeline.items.${item.id}.title` as Parameters<typeof t>[0])}
      </h3>

      <p style={{
        fontFamily: "var(--font-mono)", fontSize: "0.72rem",
        color: "var(--text-muted)", marginBottom: "0.9rem", letterSpacing: "0.02em",
      }}>
        {item.company} — {item.location}
      </p>

      <p style={{
        color: "var(--text-muted)", fontSize: "0.875rem",
        lineHeight: 1.7, marginBottom: item.tags ? "1rem" : 0,
      }}>
        {t(`timeline.items.${item.id}.desc` as Parameters<typeof t>[0])}
      </p>

      {item.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              color: "var(--text-muted)", background: "var(--bg-card)",
              padding: "0.2rem 0.55rem", borderRadius: "3px",
              border: "1px solid var(--border)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Section principale ── */
export default function Timeline() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });
  const t = useT();

  return (
    <section
      id="timeline"
      style={{
        padding: "8rem 2rem",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "5rem" }}
        >
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            {t("timeline.section_label")}
          </p>
          <h2 className="section-title">{t("timeline.title")}</h2>
        </motion.div>

        {/* Conteneur quinconce */}
        <div ref={lineRef} style={{ position: "relative" }}>
          {/* Ligne centrale — s'étire depuis le haut */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--border)",
              transformOrigin: "top",
            }}
          />

          {/* Items — chacun se déclenche individuellement au scroll */}
          {timelineData.map((item, i) => (
            <TimelineRow key={item.id} item={item} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
