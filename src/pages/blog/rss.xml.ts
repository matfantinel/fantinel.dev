import { getAllBlogPosts, blogPostToRssItem } from "@data/blogPosts";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const posts = await getAllBlogPosts(true);

  const items = posts.map((post) => blogPostToRssItem(post));

  const body = generateRssFeed(items, {
    title: `${siteMeta.title} - Blog`,
    description: `Blog posts from ${siteMeta.title}`,
    feedUrl: '/blog/rss.xml'
  });

  return createRssResponse(body);
}
