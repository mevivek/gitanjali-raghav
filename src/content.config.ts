import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content schemas.
 *
 * These are enforced at build time, so a typo in a filename or a missing
 * field fails the build loudly instead of silently rendering an empty
 * section. Adding a new timeline entry means adding a Markdown file — no
 * component ever needs editing.
 */

/**
 * The signature layout is a two-lane timeline: career on one side, life on
 * the other, sharing one year axis. Both lanes are the same collection
 * distinguished by `lane`, so they stay sorted against each other for free.
 */
const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    /** Sort key and the number drawn on the axis. */
    year: z.number().int().min(1900).max(2100),

    /**
     * Optional finer sort within a year. Use when two entries share a year
     * and the order matters. Lower numbers appear first.
     */
    order: z.number().default(0),

    /** Which side of the axis this belongs on. */
    lane: z.enum(['career', 'life']),

    /** Short headline, e.g. a job title or "Learned to scuba dive". */
    title: z.string().min(1),

    /** Employer, place, or context. Optional — life entries often have none. */
    org: z.string().optional(),

    /** Human-readable date range shown under the title, e.g. "2021 — present". */
    dateLabel: z.string().optional(),

    /** Filename in /public/img. Self-hosted only — never hotlink. */
    image: z.string().optional(),

    /** Required whenever `image` is set; describes the image for screen readers. */
    imageAlt: z.string().optional(),

    /**
     * Marks an entry as unverified. Drafts stay in the repo and are visible
     * to editors but are excluded from the built site. Used for anything
     * inferred rather than confirmed by her.
     */
    draft: z.boolean().default(false),
  })
    .refine((d) => !d.image || (d.imageAlt && d.imageAlt.length > 0), {
      message: 'imageAlt is required whenever image is set',
      path: ['imageAlt'],
    }),
});

/** Standalone cards for the life section: hobbies, passions, what she's into. */
const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string().min(1),
    /** A single emoji used as the card's mark. */
    icon: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/** Optional short writing. Delete the folder entirely if she doesn't want it. */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { timeline, life, notes };
