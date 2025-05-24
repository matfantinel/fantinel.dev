import { z } from 'astro:content';

// Blog post schema definition
export const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  coverImage: z.string().optional().nullable(),
  coverImageAlt: z.string().optional().nullable(),
  showToc: z.boolean().optional(),
  hidden: z.boolean().optional(),
  categories: z.array(z.string()),
  date: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  // Props below are filled dynamically based on content
  readingTime: z.string().optional().nullable(),
  toc: z.array(z.object({
    slug: z.string(),
    text: z.string(),
    depth: z.number(),
  })).optional().nullable(),
  author: z.object({
    name: z.string(),
    image: z.string().optional().nullable(),
  }).optional().nullable(),
});

// Infer the type from the schema
export type BlogPost = z.infer<typeof blogSchema>;
