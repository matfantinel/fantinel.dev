import type { Photography } from "@schemas/photography";
import { handleCmsMediaPath } from "@utils/functions";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';
import { escapeXml, siteMeta } from "@utils/rss";
import dateformat from "dateformat";

/**
 * Sanitizes a photography post to make it ready for using it in the UI.
 * @param photography The photography post to sanitize.
 * @param filepath The path to the photography file.
 * @param body The body of the photography post.
 * @returns The sanitized photography post.
 */
export function sanitizePhotography(photography: Photography, filepath: string, body?: string) {
  photography.content = body;

  const title = filepath.split("/").pop()?.replace(".md", "") || "";

  photography.slug = slug(title);

  photography.url = `/photography/${photography.slug}`;

  if (photography.image) {
    photography.image = handleCmsMediaPath(photography.image);
  }

  if (photography.additionalImages) {
    photography.additionalImages = photography.additionalImages.map(
      (img, index) => {
        return {
          src: handleCmsMediaPath(img as unknown as string),
          alt: (photography .additionalImageAlts?.[index] || "") as string
        }
      }
    );

    delete photography.additionalImageAlts;
  }

  return photography;
}

/**
 * Gets paginated photography posts.
 * @param page The page number to get posts for.
 * @param options The options for the pagination.
 * @returns The paginated photography posts.
 */
export async function getPaginatedPhotographies(page: number, options: { postsPerPage?: number } = { postsPerPage: 20 }) {
  const { postsPerPage = 12 } = options;

  let photographies = await getCollection("photographies");
  let sanitizedPhotographies = photographies.map((photography) => sanitizePhotography(photography.data as unknown as Photography, photography.filePath ?? "", photography.rendered?.html));

  // Sort by date (newest first)
  sanitizedPhotographies = sanitizedPhotographies
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  const totalPages = Math.ceil(sanitizedPhotographies.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePhotographies = sanitizedPhotographies.slice(start, end);

  return {
    photographies: pagePhotographies,
    currentPage: page,
    totalPages,
    totalPhotographies: sanitizedPhotographies.length,
  };
}

/**
 * Gets the recent photography posts.
 * @param limit The number of posts to get.
 * @returns The recent photography posts.
 */
export async function getRecentPhotographies(limit: number = 4): Promise<Photography[]> {
  const { photographies } = await getPaginatedPhotographies(1, { postsPerPage: limit });
  return photographies;
}

/**
 * Gets all photography posts.
 * @returns All photography posts.
 */
export async function getAllPhotographyPosts(): Promise<Photography[]> {
  const { photographies } = await getPaginatedPhotographies(1, { postsPerPage: 1000 });
  return photographies;
}

/**
 * Converts a photography post to an RSS item.
 * @param photo The photography post to convert.
 * @returns The RSS item string.
 */
export function photographyToRssItem(photo: Photography): string {
  const additionalImagesHtml = photo.additionalImages?.map(img => 
    `<p><img src="${img.src}" alt="${img.alt || ''}" /></p>`
  ).join('\n        ') || '';
  
  const additionalMediaContent = photo.additionalImages?.map(img => 
    `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${img.src}"/>`
  ).join('\n      ') || '';
  
  return `
    <item>
      <guid>${siteMeta.baseUrl}/photography/${photo.slug}</guid>
      <title>Photography: ${escapeXml(photo.title)}</title>
      <link>${siteMeta.baseUrl}${photo.url}</link>
      <pubDate>${dateformat(photo.publishedDate, 'ddd, dd mmm yyyy HH:MM:ss o', true)}</pubDate>
      <content:encoded><![CDATA[
        ${photo.title ? `<p>${photo.title}</p>` : ''}

        ${photo.content}

        ${photo.photoDate ? `<p>Photo${additionalImagesHtml ? 's' : ''} taken on ${dateformat(photo.photoDate, 'dddd, dd mmm yyyy', true)}</p>` : ''}

        ${photo.image ? `<p><img src="${photo.image}" alt="${photo.imageAlt || ''}" /></p>` : ''}
        ${additionalImagesHtml}        
      ]]></content:encoded>
      ${photo.image ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${photo.image}"/>` : ''}
      ${photo.image ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${photo.image}"/>` : ''}
      ${additionalMediaContent}
    </item>
  `;
}