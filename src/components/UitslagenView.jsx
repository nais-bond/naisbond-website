import React from "react";

import { RankBadge } from "./nais/RankBadge.jsx";
import { CountryCode } from "./nais/CountryCode.jsx";

function ScoreBar({ score, max }) {
  const pct = Math.min((score / max) * 100, 100);
  const color = pct > 80 ? "var(--accent-text)" : pct > 70 ? "var(--concrete-300)" : "var(--concrete-400)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
      <div style={{ flex: 1, height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden", minWidth: "60px" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "2px" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, width: "40px", textAlign: "right", color: pct > 80 ? "var(--accent-text)" : "var(--text)", flexShrink: 0 }}>
        {typeof score === "number" ? score.toFixed(1) : score}
      </span>
    </div>
  );
}

const formatPrize = (n) => `€${n.toLocaleString("nl-NL")}`;

function ResultRow({ participant, index, maxScore, hasScores, hasPrizes }) {
  const [hover, setHover] = React.useState(false);
  const isFirst = index === 0;
  const hasScore = participant.score != null && participant.score !== "-";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: `44px 1fr${hasScores ? " 160px" : ""}${hasPrizes ? " 80px" : ""}`,
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-5)",
        borderBottom: "1px solid var(--border)",
        background: isFirst
          ? "rgba(212,255,0,0.04)"
          : hover
          ? "var(--bg-elevated)"
          : "transparent",
        alignItems: "center",
        transition: "background 0.12s",
      }}
    >
      {/* Rank / medal */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {index < 3 ? (
          <RankBadge rank={index + 1} />
        ) : (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--text-faint)",
            width: "28px",
            textAlign: "center",
          }}>
            {index + 1}
          </span>
        )}
      </div>

      {/* Name */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", minWidth: 0 }}>
        {participant.slug ? (
          <a
            href={`/skaters/${participant.slug}`}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: isFirst ? 800 : 600,
              color: "var(--text)",
              textDecoration: hover ? "underline" : "none",
              width: "fit-content",
            }}
          >
            {participant.volledige_naam || participant.naam || "Onbekend"}
          </a>
        ) : (
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: isFirst ? 800 : 600,
            color: "var(--text)",
          }}>
            {participant.volledige_naam || participant.naam || "Onbekend"}
          </span>
        )}
        <CountryCode code={participant.land} />
      </div>

      {/* Score bar (only when scores exist) */}
      {hasScores && (
        <div>
          {hasScore ? (
            <ScoreBar score={participant.score} max={maxScore} />
          ) : (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-faint)" }}>-</span>
          )}
        </div>
      )}

      {/* Prize money (only when prizes exist) */}
      {hasPrizes && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, textAlign: "right", color: participant.prize != null ? "var(--text)" : "var(--text-faint)" }}>
          {participant.prize != null ? formatPrize(participant.prize) : ""}
        </span>
      )}
    </div>
  );
}

function ResultsBlock({ participants }) {
  const scores = participants.map(p => p.score).filter(s => s != null && typeof s === "number");
  const hasScores = scores.length > 0;
  const maxScore = hasScores ? Math.max(...scores) : 100;
  const hasPrizes = participants.some(p => p.prize != null);

  return (
    <div style={{ border: "var(--border-hair) solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
      {/* Table header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `44px 1fr${hasScores ? " 160px" : ""}${hasPrizes ? " 80px" : ""}`,
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-5)",
        borderBottom: "var(--border-brut) solid var(--border-strong)",
        background: "var(--bg-elevated)",
      }}>
        {["#", "Naam", ...(hasScores ? ["Score"] : []), ...(hasPrizes ? ["Prijs"] : [])].map((h, i) => (
          <span key={i} style={{
            textAlign: h === "Prijs" ? "right" : undefined,
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {participants.map((p, i) => (
        <ResultRow key={i} participant={p} index={i} maxScore={maxScore} hasScores={hasScores} hasPrizes={hasPrizes} />
      ))}
    </div>
  );
}

const slugify = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Alle fases en categorieën onder elkaar met anchors, zodat elke uitslag direct te linken en te indexeren is.
export function UitslagenView({ stages = {} }) {
  const sections = Object.entries(stages).flatMap(([stage, cats]) =>
    Object.entries(cats).map(([category, participants]) => ({
      stage,
      category,
      participants,
      id: `${slugify(stage)}-${slugify(category)}`,
    }))
  );

  if (sections.length === 0) return null;

  return (
    <div>
      {sections.length > 1 && (
        <nav aria-label="Spring naar uitslag" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              style={{
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase",
                letterSpacing: "0.04em", padding: "10px 16px", border: "var(--border-bold) solid var(--border-strong)",
                borderRadius: "var(--radius-pill)", color: "var(--text)", textDecoration: "none",
              }}
            >
              {sec.stage} · {sec.category}
            </a>
          ))}
        </nav>
      )}

      {sections.map((sec) => (
        <section key={sec.id} id={sec.id} style={{ scrollMarginTop: "90px", marginBottom: "var(--space-9)" }}>
          <div style={{ marginBottom: "var(--space-5)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-text)" }}>
              {sec.category}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "var(--display-sm)", lineHeight: 0.95, letterSpacing: "var(--tracking-display)", textTransform: "uppercase", margin: "var(--space-2) 0 0" }}>
              {sec.stage}
            </h2>
          </div>
          <ResultsBlock participants={sec.participants} />
        </section>
      ))}
    </div>
  );
}
