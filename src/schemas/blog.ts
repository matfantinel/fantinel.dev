import { z } from 'astro:content';

// Blog post schema definition
export const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  coverImage: z.string().optional().nullable(),
  coverImageAlt: z.string().optional().nullable(),
  showImage: z.boolean().optional(),
  showToc: z.boolean().optional(),
  hidden: z.boolean().optional(),
  categories: z.array(z.string()),
  date: z.coerce.date(),
  updated: z.coerce.date().optional().nullable(),
  type: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  readingTime: z.string().optional().nullable(),
  author: z.object({
    name: z.string(),
    image: z.string().optional().nullable(),
  }).optional().nullable(),
});

// Infer the type from the schema
export type BlogPost = z.infer<typeof blogSchema>;
