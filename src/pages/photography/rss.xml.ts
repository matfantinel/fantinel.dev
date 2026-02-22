import { getAllPhotographyPosts, photographyToRssItem } from "@data/photographies";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const photos = await getAllPhotographyPosts();

  const items = photos.map(photographyToRssItem);

  const body = generateRssFeed(items, {
    title: `${siteMeta.title} - Photography`,
    description: `Photography posts from ${siteMeta.title}`,
    feedUrl: '/photography/rss.xml'
  });

  return createRssResponse(body);
}
