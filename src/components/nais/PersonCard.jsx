import React from "react";
import { CountryCode } from "./CountryCode.jsx";

/**
 * NAIS PersonCard - athlete / team member tile.
 * Theme-aware: a bordered card on the page ground (white-ish in light,
 * raised asphalt in dark). Photo only when one exists; the footer row holds
 * podium chips (children of `badges`) and the result count so every card in a
 * grid lines up at the bottom regardless of content.
 */
export function PersonCard({ image, name, country, role, bio, badges, style, ...rest }) {
  return (
    <div className="nais-person-card" style={style} {...rest}>
      {image && (
        <img
          src={image}
          alt={name}
          loading="lazy"
          style={{ width: "56px", height: "56px", borderRadius: "var(--radius-sm)", objectFit: "cover", display: "block", border: "var(--border-hair) solid var(--border)" }}
        />
      )}

      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 400, textTransform: "uppercase", lineHeight: 1, margin: "0 0 6px", color: "var(--text)", overflowWrap: "anywhere" }}>
          {name}
          {country && <CountryCode code={country} style={{ fontSize: "18px", marginLeft: "8px", verticalAlign: "middle" }} />}
        </p>
        {role && <span className="nais-kicker">{role}</span>}
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", minHeight: "26px" }}>
        <div style={{ display: "flex", gap: "6px" }}>{badges}</div>
        {bio && <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>{bio}</span>}
      </div>
    </div>
  );
}
