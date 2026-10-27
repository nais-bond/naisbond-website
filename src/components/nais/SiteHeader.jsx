import React from "react";
import { Button } from "./Button.jsx";

function getInitialDark() {
  if (typeof window === "undefined") return false;
  try {
    const s = localStorage.getItem("nais-theme");
    if (s === "dark") return true;
    if (s === "light") return false;
  } catch(e) {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const SUN = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MOON = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const HAMBURGER = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CLOSE = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const css = `
  .nais-header-nav { display: flex; align-items: center; gap: var(--space-6); flex: 1; justify-content: center; }
  .nais-header-hamburger { display: none; }
  .nais-mobile-menu { display: none; }
  .nais-mobile-menu-open { display: none; }
  .nais-nav-link { font-family: var(--font-sans); font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--bone); text-decoration: none; padding-bottom: 3px; border-bottom: 2px solid transparent; opacity: 0.78; transition: opacity var(--dur-fast) var(--ease-snap), border-color var(--dur-fast) var(--ease-snap); }
  .nais-nav-link:hover { opacity: 1; border-bottom-color: var(--concrete-400); }
  .nais-nav-link[aria-current="page"] { opacity: 1; border-bottom-color: var(--volt); }
  .nais-mobile-menu-link { font-family: var(--font-display); font-weight: 400; font-size: clamp(32px, 8vw, 48px); line-height: 0.95; letter-spacing: var(--tracking-display); text-transform: uppercase; color: var(--bone); text-decoration: none; }
  .nais-mobile-menu-link[aria-current="page"] { color: var(--volt); }
  @media (max-width: 860px) {
    .nais-header-nav { display: none; }
    .nais-header-hamburger { display: flex; }
    .nais-header-cta-desktop { display: none !important; }
    .nais-mobile-menu-open { display: flex; flex-direction: column; position: fixed; inset: 0; top: var(--nais-header-h, 67px); background: var(--asphalt); z-index: 99; padding: var(--space-6); gap: var(--space-5); overflow-y: auto; overscroll-behavior: contain; }
  }
`;

export function SiteHeader({
  logo = "/logos/nais-logo-bone.svg",
  links = [
    { label: "Kalender", href: "/kalender" },
    { label: "Lessen", href: "/lessen" },
    { label: "Uitslagen", href: "/uitslagen" },
    { label: "Media", href: "/media" },
    { label: "Over", href: "/over" },
  ],
  active = "Kalender",
  cta = { label: "Word lid", href: "/word-lid" },
  showThemeToggle = true,
  style,
  ...rest
}) {
  // Start from the server-rendered value and read the real preference after
  // hydration, so the toggle's aria-label never mismatches the SSR markup.
  const [dark, setDark] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setDark(getInitialDark());
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
    try { localStorage.setItem("nais-theme", dark ? "dark" : "light"); } catch(e) {}
  }, [dark, ready]);

  const headerRef = React.useRef(null);
  const toggleRef = React.useRef(null);

  // While the mobile menu is open: Esc closes it (focus returns to the button),
  // the page behind it does not scroll, and widening past the breakpoint closes it.
  // (Only a real width change closes it: mobile browsers fire resize when their
  // toolbar collapses, which must not dismiss the menu.)
  React.useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current;
    if (header) document.documentElement.style.setProperty("--nais-header-h", `${header.getBoundingClientRect().bottom}px`);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== width) { width = window.innerWidth; if (width > 860) setMenuOpen(false); }
    };
    const onKey = (e) => { if (e.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header
        ref={headerRef}
        data-theme="asphalt"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "16px var(--space-6)",
          background: "var(--asphalt)",
          borderBottom: "var(--border-hair) solid var(--asphalt-line)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          ...style,
        }}
        {...rest}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img src={logo} alt="NAIS" style={{ height: "34px", width: "auto", display: "block" }} />
        </a>

        {/* Desktop nav */}
        <nav className="nais-header-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nais-nav-link" aria-current={l.label === active ? "page" : undefined}>{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flex: "none" }}>
          {showThemeToggle && (
            <button
              onClick={() => setDark(d => !d)}
              aria-label={dark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px",
                background: "transparent",
                border: "var(--border-bold) solid var(--asphalt-line)",
                borderRadius: "var(--radius-pill)",
                color: "var(--bone)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span className="nais-theme-sun"><SUN /></span>
              <span className="nais-theme-moon"><MOON /></span>
            </button>
          )}

          {/* Desktop CTA */}
          {cta && (
            <Button
              variant="volt" size="sm"
              href={cta.href} target={cta.target} rel={cta.rel}
              arrow
              className="nais-header-cta-desktop"
            >
              {cta.label}
            </Button>
          )}

          {/* Hamburger */}
          <button
            ref={toggleRef}
            className="nais-header-hamburger"
            aria-expanded={menuOpen}
            aria-controls="nais-mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            style={{
              alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px",
              background: "transparent",
              border: "var(--border-bold) solid var(--asphalt-line)",
              borderRadius: "var(--radius-pill)",
              color: "var(--bone)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {menuOpen ? <CLOSE /> : <HAMBURGER />}
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="nais-mobile-menu-open" id="nais-mobile-menu" data-theme="asphalt">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nais-mobile-menu-link"
              aria-current={l.label === active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {cta && (
            <div style={{ marginTop: "var(--space-4)" }}>
              <Button variant="volt" href={cta.href} target={cta.target} rel={cta.rel} arrow>
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
