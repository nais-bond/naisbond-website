import React from "react";

/**
 * NAIS TabBar — boxy solid-border category tabs.
 * Use for page-level content filtering (e.g. Media page).
 * Distinct from FilterPills (rounded mono pills for facet filters).
 */
export function TabBar({
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        overflowX: "auto",
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
      {...rest}
    >
      {options.map((opt) => {
        const key = opt.value ?? opt.label;
        const active = value === key;
        return (
          <TabItem
            key={key}
            label={opt.label}
            active={active}
            onClick={() => onChange && onChange(key)}
          />
        );
      })}
    </div>
  );
}

function TabItem({ label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 800,
        fontSize: "13px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "14px 20px",
        border: "none",
        borderRight: "1px solid var(--border)",
        borderBottom: active ? "2px solid var(--accent-text)" : "none",
        marginBottom: active ? "-2px" : "0",
        background: active ? "var(--asphalt)" : hover ? "var(--surface)" : "transparent",
        color: active ? "var(--bone)" : "var(--text)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "background var(--dur-fast, 120ms) var(--ease-snap), color var(--dur-fast, 120ms) var(--ease-snap)",
        userSelect: "none",
      }}
    >
      {label}
    </button>
  );
}
