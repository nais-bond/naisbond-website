import React from "react";
import { Kicker } from "./Kicker.jsx";

/**
 * NAIS SectionHeader — kicker + oversized condensed title + optional action.
 * The standard band opener across the site.
 */
export function SectionHeader({
  kicker,
  title,
  action = null,
  align = "left",
  size = "lg",
  style,
  ...rest
}) {
  const titleSize = {
    sm: "var(--display-sm)",
    md: "var(--display-md)",
    lg: "var(--display-lg)",
    xl: "var(--display-xl)",
  }[size] || "var(--display-lg)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        flexWrap: "wrap",
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {kicker && <Kicker accent>{kicker}</Kicker>}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: titleSize,
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-display)",
            color: "var(--text)",
            margin: 0,
            maxWidth: "18ch",
          }}
        >
          {title}
        </h2>
      </div>
      {action && <div style={{ paddingBottom: "0.4em" }}>{action}</div>}
    </div>
  );
}
