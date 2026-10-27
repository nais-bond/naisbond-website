import React from "react";

const css = `
  .lessen-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: var(--space-5); align-items: stretch; }
  .lessen-feature { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-6); background: var(--asphalt-raised); border: var(--border-hair) solid var(--asphalt-line); border-radius: var(--radius-sm); text-decoration: none; color: inherit; transition: transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap); }
  .lessen-feature:hover { transform: translateY(-3px); box-shadow: var(--shadow-block); }
  .lessen-list { display: flex; flex-direction: column; border-top: var(--border-hair) solid var(--asphalt-line); }
  .lessen-row { display: grid; grid-template-columns: 1fr auto; gap: var(--space-4); align-items: baseline; padding: var(--space-4) 0; border-bottom: var(--border-hair) solid var(--asphalt-line); text-decoration: none; color: inherit; }
  .lessen-row:hover .lessen-row-name { color: var(--volt); }
  .lessen-row-name { font-family: var(--font-display); text-transform: uppercase; font-weight: 400; font-size: var(--display-sm); line-height: 1; margin: 0; color: var(--bone); transition: color var(--dur-fast) var(--ease-snap); }
  .lessen-meta { font-family: var(--font-mono); font-size: 12px; color: var(--concrete-300); line-height: 1.5; }
  .lessen-day { font-family: var(--font-mono); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-text); }
  @media (max-width: 760px) { .lessen-grid { grid-template-columns: 1fr; } .lessen-feature { padding: var(--space-5); } }
  @media (prefers-reduced-motion: reduce) { .lessen-feature { transition: none; } .lessen-feature:hover { transform: none; } }
`;

/** Homepage lessons: one featured school plus a compact list of three more (random each visit). */
export function HomepageLessen({ schools = [] }) {
  const [shown, setShown] = React.useState([]);

  React.useEffect(() => {
    const shuffled = [...schools].sort(() => Math.random() - 0.5);
    setShown(shuffled.slice(0, 4));
  }, []);

  if (shown.length === 0) return null;
  const [feature, ...rest] = shown;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="lessen-grid">
        <a href={feature.href} className="lessen-feature">
          <span className="lessen-day">{feature.day}</span>
          <h3 style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontWeight: 400, fontSize: "var(--display-md)", lineHeight: 0.95, margin: 0, color: "var(--bone)" }}>
            {feature.name}
          </h3>
          <div className="lessen-meta">
            <div>{feature.city}</div>
            <div>{feature.time}</div>
          </div>
          {feature.level && (
            <p style={{ margin: "auto 0 0", paddingTop: "var(--space-4)", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--concrete-300)" }}>
              {feature.level}
            </p>
          )}
        </a>
        <div className="lessen-list">
          {rest.map((s, i) => (
            <a key={i} href={s.href} className="lessen-row">
              <div>
                <h3 className="lessen-row-name">{s.name}</h3>
                <div className="lessen-meta" style={{ marginTop: "6px" }}>{s.city}{s.level ? `, ${s.level.toLowerCase()}` : ""}</div>
              </div>
              <div className="lessen-meta" style={{ textAlign: "right" }}>
                <div className="lessen-day">{s.day}</div>
                <div>{s.time}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
