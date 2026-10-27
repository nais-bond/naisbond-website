import React from "react";
import { Tag } from "./Tag.jsx";
import { Badge } from "./Badge.jsx";

/**
 * NAIS EventCard — the signature reusable. Full-bleed photo with the date,
 * title and tags overlaid at the bottom. The backbone of the calendar.
 */
export function EventCard({
  image,
  title,
  date,
  city,
  tags = [],
  badge = null,
  href = "#",
  featured = false,
  fill = false,   // stretch to the grid cell instead of keeping an aspect ratio
  style,
  // Consumed by HomepageAgenda for badge logic — pull out of rest so
  // they don't leak onto the DOM <a> (React non-boolean-attr warning).
  uitgelicht,
  inschrijving,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-theme="asphalt"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minWidth: 0,
        minHeight: featured ? "420px" : "240px",
        ...(fill ? { height: "100%" } : { aspectRatio: featured ? "16 / 10" : "4 / 3" }),
        background: "var(--asphalt)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--bone)",
        ...style,
      }}
      {...rest}
    >
      {image && (
        <img
          src={image}
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform var(--dur-slow) var(--ease-out)",
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0) 35%, rgba(17,17,17,.82) 100%)" }} />
      {badge && (
        <div style={{ position: "absolute", top: "14px", left: "14px" }}>{badge}</div>
      )}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-2)", padding: "var(--space-5)" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {[date, city].filter(Boolean).join(", ")}
        </span>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: featured ? "var(--display-lg)" : "var(--display-sm)",
          lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)",
          margin: 0, color: "var(--bone)",
        }}>{title}</h3>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", paddingTop: "var(--space-1)" }}>
            {tags.map((t, i) => <Tag key={i} tone="ghost" size="sm" style={{ color: "var(--bone)", borderColor: "rgba(246,246,244,.5)" }}>{t}</Tag>)}
          </div>
        )}
      </div>
    </a>
  );
}
