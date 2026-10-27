# Copilot Instructions for Naisbond (Dutch Aggressive Inline Skating Community)

## Project Overview
Website of Nais bond, the Dutch aggressive inline skating community, built with **Astro 5** and React. It shows an event calendar, lessons, competition results and rankings, skater profiles, the NK rulebook and media appearances. See `README.md` for contributor-facing documentation.

## Architecture & Tech Stack
- **Framework**: Astro 5 with React 19 integration (`experimentalReactChildren: true`)
- **Styling**: Plain CSS with design tokens in `src/styles/nais/` (colors, fonts, spacing, typography, effects), imported via `src/styles/global.css`. No Tailwind and no shadcn/ui in use.
- **Content**: Astro Content Collections with file-based loaders (Markdown + JSON)
- **Deployment**: Netlify (auto-deploys from `main`), see `netlify.toml`

## Content Collections Structure
All collections and their Zod schemas are in `src/content.config.ts`; always check the schema before adding or changing content.

- **`calendar`**: events, `src/content/calendar/*.md`
- **`lessen`**: lessons, `src/content/lessen.json`
- **`deelnemers`**: skaters, `src/content/deelnemers.json`
- **`uitslagen`**: competition results, one `.md` per contest in `src/content/uitslagen/`
- **`uitslagenData`**: raw results, the `.json` next to each result `.md`
- **`reglementen`**: rulebook versions, `src/content/reglementen/<reglement>/<semver>.md`
- **`media`**: media appearances, `src/content/media/*.md`

### Event Content Pattern
Events are named `YYYY-MM-DD-event-name.md`. Required frontmatter: `title`, `date`, `image` (relative path into `src/assets/images/`) and `tags`. Optional: `description`, `dateLabel` (shown instead of the date when the exact date is unknown), `reglement` (links to a rulebook, e.g. `nk`). Existing files also carry `meta_title`, `slug`, `publishdate` and `author`.

```yaml
---
title: "Event Name"
date: 2026-10-24T12:00:00Z
description: "Event description"
image: "../../assets/images/events/2026/poster.jpg"
tags: ["Contest", "Amsterdam", "uitgelicht"] # "uitgelicht" = featured
---
```

## Key Development Patterns

### Component Architecture
- **Astro components/pages**: layouts, routing and server-side data (`src/pages`, `src/layouts`, some in `src/components`)
- **React components**: interactive UI (`.jsx` in `src/components`)
- **Design-system building blocks**: `src/components/nais/` (Button, Tag, EventCard, ResultsTable, ...); reuse these before creating new ones
- **Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`)

### Data Flow Patterns
1. Query with `getCollection('name')` / `getEntry()` in `.astro` pages
2. Transform the data into plain props before passing to React components
3. Events are sorted by date descending; featured events filter on the `uitgelicht` tag (see `src/pages/index.astro`, `src/pages/kalender.astro`)
4. Results are merged with skaters: `uitslagenData` ids are looked up in `deelnemers` (see `src/pages/uitslagen/[id].astro`); structure is `stage -> category -> [{ id, score?, prize? }]`

### Ranking and Rulebooks
- `src/lib/ranking.ts`: points per place, NK winner multiplier, yearly rankings
- `src/lib/reglementen.ts`: groups published rulebooks and resolves the latest version

## Development Workflow
```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Production build to ./dist/ (also validates content against schemas)
npm run preview      # Preview build locally
```

### Adding New Content
- **Events**: `.md` file in `src/content/calendar/`; poster in `src/assets/images/events/<year>/`
- **Lessons**: add to the array in `src/content/lessen.json`
- **Skaters**: add to `src/content/deelnemers.json` with a unique `id`
- **Results**: `.md` + `.json` pair in `src/content/uitslagen/`; every `id` must exist in `deelnemers.json`
- **Rulebooks**: new file per version in `src/content/reglementen/<reglement>/`

### Styling Conventions
- Use the tokens in `src/styles/nais/` instead of hard-coded colors, fonts and spacing
- Dutch UI text, mobile-first responsive design

## Important Files to Know
- `src/content.config.ts` - all content collection schemas
- `src/pages/index.astro` - homepage (featured events, latest results)
- `src/pages/kalender.astro` - events listing
- `src/pages/uitslagen/[id].astro` - result page merging results with skaters
- `src/lib/ranking.ts`, `src/lib/reglementen.ts` - ranking and rulebook logic
- `public/_redirects` - Netlify redirects (e.g. renamed skater slugs)
- `netlify.toml` - deployment configuration

## Project-Specific Context
- **Language**: all content and UI text in Dutch
- **Domain**: Dutch aggressive inline skating (competitions, lessons, events)
- **User types**: skaters, instructors, competition participants

When working on this project, prioritize Dutch language consistency, Dutch (`nl-NL`) date formatting, and the existing content collection patterns.
