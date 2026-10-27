import React from "react";

/**
 * NAIS StatBlock — a single bold stat cell.
 * Compose several in a grid for a stat strip.
 */
export function StatBlock({
  value,
  label,
  accent = false,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        padding: "40px 32px",
        borderRight: "1px solid var(--border)",
        borderTop: `1px solid ${accent ? "var(--accent-text)" : "var(--border)"}`,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 6vw, 72px)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: accent ? "var(--accent-text)" : "var(--text)",
          display: "block",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--label-sm, 11px)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
