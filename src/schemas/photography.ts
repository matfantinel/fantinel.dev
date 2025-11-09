import { z } from 'astro:content';

export const photographySchema = z.object({
  title: z.string(),
  photoDate: z.coerce.date(),
  publishedDate: z.coerce.date(),
  image: z.string(),
  imageAlt: z.string().optional().nullable(),
});

export type PhotographyBase = z.infer<typeof photographySchema>;

export type Photography = PhotographyBase & {
  slug: string;
  content?: string | null;
};