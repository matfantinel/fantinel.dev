import { getAllQuickReviews, quickReviewToRssItem } from "@data/quickReviews";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const reviews = await getAllQuickReviews();

  const items = reviews.map(quickReviewToRssItem);

  const body = generateRssFeed(items, {
    title: `${siteMeta.title} - Quick Reviews`,
    description: `Quick reviews from ${siteMeta.title}`,
    feedUrl: '/quick-reviews/rss.xml'
  });

  return createRssResponse(body);
}
