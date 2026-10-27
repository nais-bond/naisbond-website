import React from "react";
import { EventCard } from "./nais/EventCard.jsx";
import { FilterPills } from "./nais/FilterPills.jsx";

export function KalenderList({ events = [], allTags = [] }) {
  const [activeTag, setActiveTag] = React.useState(null);

  const filtered = activeTag
    ? events.filter((e) => e.tags.includes(activeTag))
    : events;

  const options = [
    { label: "Alles", value: null, count: events.length },
    ...allTags.map((t) => ({
      label: t,
      value: t,
      count: events.filter((e) => e.tags.includes(t)).length,
    })),
  ];

  return (
    <>
      <FilterPills
        options={options}
        value={activeTag}
        onChange={setActiveTag}
        style={{ marginBottom: "var(--space-7)" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "var(--space-5)",
        }}
      >
        {filtered.map((e) => (
          <EventCard
            key={e.href}
            image={e.image}
            title={e.title}
            date={e.date}
            city={e.city}
            tags={e.tags}
            href={e.href}
          />
        ))}
        {filtered.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--text-muted)",
              gridColumn: "1/-1",
            }}
          >
            Geen evenementen gevonden.
          </p>
        )}
      </div>
    </>
  );
}
