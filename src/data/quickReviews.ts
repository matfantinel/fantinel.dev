import type { QuickReview } from "@schemas/quick-review";
import { handleCmsMediaPath } from "@utils/functions";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';
import { QuickReviewType, QuickReviewRating, getTypeFromLowercaseKey, getRatingFromLowercaseKey } from "@schemas/quick-review-types";
import { escapeXml, siteMeta } from "@utils/rss";
import dateformat from "dateformat";
import type { FilterTag } from "@schemas/filter";

/**
 * Sanitizes a quick review to make it ready for using it in the UI.
 * @param review The quick review to sanitize.
 * @param filepath The path to the quick review file.
 * @param body The body of the quick review.
 * @returns The sanitized quick review.
 */
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

/**
 * Gets paginated reviews based on the given rating and type.
 * @param page The page number to get reviews for.
 * @param rating The rating to filter reviews by.
 * @param type The type to filter reviews by.
 * @param options The options for the pagination.
 * @returns The paginated reviews.
 */
export async function getPaginatedReviews(page: number, rating?: QuickReviewRating, type?: QuickReviewType, options: { postsPerPage?: number } = { postsPerPage: 20 }) {
  const { postsPerPage = 10 } = options;

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

/**
 * Gets the recent reviews.
 * @param limit The number of reviews to get.
 * @returns The recent reviews.
 */
export async function getRecentReviews(limit: number = 4): Promise<QuickReview[]> {
  const { reviews } = await getPaginatedReviews(1, undefined, undefined, { postsPerPage: limit });
  return reviews;
}

/**
 * Gets all quick reviews.
 * @returns All quick reviews.
 */
export async function getAllQuickReviews(): Promise<QuickReview[]> {
  const { reviews } = await getPaginatedReviews(1, undefined, undefined, { postsPerPage: 1000 });
  return reviews;
}

/**
 * Gets type filters for the quick reviews archive.
 * @param activeType - The currently active type (optional).
 * @returns Array of filter tags, one per type.
 */
export async function getTypeFilters(activeType?: string): Promise<FilterTag[]> {
  const reviews = await getCollection("quickReviews");
  const sanitizedReviews = reviews
    .map((review) => sanitizeQuickReview(review.data as unknown as QuickReview, review.filePath ?? "", review.rendered?.html));

  const typeCount = new Map<string, number>();

  sanitizedReviews.forEach((review) => {
    const key = review.type;
    typeCount.set(key, (typeCount.get(key) || 0) + 1);
  });

  return Object.keys(QuickReviewType).map((key) => {
    const typeValue = QuickReviewType[key as keyof typeof QuickReviewType];
    return {
      name: typeValue + 's',
      url: `/quick-reviews/type/${key.toLowerCase()}`,
      active: key === activeType,
      count: typeCount.get(typeValue) || 0,
    };
  });
}

/**
 * Gets rating filters for the quick reviews archive.
 * @param activeRating - The currently active rating (optional).
 * @returns Array of filter tags, one per rating.
 */
export async function getRatingFilters(activeRating?: string): Promise<FilterTag[]> {
  const reviews = await getCollection("quickReviews");
  const sanitizedReviews = reviews
    .map((review) => sanitizeQuickReview(review.data as unknown as QuickReview, review.filePath ?? "", review.rendered?.html));

  const ratingCount = new Map<string, number>();

  sanitizedReviews.forEach((review) => {
    const key = review.rating;
    ratingCount.set(key, (ratingCount.get(key) || 0) + 1);
  });

  return Object.keys(QuickReviewRating).reverse().map((key) => {
    const ratingValue = QuickReviewRating[key as keyof typeof QuickReviewRating];
    return {
      name: ratingValue,
      url: `/quick-reviews/rating/${key.toLowerCase()}`,
      active: key === activeRating,
      count: ratingCount.get(ratingValue) || 0,
    };
  });
}

/**
 * Gets year filters for the quick reviews archive.
 * @param activeYear - The currently active year string (optional).
 * @returns Array of filter tags, one per year.
 */
export async function getYearFilters(activeYear?: string): Promise<FilterTag[]> {
  const reviews = await getCollection("quickReviews");
  const sanitizedReviews = reviews
    .map((review) => sanitizeQuickReview(review.data as unknown as QuickReview, review.filePath ?? "", review.rendered?.html));

  const yearCount = new Map<string, number>();

  sanitizedReviews.forEach((review) => {
    const year = String(new Date(review.date).getFullYear());
    yearCount.set(year, (yearCount.get(year) || 0) + 1);
  });

  const filterTags: FilterTag[] = Array.from(yearCount.entries()).map(([year, count]) => ({
    name: year,
    url: `/quick-reviews/year/${year}`,
    active: year === activeYear,
    count,
  }));

  filterTags.sort((a, b) => Number(b.name) - Number(a.name));

  return filterTags;
}

/**
 * Gets all quick reviews for a given year.
 * @param year - The year string (e.g. "2024").
 * @returns All reviews for that year, sorted most recent first.
 */
export async function getReviewsByYear(year: string): Promise<QuickReview[]> {
  const reviews = await getCollection("quickReviews");
  const sanitizedReviews = reviews
    .map((review) => sanitizeQuickReview(review.data as unknown as QuickReview, review.filePath ?? "", review.rendered?.html))
    .filter((review) => String(new Date(review.date).getFullYear()) === year)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return sanitizedReviews;
}

/**
 * Converts a quick review to an RSS item.
 * @param review The quick review to convert.
 * @returns The RSS item string.
 */
export function quickReviewToRssItem(review: QuickReview): string {
  // Reviews don't have time, so we're setting it to 12:00 UTC
  const date = new Date(review.date);
  date.setUTCHours(12, 0, 0, 0);

  let coverImage = review.image ? escapeXml(review.image) : null;
  if (coverImage && !coverImage.includes(siteMeta.baseUrl) && !coverImage.startsWith('http')) {
    coverImage = `${siteMeta.baseUrl}${coverImage}`;
  }
  return `
    <item>
      <guid>${siteMeta.baseUrl}/quick-reviews/${review.slug}</guid>
      <title>Quick Review: ${escapeXml(review.title)}</title>
      <link>${siteMeta.baseUrl}/quick-reviews/${review.slug}</link>
      <pubDate>${dateformat(date, 'ddd, dd mmm yyyy HH:MM:ss o', true)}</pubDate>
      <content:encoded><![CDATA[
        ${review.title ? `<p>${review.title}${review.metadata ? ` <br> ${review.metadata}` : ''}</p>` : ''}
        ${review.rating ? `<p>My rating: ${review.rating}</p>` : ''}
        ${coverImage ? `<p><img src="${coverImage}" /></p>` : ''}
        
        ${review.content}
      ]]></content:encoded>
      ${coverImage ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${coverImage}"/>` : ''}
      ${coverImage ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${coverImage}"/>` : ''}          
    </item>
  `;
}