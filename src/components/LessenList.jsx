import React from "react";
import { FilterPills } from "./nais/FilterPills.jsx";

function LesCard({ school }) {
  const [hover, setHover] = React.useState(false);
  const cityLabel = school.cities.join(", ").toUpperCase();

  return (
    <a
      href={school.enroll}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-elevated)",
        border: `var(--border-bold) solid var(--border-strong)`,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--text)",
        boxShadow: hover ? "var(--shadow-block)" : "none",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative" }}>
        {school.image ? (
          <img
            src={school.image}
            alt={school.title}
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            aspectRatio: "16/9",
            background: "var(--asphalt-raised)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--concrete-400)", letterSpacing: "0.06em" }}>
              Foto: {school.title}
            </span>
          </div>
        )}
        <div style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)" }}>
          <span style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--bone)",
            background: "var(--asphalt)",
            padding: "4px 10px",
            borderRadius: "var(--radius-pill)",
          }}>
            {cityLabel}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)", flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "var(--display-sm)",
            lineHeight: 0.95,
            letterSpacing: "var(--tracking-display)",
            textTransform: "uppercase",
            margin: "0 0 var(--space-2)",
            color: "var(--text)",
          }}>
            {school.title}
          </h3>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
            {school.location}
          </span>
        </div>

        <div style={{ borderTop: "var(--border-hair) solid var(--border)" }} />

        {/* Schedule */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {school.schedule.map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                minWidth: "90px",
              }}>
                {row.day}
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {row.times.map((t, j) => (
                  <span key={j} style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--bone)",
                    background: "var(--asphalt)",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-sm)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "var(--border-hair) solid var(--border)" }} />

        {/* Audience tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {school.categories.some(c => c.toLowerCase().includes("kids")) && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 8px", borderRadius: "var(--radius-pill)", background: "var(--volt)", color: "var(--volt-ink)" }}>Kids</span>
          )}
          {school.categories.some(c => c.toLowerCase().includes("volwassenen")) && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 8px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-strong)", color: "var(--text-muted)" }}>Volwassenen</span>
          )}
        </div>

        <div style={{ borderTop: "var(--border-hair) solid var(--border)" }} />

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          background: hover ? "var(--volt)" : "transparent",
          border: `1px solid ${hover ? "var(--volt)" : "var(--border-strong)"}`,
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: hover ? "var(--asphalt)" : "var(--text)",
          transition: "background var(--dur-base) var(--ease-snap), border-color var(--dur-base) var(--ease-snap), color var(--dur-base) var(--ease-snap)",
        }}>
          Aanmelden ↗
        </div>
      </div>
    </a>
  );
}

export function LessenList({ schools = [] }) {
  const [activeFilter, setActiveFilter] = React.useState(null);

  const filtered =
    activeFilter === "kids"
      ? schools.filter(s => s.categories.some(c => c.toLowerCase().includes("kids")))
      : activeFilter === "volwassenen"
      ? schools.filter(s => s.categories.some(c => c.toLowerCase().includes("volwassenen")))
      : schools;

  const options = [
    { label: "Alles", value: null, count: schools.length },
    { label: "Kids", value: "kids", count: schools.filter(s => s.categories.some(c => c.toLowerCase().includes("kids"))).length },
    { label: "Volwassenen", value: "volwassenen", count: schools.filter(s => s.categories.some(c => c.toLowerCase().includes("volwassenen"))).length },
  ];

  return (
    <>
      <FilterPills options={options} value={activeFilter} onChange={setActiveFilter} style={{ marginBottom: "var(--space-7)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-5)" }}>
        {filtered.map((s, i) => (
          <LesCard key={s.id ?? i} school={s} />
        ))}
      </div>
    </>
  );
}
