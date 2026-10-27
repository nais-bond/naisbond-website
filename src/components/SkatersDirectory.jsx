import React from "react";
import { PersonCard } from "./nais/PersonCard.jsx";
import { FilterPills } from "./nais/FilterPills.jsx";
import { RankBadge } from "./nais/RankBadge.jsx";

export function SkatersDirectory({ riders = [] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return riders.filter((r) => {
      const matchesQuery = !q || r.naam.toLowerCase().includes(q) || r.volledige_naam?.toLowerCase().includes(q);
      const matchesCategory = !category || r.categorie.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [riders, query, category]);

  const categoryOptions = [
    { label: "Alles", value: null, count: riders.length },
    ...["Mannen", "Vrouwen", "Junioren"].map((c) => ({
      label: c,
      value: c,
      count: riders.filter((r) => r.categorie.includes(c)).length,
    })),
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", marginBottom: "var(--space-7)" }}>
        <label htmlFor="skater-search" className="nais-kicker" style={{ display: "block", marginBottom: "calc(var(--space-5) * -0.6)" }}>Zoek een skater</label>
        <input
          id="skater-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Bijvoorbeeld Aniek"
          style={{
            width: "100%",
            maxWidth: "420px",
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 600,
            padding: "12px 16px",
            background: "var(--bg-elevated)",
            color: "var(--text)",
            border: "var(--border-hair) solid var(--border)",
            borderRadius: "var(--radius-sm)",
            outline: "none",
          }}
        />
        <FilterPills options={categoryOptions} value={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)" }}>
          Geen skaters gevonden.
        </p>
      )}
      <RiderGrid riders={filtered.filter((r) => !r.archief && r.land === "NL")} />
      {filtered.some((r) => !r.archief && r.land !== "NL") && (
        <Section
          title="Internationaal & onbekend"
          description={
            <>
              Skaters van buiten Nederland, of waarvan we het land nog niet weten.{" "}
              <a href="mailto:info@naisbond.nl?subject=Landcode" style={{ color: "inherit" }}>
                Mail ons om een landcode aan te vullen.
              </a>
            </>
          }
        >
          <RiderGrid riders={filtered.filter((r) => !r.archief && r.land !== "NL")} />
        </Section>
      )}
      {filtered.some((r) => r.archief) && (
        <Section title="Archief" description="Skaters zonder resultaat in de afgelopen 5 jaar.">
          <RiderGrid riders={filtered.filter((r) => r.archief)} />
        </Section>
      )}
    </>
  );
}

function RiderGrid({ riders }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "var(--space-5)",
      }}
    >
      {riders.map((r) => (
        <a key={r.slug} href={`/skaters/${r.slug}`} className="nais-person-link">
          <PersonCard
            image={r.image}
            name={r.volledige_naam || r.naam}
            country={r.land}
            role={r.categorie.join(", ")}
            badges={r.medals.map((m, i) => <RankBadge key={i} rank={m} />)}
            bio={r.resultCount > 0 ? `${r.resultCount} ${r.resultCount === 1 ? "resultaat" : "resultaten"}` : undefined}
          />
        </a>
      ))}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "var(--display-lg)",
          lineHeight: "var(--leading-tight)",
          letterSpacing: "var(--tracking-display)",
          textTransform: "uppercase",
          margin: "var(--space-9, 80px) 0 var(--space-2)",
        }}
      >
        {title}
      </h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)", margin: "0 0 var(--space-6)" }}>
        {description}
      </p>
      {children}
    </>
  );
}
