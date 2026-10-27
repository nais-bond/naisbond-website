import React from "react";

/**
 * NAIS NextMatch — the "volgende contest" notification banner.
 * A slim bar at the bottom of the hero so the next event is visible
 * without scrolling: label, condensed event name, date/venue and a
 * single go action. Pulsing dot only when the event is live.
 */
const ARROW = (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" style={{ display: "block" }}>
    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
  </svg>
);

export function NextMatch({
  label = "Volgende contest",
  eventName,
  date,
  venue,
  href = "#",
  cta = "Inschrijven",
  live = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const meta = [date, venue].filter(Boolean).join(", ");

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-5)",
        flexWrap: "wrap",
        background: "var(--nm-bg)",
        color: "var(--nm-fg)",
        textDecoration: "none",
        padding: "13px var(--space-6)",
        borderTop: "1px solid rgba(246,246,244,.22)",
        ...style,
      }}
      {...rest}
    >
      {/* label + status dot */}
      <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", flex: "none" }}>
        {live && <span style={{
          width: "9px", height: "9px", borderRadius: "999px", flex: "none",
          background: "var(--spark)",
          animation: "nais-pulse 1.1s steps(1) infinite",
        }} />}
        <span className="nais-kicker" style={{ color: "var(--accent-text)" }}>{label}</span>
      </span>

      {/* event name + meta */}
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: "var(--space-4)", flexWrap: "wrap", flex: "1 1 auto", minWidth: 0 }}>
        <span style={{
          fontFamily: "var(--font-display)", textTransform: "uppercase",
          fontSize: "clamp(19px, 2.2vw, 26px)", lineHeight: 1,
          letterSpacing: "var(--tracking-display)",
        }}>{eventName}</span>
        {meta && (
          <span className="nais-kicker" style={{ color: "var(--nm-fg-muted)" }}>{meta}</span>
        )}
      </span>

      {/* go action */}
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "7px", flex: "none",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "13px",
        textTransform: "uppercase", letterSpacing: "0.04em",
        color: "var(--nm-fg)",
        borderBottom: `2px solid ${hover ? "var(--accent-text)" : "var(--nm-fg)"}`,
        paddingBottom: "2px",
        transition: "color var(--dur-fast) var(--ease-snap), border-color var(--dur-fast) var(--ease-snap)",
      }}>
        {cta}{ARROW}
      </span>

      <style>{"@keyframes nais-pulse{0%,49%{opacity:1}50%,100%{opacity:.25}}"}</style>
    </a>
  );
}
