import { getAllCoolLinks, coolLinkToRssItem } from "@data/coolLinks";
import { generateRssFeed, createRssResponse, siteMeta } from "@utils/rss";

export async function GET() {
  const links = await getAllCoolLinks();

  const items = links.map(coolLinkToRssItem);

  const body = generateRssFeed(items, {
    title: `${siteMeta.title} - Cool Links`,
    description: `Cool links curated by ${siteMeta.title}`,
    feedUrl: '/cool-links/rss.xml'
  });

  return createRssResponse(body);
}
