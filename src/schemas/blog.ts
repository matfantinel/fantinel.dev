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
});

// Infer the type from the schema
export type BlogPostBase = z.infer<typeof blogSchema>;

// Extend the base type with additional runtime properties
export type BlogPost = Omit<BlogPostBase, 'categories'> & {
  // Properties that are added dynamically at runtime
  readingTime?: string | null;
  categories?: BlogPostCategory[];
  toc?: {
    slug: string;
    text: string;
    depth: number;
  }[];
  author?: BlogPostAuthor;
};

export type BlogPostCategory = {
  name: string;
  slug: string;
  url: string;
  active?: boolean;
};

export type BlogPostAuthor = {
  name: string;
    image: string | null;
    extraImages?: string[]
}