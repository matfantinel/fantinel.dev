import type { QuickReview } from "@schemas/quick-review";
import { handleCmsMediaPath } from "@utils/functions";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';
import { QuickReviewType, QuickReviewRating, getTypeFromLowercaseKey, getRatingFromLowercaseKey } from "@schemas/quick-review-types";

export function sanitizeQuickReview(review: QuickReview, filepath: string, body?: string) {
  review.content = body;

  const title = filepath.split("/").pop()?.replace(".md", "") || "";

  review.title = title;
  review.slug = slug(title);

  if (review.image) {
    review.image = handleCmsMediaPath(review.image);
  }

  return review;
}

export async function getPaginatedReviews(page: number, rating?: QuickReviewRating, type?: QuickReviewType, options: { postsPerPage?: number } = { postsPerPage: 20 }) {
  const { postsPerPage = 12 } = options;

  let reviews = await getCollection("quickReviews");
  let sanitizedReviews = reviews.map((review) => sanitizeQuickReview(review.data as unknown as QuickReview, review.filePath ?? "", review.rendered?.html));

  if (type) {
    type = getTypeFromLowercaseKey(type);
  }

  if (rating) {
    rating = getRatingFromLowercaseKey(rating);
  }

  // Sort and filter
  sanitizedReviews = sanitizedReviews
    .filter((r) =>
      rating ? r.rating.toLowerCase() === rating.toLowerCase() : true
    )
    .filter((r) =>
      type ? r.type.toLowerCase() === type.toLowerCase() : true
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const totalPages = Math.ceil(sanitizedReviews.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pageReviews = sanitizedReviews.slice(start, end);

  return {
    reviews: pageReviews,
    currentPage: page,
    totalPages,
    totalReviews: sanitizedReviews.length,
    rating
  };
}

export async function getRecentReviews(limit: number = 4): Promise<QuickReview[]> {
  const { reviews } = await getPaginatedReviews(1, undefined, undefined, { postsPerPage: limit });
  return reviews;
}