import React from "react";

/**
 * NAIS FilterPills — a scrollable row of toggleable mono pills.
 * Single-select by default; pass multi for multi-select.
 */

function Pill({ label, count, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        padding: "7px 14px",
        border: `var(--border-bold) solid ${
          active
            ? "var(--text)"
            : hover
            ? "var(--concrete-400)"
            : "var(--border)"
        }`,
        borderRadius: "var(--radius-pill)",
        background: active ? "var(--text)" : "transparent",
        color: active
          ? "var(--bg)"
          : hover
          ? "var(--text)"
          : "var(--text-muted)",
        cursor: "pointer",
        transition:
          "background var(--dur-fast) var(--ease-snap), color var(--dur-fast) var(--ease-snap), border-color var(--dur-fast) var(--ease-snap)",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {label}
      {count != null && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "10px",
            opacity: active ? 0.65 : 0.45,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function FilterPills({
  options = [],
  value,
  onChange,
  multi = false,
  style,
  ...rest
}) {
  const isActive = (v) =>
    multi
      ? Array.isArray(value) && value.includes(v)
      : value === v;

  const handleClick = (v) => {
    if (!onChange) return;
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    } else {
      onChange(value === v ? null : v);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
        alignItems: "center",
        ...style,
      }}
      {...rest}
    >
      {options.map((opt) => {
        const key = opt.value ?? opt.label;
        return (
          <Pill
            key={key}
            label={opt.label}
            count={opt.count}
            active={isActive(key)}
            onClick={() => handleClick(key)}
          />
        );
      })}
    </div>
  );
}
