import { getPaginatedPosts } from "@data/blogPosts";
import {
  MarkerHighlightTokenizerExtension,
  SparklesHighlightTokenizerExtension
} from '@utils/markdown';
import { marked } from 'marked';
import type { SiteMeta } from "@schemas/site-meta";
import metaConfig from "@public/cms/meta.yml";
import type { BlogPost } from "@schemas/blog";
import dateformat from "dateformat";
const siteMeta: SiteMeta = metaConfig;

export async function GET({ request }: { request: Request }) {
  const { posts } = await getPaginatedPosts(1, undefined, { postsPerPage: 1000 });

  marked.use({
    extensions: [SparklesHighlightTokenizerExtension, MarkerHighlightTokenizerExtension]
  });

  const promises = posts.map(async (post) => {
    if (!post.content) {
      return;
    }

    post.content = post.content.replaceAll('<a href="/', `<a href="${siteMeta.baseUrl}/`);
    post.content = post.content.replaceAll('<img src="/', `<img src="${siteMeta.baseUrl}/cms/media/`);
    post.content = post.content.replaceAll(`<img src="${siteMeta.baseUrl}/cms/media/media/`, `<img src="${siteMeta.baseUrl}/cms/media/`);
  });

  await Promise.all(promises);

  const body = generateXml(posts);
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(body, { headers });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const generateXml = (posts: BlogPost[]) => `
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
    <atom:link href="${siteMeta.baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <title>${escapeXml(siteMeta.title)}</title>
    <link>${siteMeta.baseUrl}</link>
    <description>${escapeXml(siteMeta.description)}</description>
    <image>
      <url>${siteMeta.baseUrl}/favicons/favicon-96x96.png</url>
      <title>${escapeXml(siteMeta.title)}</title>
      <link>${siteMeta.baseUrl}</link>
      <width>96</width>
      <height>96</height>
    </image>
    ${posts
    .map(
      (post) => {
        // Posts before 2025-06-01 don't have the /blog prefix
        // Their URL will redirect automatically, but I don't wanna change the RSS guid
        // To avoid the post being duplicated in the RSS feed of existing subscribers
        const guid = siteMeta.baseUrl + (post.date < new Date('2025-06-01') ? '' : '/blog') + '/' + post.slug;
        let coverImage = post.coverImage ? escapeXml(post.coverImage) : null;
        if (coverImage && !coverImage.includes(siteMeta.baseUrl)) {
          coverImage = `${siteMeta.baseUrl}${coverImage}`;
        }
        return `
        <item>
          <guid>${guid}</guid>
          <title>${escapeXml(post.title)}</title>
          <description>${escapeXml(post.excerpt)}</description>
          <link>${siteMeta.baseUrl}/blog/${post.slug}</link>
          <pubDate>${dateformat(post.date, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
          ${post.categories ? post.categories.map((cat) => `<category>${escapeXml(cat.name)}</category>`).join('') : ''}
          <content:encoded><![CDATA[
            <div style="margin: 50px 0; font-style: italic;">
              If anything looks wrong, 
              <strong>
                <a href="${siteMeta.baseUrl}/blog/${post.slug}">
                  read on the site!
                </a>
              </strong>
            </div>

            ${post.content}
          ]]></content:encoded>
          ${coverImage ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${coverImage}"/>` : ''}
          ${coverImage ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${coverImage}"/>` : ''}          
        </item>
      `
      })}
    .join('')}
  </channel>
</rss>`;
