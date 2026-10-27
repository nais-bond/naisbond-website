# Copilot Instructions for Naisbond (Dutch Inline Skating Community)

## Project Overview
This is a Dutch inline skating community website built with **Astro 5**, React components, and Tailwind CSS. The site manages events, lessons, competition results, and participant data for the Dutch inline skating scene.

## Architecture & Tech Stack
- **Framework**: Astro 5 with React integration and experimental React children support
- **Styling**: Tailwind CSS 4 + shadcn/ui components (New York variant)
- **Content**: Astro Content Collections with file-based loaders (Markdown + JSON)
- **Deployment**: Netlify (auto-deploys from `main` branch)

## Content Collections Structure
All content is managed through Astro Content Collections in `src/content.config.ts`:

- **`calendar`**: Event markdown files in `src/content/calendar/` with frontmatter schema
- **`lessen`**: Lessons from `src/content/lessen.json` 
- **`deelnemers`**: Participants from `src/content/deelnemers.json`
- **`uitslagen`**: Competition results (MD files + JSON data files)
- **`uitslagenData`**: Raw competition data as JSON

### Event Content Pattern
Events follow this naming: `YYYY-MM-DD-event-name.md` with required frontmatter:
```yaml
---
title: "Event Name"
date: 2025-09-07T12:00:00Z
description: "Event description"
image: "../../assets/images/events/path/to/image.jpg" 
tags: ["Contest", "Location", "uitgelicht"] # "uitgelicht" = featured
---
```

## Key Development Patterns

### Component Architecture
- **Astro components**: Page layouts and server-side rendering (`.astro` files)
- **React components**: Interactive UI elements (`.tsx` files) 
- **shadcn/ui**: Reusable UI components in `src/components/ui/`
- **Path aliases**: Use `@/components`, `@/lib`, etc. (configured in `components.json`)

### Data Flow Patterns
1. **Collection queries**: Use `getCollection('collectionName')` in Astro components
2. **Data transformation**: Transform collection data to match React component props
3. **Sorting**: Events sorted by date descending: `.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())`
4. **Filtering**: Featured events use `.filter(post => post.data.tags.includes('uitgelicht'))`

### Competition Results System
Complex data merging pattern in `Welcome.astro`:
- Fetches raw competition data from `uitslagenData` collection
- Merges with participant data from `deelnemers` collection
- Creates hierarchical structure: `stages -> categories -> participants`

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Production build to ./dist/
npm run preview      # Preview build locally
```

### Adding New Content
- **Events**: Create `.md` file in `src/content/calendar/` with proper frontmatter
- **Lessons**: Update `src/content/lessen.json` array
- **Results**: Add `.md` + `.json` files to `src/content/uitslagen/`

### Styling Conventions  
- Use Tailwind CSS classes consistently
- Follow shadcn/ui component patterns
- Dutch language content throughout
- Mobile-first responsive design

## Important Files to Know
- `src/content.config.ts` - All content collection schemas
- `src/pages/kalender.astro` - Events listing page (data transformation example)
- `src/components/Welcome.astro` - Homepage with complex data merging
- `components.json` - shadcn/ui configuration
- `netlify.toml` - Deployment configuration

## Project-Specific Context
- **Language**: All content and UI text in Dutch
- **Domain**: Dutch inline skating community (competitions, lessons, events)
- **User types**: Skaters, instructors, competition participants
- **Key features**: Event calendar, lesson booking, competition results, participant profiles

When working on this project, prioritize Dutch language consistency, proper date formatting for Dutch locale, and maintaining the existing content collection patterns.