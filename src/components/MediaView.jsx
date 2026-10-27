import React from "react";
import { TabBar } from "./nais/TabBar.jsx";
import { MediaCard } from "./nais/MediaCard.jsx";

export function MediaView({ items = [] }) {
  const categories = ["Alles", ...Array.from(new Set(items.map((i) => i.show).filter(Boolean)))];
  const [active, setActive] = React.useState("Alles");

  const filtered = active === "Alles" ? items : items.filter((i) => i.show === active);

  const options = categories.map((c) => ({ label: c, value: c }));

  return (
    <>
      <TabBar
        options={options}
        value={active}
        onChange={setActive}
        style={{ marginBottom: "var(--space-7)", borderBottom: "var(--border-bold) solid var(--border-strong)" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: "var(--space-5)",
        }}
      >
        {filtered.map((item) => (
          <MediaCard
            key={item.href}
            image={item.image}
            category={item.show}
            date={item.date}
            title={item.title}
            excerpt={item.description}
            href={item.href}
          />
        ))}
      </div>
    </>
  );
}
