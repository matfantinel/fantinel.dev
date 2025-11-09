import { getPaginatedPosts } from "@data/blogPosts";
import { getPaginatedCoolLinks } from "@data/coolLinks";
import { getPaginatedPhotographies } from "@data/photographies";
import { getPaginatedReviews } from "@data/quickReviews";
import metaConfig from "@public/cms/meta.yml";
import type { BlogPost } from "@schemas/blog";
import type { CoolLink } from "@schemas/cool-link";
import type { Photography } from "@schemas/photography";
import type { QuickReview } from "@schemas/quick-review";
import type { SiteMeta } from "@schemas/site-meta";
import {
  MarkerHighlightTokenizerExtension,
  SparklesHighlightTokenizerExtension
} from '@utils/markdown';
import dateformat from "dateformat";
import { marked } from 'marked';
const siteMeta: SiteMeta = metaConfig;

export async function GET({ request }: { request: Request }) {
  const { posts } = await getPaginatedPosts(1, undefined, { postsPerPage: 1000 });
  const { reviews } = await getPaginatedReviews(1, undefined, undefined, { postsPerPage: 1000 });
  let { links } = await getPaginatedCoolLinks(1, undefined, { postsPerPage: 1000 });
  const { photographies } = await getPaginatedPhotographies(1, { postsPerPage: 1000 });

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

  // Let's not add links saved before 01/11/2025 to the feed, to avoid polluting
  // existing subscribers' feeds with old stuff
  links = links.filter(link => link.savedOn >= new Date('2025-11-01'));

  // Let's add reviews and posts to the same array, and order by their respective date props
  // Something like [{type: 'post', ...post}, {type: 'review', ...review}]
  const items = [
    ...posts.map(post => ({ type: 'post', data: post })), 
    ...reviews.map(review => ({ type: 'review', data: review })),
    ...links.map(link => ({ type: 'link', data: link })),
    ...photographies.map(photo => ({ type: 'photo', data: photo }))
  ].sort((a, b) => {
    // Get the appropriate date property based on content type
    const getDate = (item: typeof a) => {
      if (item.type === 'link') return (item.data as CoolLink).savedOn;
      if (item.type === 'photo') return (item.data as Photography).publishedDate;
      return (item.data as BlogPost | QuickReview).date;
    };
    
    return getDate(b).getTime() - getDate(a).getTime();
  });

  const body = generateXml(items);
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

function postToRssItem(post: BlogPost) {
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
}

function reviewToRssItem(review: QuickReview) {
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
  `
}

function coolLinkToRssItem(link: CoolLink) {
  return `
    <item>
      <guid>${link.url}</guid>
      <title>Cool Link: ${escapeXml(link.title as string)}</title>
      <link>${link.url}</link>
      <pubDate>${dateformat(link.savedOn, 'ddd, dd mmm yyyy HH:MM:ss o', true)}</pubDate>
      <content:encoded><![CDATA[
        ${link.title ? `<p><a href="${link.url}">${link.title}</a>${link.author ? ', by ' + link.author : ''}</p>` : ''}
        
        ${link.content}
      ]]></content:encoded>
    </item>
  `
}

function photoToRssItem(photo: Photography) {
  return `
    <item>
      <guid>${siteMeta.baseUrl}/photography/${photo.slug}</guid>
      <title>Photography: ${escapeXml(photo.title)}</title>
      <link>${siteMeta.baseUrl}/photography/${photo.slug}</link>
      <pubDate>${dateformat(photo.publishedDate, 'ddd, dd mmm yyyy HH:MM:ss o', true)}</pubDate>
      <content:encoded><![CDATA[
        ${photo.title ? `<p>${photo.title}</p>` : ''}

        ${photo.photoDate ? `<p>Photo taken on ${dateformat(photo.photoDate, 'ddd, dd mmm yyyy', true)}</p>` : ''}

        ${photo.image ? `<p><img src="${photo.image}" /></p>` : ''}
        
        ${photo.content}
      ]]></content:encoded>
      ${photo.image ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${photo.image}"/>` : ''}
      ${photo.image ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${photo.image}"/>` : ''}          
    </item>
  `
}

const generateXml = (items: { type: string, data: BlogPost | QuickReview | CoolLink | Photography }[]) => `
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
    ${items.map(item => {
      if (item.type === 'post') {
        return postToRssItem(item.data as BlogPost);
      } else if (item.type === 'review') {
        return reviewToRssItem(item.data as QuickReview);
      } else if (item.type === 'link') {
        return coolLinkToRssItem(item.data as CoolLink);
      } else if (item.type === 'photo') {
        return photoToRssItem(item.data as Photography);
      }
    }).join('')}
  </channel>
</rss>`;
