import React from "react";

/**
 * NAIS ResultsTable — contest rankings, leaderboards, event results.
 * Mono numbers, bold rank badges, clean structural rows.
 */

const RANK_BG = ["var(--asphalt)", "transparent", "transparent"];
const RANK_FG = ["var(--bone)", "var(--text)", "var(--text)"];

function RankBadge({ rank, index }) {
  const top = index < 3;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "var(--radius-xs)",
        background: top ? RANK_BG[index] : "transparent",
        border: top && index > 0 ? "var(--border-bold) solid var(--border)" : "none",
        fontFamily: "var(--font-mono)",
        fontWeight: 900,
        fontSize: "13px",
        color: top ? RANK_FG[index] : "var(--text-faint)",
        flexShrink: 0,
      }}
    >
      {rank}
    </span>
  );
}

function Tr({ row, columns, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: "1px solid var(--border)",
        background: hover
          ? "var(--surface)"
          : index % 2 === 1
          ? "rgba(19,19,18,0.025)"
          : "transparent",
        transition: "background var(--dur-fast) var(--ease-snap)",
      }}
    >
      {columns.map((col, ci) => {
        const val = row[col.key];
        const isRank = col.type === "rank";
        const isMono = col.type === "score" || col.type === "number" || isRank;

        return (
          <td
            key={ci}
            style={{
              padding: "var(--space-3) var(--space-4)",
              paddingLeft: ci === 0 ? "0" : "var(--space-4)",
              paddingRight:
                ci === columns.length - 1 ? "0" : "var(--space-4)",
              fontFamily: isMono ? "var(--font-mono)" : "var(--font-sans)",
              fontWeight: isMono ? 700 : 400,
              fontSize: isRank ? "var(--text-xs)" : "var(--text-sm)",
              color:
                col.muted ? "var(--text-muted)" : "var(--text)",
              textAlign: col.align || "left",
              verticalAlign: "middle",
              whiteSpace: col.wrap ? "normal" : "nowrap",
            }}
          >
            {isRank ? <RankBadge rank={val} index={index} /> : val}
          </td>
        );
      })}
    </tr>
  );
}

export function ResultsTable({
  columns = [],
  rows = [],
  caption,
  style,
  ...rest
}) {
  return (
    <div style={{ overflowX: "auto", width: "100%", ...style }} {...rest}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "auto",
        }}
      >
        {caption && (
          <caption
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--label-sm)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textAlign: "left",
              paddingBottom: "var(--space-3)",
              captionSide: "top",
            }}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr
            style={{
              borderBottom: "var(--border-brut) solid var(--border-strong)",
            }}
          >
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--label-sm)",
                  fontWeight: 700,
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  padding: "var(--space-3) var(--space-4)",
                  paddingLeft: i === 0 ? "0" : "var(--space-4)",
                  paddingRight:
                    i === columns.length - 1 ? "0" : "var(--space-4)",
                  textAlign: col.align || "left",
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <Tr key={ri} row={row} columns={columns} index={ri} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
