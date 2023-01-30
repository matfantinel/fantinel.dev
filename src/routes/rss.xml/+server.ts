import { description, siteBaseUrl, title } from '$lib/data/meta';
import { filteredPosts } from '$lib/data/blog-posts';
import type { BlogPost } from '$lib/utils/types';
import dateformat from 'dateformat';

export const prerender = true;

export async function GET() {
  const body = xml(filteredPosts);
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(body, { headers });
}

const xml = (posts: BlogPost[]) => `
<rss version="2.0"
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
    <atom:link href="http://wwww.fantinel.dev/rss.xml" rel="self" type="application/rss+xml" />
    <title>${title}</title>
    <link>${siteBaseUrl}</link>
    <description>${description}</description>
    <image>
      <url>${siteBaseUrl}/favicons/favicon-32x32.png</url>
      <title>${title}</title>
      <link>${siteBaseUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    ${posts
    .map(
      (post) => `
        <item>
          <guid>${siteBaseUrl}/${post.slug}/</guid>
          <title>${post.title}</title>
          <description>${post.excerpt}</description>
          <link>${siteBaseUrl}/${post.slug}/</link>
          <pubDate>${dateformat(post.date, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
          ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
          <content:encoded><![CDATA[${post.html}]]></content:encoded>
          <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${siteBaseUrl}/images/posts/${post.slug
        }/cover.jpg"/>
          <media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${siteBaseUrl}/images/posts/${post.slug
        }/cover.jpg"/>
        </item>
      `
    )
    .join('')}
  </channel>
</rss>`;