import React from "react";

/**
 * NAIS Badge — a louder status chip. LIVE uses Spark with a pulsing dot.
 */
const TONES = {
  live:    { bg: "var(--spark)", fg: "#fff", dot: "#fff" },
  volt:    { bg: "var(--volt)", fg: "var(--volt-ink)", dot: "var(--volt-ink)" },
  dark:    { bg: "var(--asphalt)", fg: "var(--bone)", dot: "var(--bone)" },
  neutral: { bg: "var(--surface)", fg: "var(--text)", dot: "var(--text-muted)" },
};

export function Badge({ children, tone = "dark", dot = false, style, ...rest }) {
  const t = TONES[tone] || TONES.dark;
  const live = tone === "live";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "11px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "5px 10px",
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        ...style,
      }}
      {...rest}
    >
      {(dot || live) && (
        <span style={{
          width: "7px", height: "7px", borderRadius: "999px", background: t.dot, flex: "none",
          animation: live ? "nais-pulse 1.1s steps(1) infinite" : "none",
        }} />
      )}
      {children}
      {live && (
        <style>{"@keyframes nais-pulse{0%,49%{opacity:1}50%,100%{opacity:.25}}"}</style>
      )}
    </span>
  );
}
