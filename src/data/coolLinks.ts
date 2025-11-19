import type { CoolLink, CoolLinkTag } from "@schemas/cool-link";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';

/**
 * Sanitizes a cool link to make it ready for using it in the UI.
 
 */
export function sanitizeCoolLink(link: CoolLink, filepath: string, body?: string) {
  link.content = body;

  const title = link.title || filepath.split("/").pop()?.replace(".md", "") || "";

  link.title = title;
  link.slug = slug(title);

  if (link.tags) {
    link.tags = link.tags.map((tag) => {
      if (typeof tag === 'string') {
        return {
          name: tag,
          slug: slug(tag),
          url: `/cool-links/tag/${slug(tag)}`
        }
      }
      return tag;
    });
  }

  return link;
}

/**
 * Gets paginated links.
 * @param page The page number to get links for.
 * @param tag The tag to filter links by.
 * @param options The options for the pagination.
 * @returns The paginated links.
 */
export async function getPaginatedCoolLinks(page: number, tag?: string, options: { postsPerPage?: number } = { postsPerPage: 20 }) {
  const { postsPerPage = 10 } = options;

  let links = await getCollection("coolLinks");
  let sanitizedLinks = links.map((link) => sanitizeCoolLink(link.data as unknown as CoolLink, link.filePath ?? "", link.rendered?.html));

  // Sort and filter
  sanitizedLinks = sanitizedLinks
    .filter((link) =>
      tag ? link.tags?.map(t => t.slug).includes(tag) : true
    )
    .sort((a, b) => b.savedOn.getTime() - a.savedOn.getTime());

  const totalPages = Math.ceil(sanitizedLinks.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pageLinks = sanitizedLinks.slice(start, end);

  return {
    links: pageLinks,
    currentPage: page,
    totalPages,
    totalLinks: sanitizedLinks.length,
    tag
  };
}

/**
 * Gets the recent links.
 * @param limit The number of links to get.
 * @returns The recent links.
 */
export async function getRecentLinks(limit: number = 4): Promise<CoolLink[]> {
  const { links } = await getPaginatedCoolLinks(1, undefined, { postsPerPage: limit });
  return links;
}

/**
 * Gets all tags.
 * @returns All tags.
 */
export async function getAllTags(): Promise<CoolLinkTag[]> {
  const links = await getCollection("coolLinks");
  const sanitizedLinks = links.map((link) => sanitizeCoolLink(link.data as unknown as CoolLink, link.filePath ?? "", link.rendered?.html));

  // First collect all tags from all links
  const allTags: CoolLinkTag[] = [];

  sanitizedLinks.forEach(link => {
    if (link.tags && link.tags.length > 0) {
      allTags.push(...link.tags);
    }
  });

  // Count occurrences of each tag by slug
  const tagCount = new Map<string, number>();
  const tagMap = new Map<string, CoolLinkTag>();

  allTags.forEach(tag => {
    const count = tagCount.get(tag.slug) || 0;
    tagCount.set(tag.slug, count + 1);

    // Store the tag object by slug (we only need one instance)
    if (!tagMap.has(tag.slug)) {
      tagMap.set(tag.slug, tag);
    }
  });

  // Convert to array of tags with counts and sort by count (descending)
  const uniqueTags = Array.from(tagMap.values());

  uniqueTags.sort((a, b) => {
    const countA = tagCount.get(a.slug) || 0;
    const countB = tagCount.get(b.slug) || 0;
    return countB - countA; // Sort descending (most frequent first)
  });

  return uniqueTags;
}