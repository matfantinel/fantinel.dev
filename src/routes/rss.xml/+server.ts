import { getPosts } from '$lib/data/blog-posts/api';
import type BlogPost from '$lib/data/blog-posts/model';
import { description, siteBaseUrl, title } from '$lib/data/meta';
import { MarkerHighlightTokenizerExtension, SparklesHighlightTokenizerExtension } from '$lib/utils/markdown';
import dateformat from 'dateformat';
import { marked } from 'marked';


export const prerender = true;

export async function GET() {
  const posts = await getPosts();

  marked.use({
    extensions: [
      SparklesHighlightTokenizerExtension,
      MarkerHighlightTokenizerExtension,
    ]
  });

  const promises = posts.items.map(async (post) => {
    post.content = marked.parse(
      post.content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
    );

    post.content = post.content.replaceAll('<a href="/', `<a href="${siteBaseUrl}/`);
    post.content = post.content.replaceAll('<img src="/', `<img src="${siteBaseUrl}/cms/media/`);
    post.content = post.content.replaceAll(`<img src="${siteBaseUrl}/cms/media/media/`, `<img src="${siteBaseUrl}/cms/media/`);
  });

  await Promise.all(promises);

  const body = xml(posts.items);
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
          <guid>${siteBaseUrl}/${post.slug}</guid>
          <title>${post.title}</title>
          <description>${post.excerpt}</description>
          <link>${siteBaseUrl}/${post.slug}</link>
          <pubDate>${dateformat(post.date, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
          ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
          <content:encoded><![CDATA[
            <div style="margin: 50px 0; font-style: italic;">
              If anything looks wrong, 
              <strong>
                <a href="${siteBaseUrl}/${post.slug}">
                  read on the site!
                </a>
              </strong>
            </div>

            ${post.content}
          ]]></content:encoded>
          ${post.coverImage ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${siteBaseUrl}${post.coverImage.src}"/>` : ''}
          ${post.coverImage ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${siteBaseUrl}${post.coverImage.src}"/>` : ''}          
        </item>
      `
    )
    .join('')}
  </channel>
</rss>`;
