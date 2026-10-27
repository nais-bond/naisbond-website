import React from "react";
import { Tag } from "./Tag.jsx";

/**
 * NAIS MediaCard — blog posts, news articles, video recaps, interviews.
 * Vertical (default) or horizontal layout. Follows EventCard's hover idiom.
 */
export function MediaCard({
  image,
  category,
  date,
  title,
  excerpt,
  author,
  readTime,
  href = "#",
  layout = "vertical",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const horiz = layout === "horizontal";

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: horiz ? "row" : "column",
        background: "var(--bg-elevated)",
        border: "var(--border-hair) solid var(--border)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--text)",
        boxShadow: hover ? "var(--shadow-block)" : "none",
        transform: hover ? "translateY(-3px)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)",
        ...style,
      }}
      {...rest}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          flexShrink: 0,
          ...(horiz
            ? { width: "260px" }
            : { aspectRatio: "16 / 9" }),
          overflow: "hidden",
          background: "var(--asphalt)",
        }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform var(--dur-slow) var(--ease-out)",
            }}
          />
        ) : (
          /* Flat placeholder */
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: horiz ? "160px" : "180px",
              background: "var(--asphalt-raised)",
              display: "flex",
              alignItems: "flex-end",
              padding: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--bone)",
                opacity: 0.6,
              }}
            >
              Media
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          padding: "var(--space-5)",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Meta row: category + date */}
        {(category || date) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              flexWrap: "wrap",
            }}
          >
            {category && (
              <Tag tone="ghost" size="sm">
                {category}
              </Tag>
            )}
            {date && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--label-sm)",
                  fontWeight: 700,
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                {date}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: horiz ? "var(--display-md)" : "var(--display-sm)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-display)",
            textTransform: "uppercase",
            margin: 0,
            color: "var(--text)",
          }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {excerpt}
          </p>
        )}

        {/* Footer: author + read time */}
        {(author || readTime) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-3)",
              marginTop: "auto",
              paddingTop: "var(--space-3)",
              borderTop: "1px solid var(--border)",
            }}
          >
            {author && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "var(--text)",
                }}
              >
                {author}
              </span>
            )}
            {readTime && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                {readTime}
              </span>
            )}
          </div>
        )}
      </div>
    </a>
  );
}
