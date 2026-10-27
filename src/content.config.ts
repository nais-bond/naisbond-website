// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const calendar = defineCollection({
      loader: glob({ pattern: "**/*.md", base: "./src/content/calendar" }),
      schema: ({ image }) => z.object({ 
        title: z.string(),
        date: z.coerce.date(),
        // Exact date not known yet (e.g. "Oktober 2027"): shown instead of the formatted date. `date` then only sorts.
        dateLabel: z.string().optional(),
        description: z.string().optional(),
        image: image(),
        tags: z.array(z.string()),
        // Links the event to a reglement (e.g. "nk"); the event page shows the latest version.
        reglement: z.string().optional(),
      })

});

// One file per version: src/content/reglementen/<reglement>/<version>.md
const reglementen = defineCollection({
      // Keep dots in ids so 1.10.0 and 11.0.0 don't collide after slugifying.
      loader: glob({ pattern: "**/*.md", base: "./src/content/reglementen", generateId: ({ entry }) => entry.replace(/\.md$/, "") }),
      schema: z.object({
        reglement: z.string(),
        title: z.string(),
        shortTitle: z.string(),
        version: z.string().regex(/^\d+\.\d+\.\d+$/, "Gebruik semver, bv. 1.0.0"),
        date: z.coerce.date(),
        draft: z.boolean().optional(),
      })
});

const media = defineCollection({
      loader: glob({ pattern: "**/*.md", base: "./src/content/media" }),
      schema: ({ image }) => z.object({
        title: z.string(),
        show: z.string(),
        meta_title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        publishdate: z.coerce.date(),
        image: z.string(),
        categories: z.array(z.string()),
        author: z.string(),
        tags: z.array(z.string()),
        draft: z.boolean(),
        link: z.string().url().optional(),
        youtube: z.string().url().optional(),
      })
});

const lessen = defineCollection({
      loader: file("./src/content/lessen.json"),
      schema: z.object({
        title: z.string(),
        cities: z.array(z.string()),
        location: z.string(),
        image: z.string().nullable().optional(),
        schedule: z.array(z.object({
          day: z.string(),
          times: z.array(z.string()),
        })),
        enroll: z.string().url(),
        categories: z.array(z.string()),
        draft: z.boolean(),
      })
});

const deelnemers = defineCollection({
      loader: file("./src/content/deelnemers.json"),
      schema: z.object({
        id: z.number(),
        naam: z.string(),
        volledige_naam: z.string().optional(),
        slug: z.string(),
        clubId: z.number().optional(),
        // ISO 3166-1 alpha-2 landcode (bv. "NL"); optioneel.
        land: z.string().regex(/^[A-Z]{2}$/).optional(),
        categorie: z.array(z.enum(["Mannen", "Vrouwen", "Junioren"])),
        image: z.string().optional(),
        bio: z.string().optional(),
        socials: z.object({
          instagram: z.string().url().optional(),
          website: z.string().url().optional(),
        }).optional(),
      })
});

const participantSchema = z.object({
  id: z.number(),
  score: z.number().optional(), // Some entries (e.g. voorrondes) don't have scores
  prize: z.number().optional(), // Prize money in euros
});

const categorySchema = z.array(participantSchema);
const stageSchema = z.record(categorySchema);
const contestDataSchema = z.record(stageSchema);

const uitslagen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/uitslagen" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    unknownDate: z.boolean().optional(),
    // "nk": 1e plaats in de finale telt dubbel in de ranking.
    ranking: z.enum(["nk"]).optional(),
    author: z.string().optional(),
    data: z.object({
    file: z.string()
  })
  })
});


export const uitslagenData = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/uitslagen" }),
  schema: contestDataSchema,
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { calendar, media, lessen, deelnemers, uitslagen, uitslagenData, reglementen };