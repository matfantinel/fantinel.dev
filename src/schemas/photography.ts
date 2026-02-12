import { z } from 'astro:content';

export const photographySchema = z.object({
  title: z.string(),
  photoDate: z.coerce.date(),
  publishedDate: z.coerce.date(),
  image: z.string(),
  imageAlt: z.string().optional().nullable(),
  additionalImages: z.array(z.string()).optional().nullable(),
  additionalImageAlts: z.array(z.string()).optional().nullable(),
});

export type PhotographyBase = z.infer<typeof photographySchema>;

export type Photography = Omit<PhotographyBase, 'additionalImages'> & {
  slug: string;
  content?: string | null;
  additionalImages?: { src: string; alt: string }[];
  url: string;
};