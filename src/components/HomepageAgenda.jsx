import React from "react";
import { EventCard } from "./nais/EventCard.jsx";
import { SectionHeader } from "./nais/SectionHeader.jsx";
import { Button } from "./nais/Button.jsx";
import { Badge } from "./nais/Badge.jsx";

const css = `
  .agenda-top { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: var(--space-5); margin-top: var(--space-7); }
  .agenda-stack { display: grid; grid-template-rows: 1fr 1fr; min-width: 0; gap: var(--space-5); }
  .agenda-bottom { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-5); margin-top: var(--space-5); }
  @media (max-width: 700px) {
    .agenda-top { grid-template-columns: 1fr; }
    .agenda-stack { grid-template-rows: unset; grid-template-columns: 1fr; }
    .agenda-bottom { grid-template-columns: 1fr; }
  }
`;

export function HomepageAgenda({ events = [] }) {
  const [featured, ...rest] = events;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {events.length > 0 && (
        <section
          id="agenda"
          style={{ background: "var(--bg)", padding: "var(--space-9) var(--space-6)" }}
        >
          <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
            <SectionHeader
              title="Aankomende en recente contests"
              action={
                <Button variant="outline" arrow href="/kalender">
                  Hele kalender
                </Button>
              }
            />
            <div className="agenda-top">
              {featured && (
                <EventCard
                  {...featured}
                  featured
                  fill
                  badge={
                    featured.uitgelicht ? (
                      <Badge tone="volt">Uitgelicht</Badge>
                    ) : featured.inschrijving ? (
                      <Badge tone="volt" dot>Inschrijving open</Badge>
                    ) : null
                  }
                />
              )}
              <div className="agenda-stack">
                {rest.slice(0, 2).map((e, i) => (
                  <EventCard key={i} fill {...e} />
                ))}
              </div>
            </div>
            {rest.length > 2 && (
              <div className="agenda-bottom">
                {rest.slice(2, 5).map((e, i) => (
                  <EventCard key={i} fill {...e} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
