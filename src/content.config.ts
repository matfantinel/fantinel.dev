import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./public/cms/articles" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    coverImage: z.string().optional().nullable(),
    coverImageAlt: z.string().optional().nullable(),
    showImage: z.boolean().optional(),
    showToc: z.boolean().optional(),
    hidden: z.boolean().optional(),
    categories: z.array(z.string()),
    // Dates are currently not consistently formatted in the markdown files
    // "coerce" will attempt to parse the date string into a Date object
    date: z.coerce.date(),
    updated: z.coerce.date().optional().nullable(),
    // To be removed later
    type: z.string().optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
  })
});

export const collections = { blog };