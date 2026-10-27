import React from "react";

/**
 * NAIS Tabs — structural tab bar. Sharp underline or solid pill variants.
 * Controlled: pass `value` + `onChange`. Uncontrolled: use internal state.
 */

function TabItem({ tab, active, variant, onClick }) {
  const [hover, setHover] = React.useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: 800,
    fontSize: "12px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    lineHeight: 1,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    transition:
      "color var(--dur-fast) var(--ease-snap), background var(--dur-fast) var(--ease-snap), border-color var(--dur-fast) var(--ease-snap)",
    whiteSpace: "nowrap",
  };

  const count =
    tab.count != null ? (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "10px",
          opacity: active ? 0.7 : 0.4,
        }}
      >
        {tab.count}
      </span>
    ) : null;

  if (variant === "solid") {
    return (
      <button
        role="tab"
        aria-selected={active}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...base,
          padding: "9px 18px",
          border: `var(--border-bold) solid ${
            active ? "var(--asphalt)" : hover ? "var(--concrete-400)" : "var(--border)"
          }`,
          borderRadius: "var(--radius-sm)",
          background: active
            ? "var(--asphalt)"
            : hover
            ? "var(--surface)"
            : "transparent",
          color: active
            ? "var(--bone)"
            : hover
            ? "var(--text)"
            : "var(--text-muted)",
        }}
      >
        {tab.label}
        {count}
      </button>
    );
  }

  // underline (default)
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        padding: "12px 4px",
        marginRight: "24px",
        borderBottom: `var(--border-bold) solid ${
          active ? "var(--asphalt)" : "transparent"
        }`,
        marginBottom: "-2px",
        color: active
          ? "var(--text)"
          : hover
          ? "var(--text-muted)"
          : "var(--text-faint)",
      }}
    >
      {tab.label}
      {count}
    </button>
  );
}

export function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = "underline",
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? tabs[0]?.value ?? null
  );
  const active = value !== undefined ? value : internal;

  const handleChange = (v) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  const wrapStyle =
    variant === "underline"
      ? {
          display: "flex",
          alignItems: "flex-end",
          borderBottom: "var(--border-bold) solid var(--border)",
          ...style,
        }
      : {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          flexWrap: "wrap",
          ...style,
        };

  return (
    <div role="tablist" style={wrapStyle} {...rest}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.value}
          tab={tab}
          active={tab.value === active}
          variant={variant}
          onClick={() => handleChange(tab.value)}
        />
      ))}
    </div>
  );
}
