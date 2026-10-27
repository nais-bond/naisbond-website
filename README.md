# Nais bond

Source code for the website of **Nais bond**, the Dutch aggressive inline skating community. The site lists the event calendar, skate lessons, competition results and rankings, skater profiles, the NK rulebook and media appearances.

All site content is in Dutch. The code and this README are in English.

Built with [Astro 5](https://astro.build), React 19 and plain CSS (design tokens in `src/styles/nais/`). Deployed on Netlify from `main`.

## Getting started

Requires Node.js 20+.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build
```

## Contributing

Most contributions are content changes: adding an event, a lesson, a skater or a result. You don't need to touch any code for these. Everything lives in `src/content/` and is validated against the schemas in [`src/content.config.ts`](src/content.config.ts), so `npm run build` tells you if something is missing or malformed.

1. Fork the repo and create a branch.
2. Make your change and run `npm run build` to check it.
3. Open a pull request describing what you added or changed.

For larger code changes, please open an issue first so we can talk it through.

### Add an event

Create `src/content/calendar/YYYY-MM-DD-event-name.md`:

```yaml
---
title: "NK 2026"
meta_title: "NK 2026 - Park"
slug: 2026-10-24-nk
description: "Nederlands Kampioenschap 2026"
date: 2026-10-24T12:00:00Z
publishdate: 2026-06-23T00:00:00Z
image: "../../assets/images/events/2026/nk-2026-poster.jpg"
author: "Nais"
tags: ["Contest", "Amsterdam"]
---
Event description in Markdown.
```

- Put the poster in `src/assets/images/events/<year>/` and reference it with a relative path.
- Add the tag `uitgelicht` to feature the event on the homepage.
- If the exact date isn't known yet, set `dateLabel` (e.g. `"Oktober 2027"`); `date` is then only used for sorting.
- Set `reglement: nk` to link the event to the latest version of that rulebook.

### Add a lesson

Add an entry to the array in `src/content/lessen.json` (`title`, `cities`, `location`, `schedule`, `enroll` URL, `categories`, `draft`). Use `"draft": true` to hide it while you prepare it.

### Add a skater

Add an entry to `src/content/deelnemers.json`. The `id` must be unique: results refer to skaters by this id. Optional fields include `land` (ISO country code such as `NL`), `bio`, `image` and `socials`.

### Add competition results

Results consist of two files with the same name in `src/content/uitslagen/`:

- `event-year.md`: frontmatter (`title`, `slug`, `date`, `data.file`) plus a short description. Set `ranking: nk` if the event counts towards the NK ranking.
- `event-year.json`: `{ "Stage": { "Category": [{ "id": <skater id>, "score": 123, "prize": 100 }] } }`. List skaters in finishing order; `score` and `prize` are optional.

Make sure every skater `id` exists in `deelnemers.json`.

### Rulebooks

Rulebooks live in `src/content/reglementen/<reglement>/<version>.md` with one file per version (semver, e.g. `1.0.0`). The newest non-draft version is the one shown.

### Media

Press and TV appearances go in `src/content/media/` as Markdown files (see the existing ones for the frontmatter).

## Project structure

```text
src/
├── content/            # All site content (see above)
│   ├── calendar/       # Events (Markdown)
│   ├── uitslagen/      # Results (Markdown + JSON)
│   ├── reglementen/    # Rulebook versions (Markdown)
│   ├── media/          # Media appearances (Markdown)
│   ├── lessen.json    # Lessons
│   └── deelnemers.json # Skaters
├── content.config.ts   # Content collection schemas
├── pages/              # Routes
├── layouts/            # Page layouts
├── components/         # React (.jsx) and Astro components
│   └── nais/           # Design-system building blocks (Button, Tag, EventCard, ...)
├── lib/                # Ranking and rulebook helpers
├── styles/nais/        # Design tokens: colors, fonts, spacing, typography
└── assets/images/      # Images processed by Astro
public/                 # Static files (logos, favicon, redirects)
```

## Code conventions

- Astro components for pages and server-side data; React components for interactive UI.
- Query data with `getCollection()` and transform it into plain props before passing it to React components.
- Reuse the design tokens in `src/styles/nais/` and the components in `src/components/nais/` rather than adding one-off styles.
- UI text is Dutch, and dates should be formatted for the `nl-NL` locale.
- Mobile-first, responsive layouts.

## Deployment

Netlify builds `main` automatically (`npm run build`, publishing `dist/`). See [`netlify.toml`](netlify.toml).

## License

No license has been chosen yet. Until one is added, all rights are reserved by the authors.
