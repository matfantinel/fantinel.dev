import type { CoolLink, CoolLinkTag } from "@schemas/cool-link";
import { getCollection } from "astro:content";
import { slug } from 'github-slugger';
import { escapeXml } from "@utils/rss";
import dateformat from "dateformat";
import type { FilterTag, FilterGroup } from "@schemas/filter";

/**
 * Sanitizes a cool link to make it ready for using it in the UI.
 
 */
export function sanitizeCoolLink(link: CoolLink, filepath: string, body?: string) {
  link.content = body;

  const title = link.title || filepath.split("/").pop()?.replace(".md", "") || "";

  link.title = title;
  link.slug = slug(title);
  link.selfUrl = `/cool-links/${link.slug}`;

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
 * Gets all cool links.
 * @returns All cool links.
 */
export async function getAllCoolLinks(): Promise<CoolLink[]> {
  const { links } = await getPaginatedCoolLinks(1, undefined, { postsPerPage: 1000 });
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

/**
 * Gets tag filters for the cool links archive.
 * @param activeSlug - The currently active tag slug (optional).
 * @returns Array of filter tags with counts.
 */
export async function getTagFilters(activeSlug?: string): Promise<FilterTag[]> {
  const links = await getCollection("coolLinks");
  const sanitizedLinks = links.map((link) => sanitizeCoolLink(link.data as unknown as CoolLink, link.filePath ?? "", link.rendered?.html));

  const tagCount = new Map<string, number>();
  const tagMap = new Map<string, CoolLinkTag>();

  sanitizedLinks.forEach((link) => {
    link.tags?.forEach((tag) => {
      tagCount.set(tag.slug, (tagCount.get(tag.slug) || 0) + 1);
      if (!tagMap.has(tag.slug)) {
        tagMap.set(tag.slug, tag);
      }
    });
  });

  const filterTags: FilterTag[] = Array.from(tagMap.entries()).map(([tagSlug, tag]) => ({
    label: `#${tag.name}`,
    url: `/cool-links/tag/${tagSlug}`,
    active: tagSlug === activeSlug,
    count: tagCount.get(tagSlug) || 0,
  }));

  filterTags.sort((a, b) => b.count - a.count);

  return filterTags;
}

/**
 * Gets date filters for the cool links archive, grouped by year with months as tags.
 * @param activeSlug - The currently active date slug in YYYY-MM format (optional).
 * @returns Array of filter groups with months grouped by year.
 */
export async function getDateFilters(activeSlug?: string): Promise<FilterGroup[]> {
  const links = await getCollection("coolLinks");
  const sanitizedLinks = links.map((link) => sanitizeCoolLink(link.data as unknown as CoolLink, link.filePath ?? "", link.rendered?.html));

  const dateCount = new Map<string, number>();
  const dateMap = new Map<string, { year: number; month: number }>();

  sanitizedLinks.forEach((link) => {
    const date = new Date(link.savedOn);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;

    dateCount.set(key, (dateCount.get(key) || 0) + 1);

    if (!dateMap.has(key)) {
      dateMap.set(key, { year, month });
    }
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const yearGroups = new Map<number, FilterTag[]>();

  dateMap.forEach(({ year, month }, key) => {
    if (!yearGroups.has(year)) {
      yearGroups.set(year, []);
    }

    yearGroups.get(year)!.push({
      label: monthNames[month],
      url: `/cool-links/date/${key}`,
      active: key === activeSlug,
      count: dateCount.get(key) || 0,
    });
  });

  const filterGroups: FilterGroup[] = Array.from(yearGroups.entries()).map(([year, tags]) => {
    tags.sort((a, b) => b.url.localeCompare(a.url));
    return { label: String(year), tags };
  });

  filterGroups.sort((a, b) => Number(b.label) - Number(a.label));

  return filterGroups;
}

/**
 * Gets all cool links for a given YYYY-MM date slug.
 * @param dateSlug - The date slug in YYYY-MM format.
 * @returns All links for that month, sorted most recent first.
 */
export async function getLinksByDate(dateSlug: string): Promise<CoolLink[]> {
  const links = await getCollection("coolLinks");
  const sanitizedLinks = links
    .map((link) => sanitizeCoolLink(link.data as unknown as CoolLink, link.filePath ?? "", link.rendered?.html))
    .filter((link) => {
      const date = new Date(link.savedOn);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return key === dateSlug;
    })
    .sort((a, b) => b.savedOn.getTime() - a.savedOn.getTime());

  return sanitizedLinks;
}

/**
 * Converts a cool link to an RSS item.
 * @param link The cool link to convert.
 * @returns The RSS item string.
 */
export function coolLinkToRssItem(link: CoolLink): string {
  return `
    <item>
      <guid>${link.url}</guid>
      <title>Cool Link: ${escapeXml(link.title as string)}</title>
      <link>${link.url}</link>
      <pubDate>${dateformat(link.savedOn, 'ddd, dd mmm yyyy HH:MM:ss o', true)}</pubDate>
      <content:encoded><![CDATA[
        ${link.author ? `<p>by ${link.author}</p>` : ''}
        
        ${link.content}
      ]]></content:encoded>
    </item>
  `;
}