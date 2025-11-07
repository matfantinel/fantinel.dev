import { z } from 'astro:content';

export const coolLinkSchema = z.object({
  title: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  url: z.string(),
  savedOn: z.coerce.date(),
  tags: z.array(z.string()).optional().nullable(),
  posted: z.boolean().optional().nullable(),
});

export type CoolLinkBase = z.infer<typeof coolLinkSchema>;

export type CoolLink = Omit<CoolLinkBase, 'tags'> & {
  slug: string;
  content?: string | null;
  tags?: CoolLinkTag[];
};

export type CoolLinkTag = {
  name: string;
  slug: string;
  url: string;
  active?: boolean;
};