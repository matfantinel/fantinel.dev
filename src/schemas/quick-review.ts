import { z } from 'astro:content';

export enum QuickReviewType {
  Movie = 'Movie',
  TvShow = 'TV Show',
  Game = 'Game',
  Album = 'Album'
}

export enum QuickReviewRating {
  DidntLikeIt = 'Didn\'t like it',
  Decent = 'Decent',
  LikeIt = 'I like it',
  LovedIt = 'Loved it!'
}

export const quickReviewSchema = z.object({
  type: z.enum([QuickReviewType.Movie, QuickReviewType.TvShow, QuickReviewType.Game, QuickReviewType.Album]),
  metadata: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  rating: z.enum([QuickReviewRating.DidntLikeIt, QuickReviewRating.Decent, QuickReviewRating.LikeIt, QuickReviewRating.LovedIt]),
  date: z.coerce.date(),
  theme: z.enum(['dark', 'light']),
  customBg: z.string().optional().nullable()
});

// Infer the type from the schema
export type QuickReviewBase = z.infer<typeof quickReviewSchema>;

// Extend the base type with additional runtime properties
export type QuickReview = QuickReviewBase & {
  title: string;
  slug: string;
  content?: string | null;
  type: QuickReviewType;
  rating: QuickReviewRating;
};