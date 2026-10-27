import React from "react";

/**
 * NAIS Timeline — vertical year/event list.
 * Used on the Over page history section.
 */
export function Timeline({ items = [], style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <TimelineItem key={i} {...item} last={i === items.length - 1} />
      ))}
    </div>
  );
}

function TimelineItem({ year, title, desc, last }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 2px 1fr",
        gap: "0 24px",
        paddingBottom: last ? 0 : "40px",
      }}
    >
      {/* Year */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--volt)",
          background: "var(--asphalt)",
          textAlign: "right",
          paddingRight: "24px",
          lineHeight: "1.2",
        }}
      >
        {year}
      </span>

      {/* Track + dot */}
      <div style={{ background: "var(--asphalt)", width: "2px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            background: "var(--asphalt)",
            border: "2px solid var(--volt)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Content */}
      <div>
        <p
          style={{
            fontWeight: 800,
            fontSize: "17px",
            lineHeight: 1.2,
            margin: "0 0 4px",
            color: "var(--text)",
          }}
        >
          {title}
        </p>
        {desc && (
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
