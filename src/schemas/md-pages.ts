import { z } from 'astro/zod';

// Polaroid schema for hero sections
const polaroidSchema = z.object({
  title: z.string(),
  image: z.string(),
  imageAlt: z.string().optional(),
  content: z.string().optional(),
  photoDate: z.date().optional(),
  rotation: z.number().optional(),
});

// MdPage schema definition - simplified version of blog without categories, date, updated, hidden
export const mdPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable(),
  heroImageAlt: z.string().optional().nullable(),
  heroBody: z.string().optional().nullable(),
  heroPolaroids: z.union([polaroidSchema, z.array(polaroidSchema)]).optional().nullable(),
  ogImage: z.string().optional().nullable(),
  accentColor: z.string().optional().nullable(),
  showToc: z.boolean().optional(),
});

// Infer the type from the schema
export type MdPageBase = z.infer<typeof mdPageSchema>;

// Extend the base type with additional runtime properties
export type MdPage = MdPageBase & {
  content?: string | null;
  toc?: {
    slug: string;
    text: string;
    depth: number;
  }[];
};
