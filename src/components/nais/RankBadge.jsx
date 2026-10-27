import React from "react";

/**
 * NAIS RankBadge - podium position as a small squared mono chip
 * (replaces the medal emoji). 1e is a solid inverse chip (ink on light, cream on dark); 2e and 3e
 * are outlined. Colours come from theme tokens so it works on any ground.
 */
export function RankBadge({ rank, size = "md" }) {
  const solid = rank === 1;
  const dim = size === "lg" ? { fontSize: "13px", padding: "5px 9px", minWidth: "38px" } : { fontSize: "11px", padding: "3px 7px", minWidth: "30px" };
  return (
    <span
      title={`${rank}e plaats`}
      aria-label={`${rank}e plaats`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "0.04em",
        lineHeight: 1,
        borderRadius: "var(--radius-xs)",
        border: `var(--border-bold) solid ${solid ? "var(--text)" : "var(--border-strong)"}`,
        background: solid ? "var(--text)" : "transparent",
        color: solid ? "var(--bg)" : "var(--text)",
        ...dim,
      }}
    >
      {rank}e
    </span>
  );
}
