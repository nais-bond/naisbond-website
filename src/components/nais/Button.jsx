import React from "react";

/**
 * NAIS Button — the primary action control.
 * Pill-shaped, uppercase, flat. Default is the strong fill of the current ground (ink on light, white on dark).
 */
const ARROW = (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" style={{ display: "block", marginLeft: "0.1em" }}>
    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
  </svg>
);

const SIZES = {
  sm: { fontSize: "12px", padding: "8px 14px", gap: "6px" },
  md: { fontSize: "14px", padding: "12px 20px", gap: "8px" },
  lg: { fontSize: "16px", padding: "16px 28px", gap: "10px" },
};

const VARIANTS = {
  volt:    { bg: "var(--volt)", fg: "var(--volt-ink)", bd: "var(--volt-bd)", hover: "var(--volt-deep)" },
  solid:   { bg: "var(--asphalt)", fg: "var(--bone)", bd: "var(--asphalt)", hover: "var(--concrete-700)" },
  outline: { bg: "transparent", fg: "var(--text)", bd: "var(--text)", hover: "var(--text)", hoverFg: "var(--bg)" },
  ghost:   { bg: "transparent", fg: "var(--text)", bd: "transparent", hover: "var(--surface)" },
};

export function Button({
  children,
  variant = "volt",
  size = "md",
  arrow = false,
  iconLeft = null,
  disabled = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.volt;
  const s = SIZES[size] || SIZES.md;
  const useHoverFg = hover && v.hoverFg;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: s.fontSize,
    lineHeight: 1,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: s.padding,
    border: `var(--border-bold) solid ${v.bd}`,
    borderRadius: "var(--radius-pill)",
    background: hover && !disabled ? v.hover : v.bg,
    color: useHoverFg ? v.hoverFg : v.fg,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transform: press && !disabled ? "scale(0.98)" : "none",
    transition: "background var(--dur-fast) var(--ease-snap), color var(--dur-fast) var(--ease-snap), transform var(--dur-fast) var(--ease-snap)",
    userSelect: "none",
    textDecoration: "none",
    ...style,
  };

  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick,
  };

  const content = (<>{iconLeft}{children}{arrow && ARROW}</>);
  const Tag = href ? "a" : "button";
  return (
    <Tag style={base} href={href} disabled={href ? undefined : disabled} {...handlers} {...rest}>
      {content}
    </Tag>
  );
}
