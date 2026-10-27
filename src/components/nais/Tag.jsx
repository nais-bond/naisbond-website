import React from "react";

/**
 * NAIS Tag — mono pill for hashtags, cities, trick names, categories.
 */
const TONES = {
  default: { bg: "transparent", fg: "var(--text)", bd: "var(--border-strong)" },
  volt:    { bg: "var(--volt)", fg: "var(--volt-ink)", bd: "var(--volt-bd)" },
  ghost:   { bg: "transparent", fg: "var(--text-muted)", bd: "var(--border)" },
  solid:   { bg: "var(--asphalt)", fg: "var(--bone)", bd: "var(--asphalt)" },
};

export function Tag({ children, tone = "default", size = "md", style, ...rest }) {
  const t = TONES[tone] || TONES.default;
  const sized = size === "sm"
    ? { fontSize: "10px", padding: "3px 9px" }
    : { fontSize: "11px", padding: "4px 11px" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        border: `1px solid ${t.bd}`,
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        whiteSpace: "nowrap",
        ...sized,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
