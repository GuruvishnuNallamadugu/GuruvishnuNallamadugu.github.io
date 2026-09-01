import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Project case studies.
 * Add a project by dropping a new .mdx file into src/content/projects/.
 * The schema below is enforced at build time — a missing or misspelled
 * field fails the build rather than silently rendering an empty page.
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    /** Sort order — lower numbers appear first. */
    order: z.number(),
    /** Shown on the card and in the hero of the detail page. */
    summary: z.string(),
    organization: z.string(),
    period: z.string(),
    /** Discipline tags, used by the filter chips on /projects. */
    tags: z.array(z.string()),
    /** Software / methods used. */
    stack: z.array(z.string()),
    /** Headline outcome shown large on the card, e.g. "8% faster". */
    metric: z.object({
      value: z.string(),
      label: z.string(),
    }),
    /** Which generative diagram to render for this project. */
    diagram: z.enum(["assembly", "pulley", "chamber", "orbit"]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
