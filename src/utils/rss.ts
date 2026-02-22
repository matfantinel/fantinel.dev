import metaConfig from "@public/cms/meta.yml";
import type { SiteMeta } from "@schemas/site-meta";

const siteMeta: SiteMeta = metaConfig;

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface RssFeedOptions {
  title: string;
  description: string;
  feedUrl: string;
}

export function generateRssFeed(items: string[], options: RssFeedOptions): string {
  return `<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	xmlns:georss="http://www.georss.org/georss"
	xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>
  <channel>
    <atom:link href="${siteMeta.baseUrl}${options.feedUrl}" rel="self" type="application/rss+xml" />
    <title>${escapeXml(options.title)}</title>
    <link>${siteMeta.baseUrl}</link>
    <description>${escapeXml(options.description)}</description>
    <image>
      <url>${siteMeta.baseUrl}/favicons/favicon-96x96.png</url>
      <title>${escapeXml(options.title)}</title>
      <link>${siteMeta.baseUrl}</link>
      <width>96</width>
      <height>96</height>
    </image>
    ${items.join('')}
  </channel>
</rss>`;
}

export function createRssResponse(body: string): Response {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(body, { headers });
}

export { siteMeta };
