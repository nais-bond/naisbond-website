import React from "react";

/**
 * NAIS CountryCode - flag emoji for an ISO country code (e.g. "NL") shown next to a
 * rider's name. Renders nothing when the code is missing.
 */
export const flagEmoji = (code) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

export function CountryCode({ code, style }) {
  if (!code) return null;
  return (
    <span
      title={code}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "16px",
        lineHeight: 1,
        flexShrink: 0,
        ...style,
      }}
    >
      {flagEmoji(code)}
    </span>
  );
}
