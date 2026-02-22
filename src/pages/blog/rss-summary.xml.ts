import { getAllBlogPosts, blogPostToRssItem } from "@data/blogPosts";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const posts = await getAllBlogPosts(true);

  const items = posts.map((post) => blogPostToRssItem(post, { excerptOnly: true }));

  const body = generateRssFeed(items, {
    title: `${siteMeta.title} - Blog (Summary)`,
    description: `Blog post summaries from ${siteMeta.title}`,
    feedUrl: '/blog/rss-summary.xml'
  });

  return createRssResponse(body);
}
