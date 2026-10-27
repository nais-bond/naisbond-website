import React from "react";

/**
 * NAIS Kicker — mono eyebrow label. The "// LABEL" gesture above headers.
 */
export function Kicker({ children, accent = false, style, ...rest }) {
  return (
    <span
      className="nais-kicker"
      style={{
        display: "inline-block",
        color: accent ? "var(--accent-text)" : "var(--text-muted)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
