import metaConfig from "@public/cms/meta.yml";
import type { SiteMeta } from "@schemas/site-meta";
import { handleCmsMediaPath } from "@utils/functions";
import type { RenderedContent } from "astro:content";
import { getCollection } from "astro:content";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import { slug } from 'github-slugger'
import type { BlogPost, BlogPostCategory } from "@schemas/blog";
import type { FilterTag, FilterGroup } from "@schemas/filter";
import { generateOgPathFromPost, generateOgPathFromCoolLinksPost } from "@utils/functions";
import { escapeXml, siteMeta as rssSiteMeta } from "@utils/rss";
import dateformat from "dateformat";

const siteMeta: SiteMeta = metaConfig;

/**
 * Sanitizes a blog post to make it ready for using it in the UI.
 * @param post The blog post to sanitize.
 * @param postBody The body of the blog post.
 * @param renderedPost The rendered blog post.
 * @param allPosts All the blog posts.
 * @returns The sanitized blog post.
 */
export function sanitizeBlogPostData(post: BlogPost, postBody?: string, renderedPost?: RenderedContent, allPosts?: BlogPost[], skipRelatedPosts?: boolean) {
  if (postBody) {
    post.readingTime = readingTime(striptags(postBody)).text
  }

  post.content = renderedPost?.html;

  if (!post.author && siteMeta.author) {
    post.author = siteMeta.author;
  }

  if (post.coverImage) {
    post.coverImage = handleCmsMediaPath(post.coverImage);
  }

  if (post.categories) {
    post.categories = post.categories.map((cat) => {
      if (typeof cat === 'string') {
        return {
          name: cat,
          slug: slug(cat),
          url: `/blog/category/${slug(cat)}`
        }
      }
      return cat;
    });
  }

  const isCoolLinksPost = post.categories?.some((cat) => cat.slug === 'cool-links');

  // Handle cover images
  post.ogImage = post.coverImage;

  if (!post.coverImage) {
    if (isCoolLinksPost) {
      post.coverImage = `${siteMeta.baseUrl}${generateOgPathFromCoolLinksPost(post)}`;
      post.ogImage = post.coverImage;
    } else if (post.title) {
      post.ogImage = `${siteMeta.baseUrl}${generateOgPathFromPost(post)}`;
    }
  }

  if (post.showToc && renderedPost?.metadata?.headings) {
    post.toc = (renderedPost.metadata.headings as any[]).map((heading: any) => {
      // If isCoolLinksPost, only consider h2s
      if (isCoolLinksPost && heading.depth !== 2) {
        return null;
      }
      return {
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth
      }
    }).filter((heading) => heading !== null);
  }

  if (!post.relatedPosts && allPosts && !skipRelatedPosts) {
    post.relatedPosts = getRelatedBlogPosts(post, allPosts);
  }

  return post;
}

/**
 * Gets paginated posts based on the given category.
 * @param page The page number to get posts for.
 * @param category The category to filter posts by.
 * @param options The options for the pagination.
 * @returns The paginated posts.
 */
export async function getPaginatedBlogPosts(page: number, category?: string, options: { postsPerPage?: number, skipRelatedPosts?: boolean } = { postsPerPage: 24 }) {
  const { postsPerPage = 12 } = options;

  let posts = await getCollection("blog");
  let sanitizedPosts = posts.map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered, posts.map(p => p.data as unknown as BlogPost), options.skipRelatedPosts));

  // Sort and filter
  sanitizedPosts = sanitizedPosts
    .filter((p) => !p.hidden)
    .filter((p) =>
      category ? p.categories?.map(c => c.slug).includes(category) : true
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const totalPages = Math.ceil(sanitizedPosts.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = sanitizedPosts.slice(start, end);

  return {
    posts: pagePosts,
    currentPage: page,
    totalPages,
    totalPosts: sanitizedPosts.length,
    category
  };
}

/**
 * Gets the recent posts.
 * @param limit The number of posts to get.
 * @returns The recent posts.
 */
export async function getRecentBlogPosts(limit: number = 4): Promise<BlogPost[]> {
  const { posts } = await getPaginatedBlogPosts(1, undefined, { postsPerPage: limit });
  return posts;
}

/**
 * Gets all blog posts.
 * @returns All blog posts.
 */
export async function getAllBlogPosts(skipRelatedPosts?: boolean): Promise<BlogPost[]> {
  const { posts } = await getPaginatedBlogPosts(1, undefined, { postsPerPage: 1000, skipRelatedPosts });
  return posts;
}

/**
 * Gets all blog posts for a specific year-month.
 * @param dateSlug - The date slug in YYYY-MM format.
 * @returns All blog posts for that month.
 */
export async function getBlogPostsByDate(dateSlug: string): Promise<BlogPost[]> {
  const posts = await getCollection("blog");
  let sanitizedPosts = posts
    .map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered))
    .filter((p) => !p.hidden);

  // Filter by date (year-month)
  sanitizedPosts = sanitizedPosts.filter((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Convert to 1-indexed
    const postDateSlug = `${year}-${String(month).padStart(2, '0')}`;
    return postDateSlug === dateSlug;
  });

  // Sort by date (most recent first)
  sanitizedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return sanitizedPosts;
}

/**
 * Gets all categories.
 * @returns All categories.
 */
export async function getAllCategories(): Promise<BlogPostCategory[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts.map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered));

  // First collect all categories from all posts
  const allCategories: BlogPostCategory[] = [];

  sanitizedPosts.forEach(post => {
    if (post.categories && post.categories.length > 0) {
      allCategories.push(...post.categories);
    }
  });

  // Count occurrences of each category by slug
  const categoryCount = new Map<string, number>();
  const categoryMap = new Map<string, BlogPostCategory>();

  allCategories.forEach(category => {
    const count = categoryCount.get(category.slug) || 0;
    categoryCount.set(category.slug, count + 1);

    // Store the category object by slug (we only need one instance)
    if (!categoryMap.has(category.slug)) {
      categoryMap.set(category.slug, category);
    }
  });

  // Convert to array of categories with counts and sort by count (descending)
  const uniqueCategories = Array.from(categoryMap.values());

  uniqueCategories.sort((a, b) => {
    const countA = categoryCount.get(a.slug) || 0;
    const countB = categoryCount.get(b.slug) || 0;
    return countB - countA; // Sort descending (most frequent first)
  });

  return uniqueCategories;
}

/**
 * Gets category filters for the blog archive.
 * @param activeSlug - The currently active category slug (optional).
 * @returns Array of filter tags with name, url, active state, and count.
 */
export async function getCategoryFilters(activeSlug?: string): Promise<FilterTag[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts.map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered));

  // First collect all categories from all posts
  const allCategories: BlogPostCategory[] = [];

  sanitizedPosts.forEach(post => {
    if (post.categories && post.categories.length > 0) {
      allCategories.push(...post.categories);
    }
  });

  // Count occurrences of each category by slug
  const categoryCount = new Map<string, number>();
  const categoryMap = new Map<string, BlogPostCategory>();

  allCategories.forEach(category => {
    const count = categoryCount.get(category.slug) || 0;
    categoryCount.set(category.slug, count + 1);

    // Store the category object by slug (we only need one instance)
    if (!categoryMap.has(category.slug)) {
      categoryMap.set(category.slug, category);
    }
  });

  // Convert to array of filter tags
  const filterTags: FilterTag[] = Array.from(categoryMap.entries()).map(([slug, category]) => ({
    name: category.name,
    url: category.url,
    active: slug === activeSlug,
    count: categoryCount.get(slug) || 0
  }));

  // Sort by count (descending)
  filterTags.sort((a, b) => b.count - a.count);

  return filterTags;
}

/**
 * Gets all unique post dates (year-month combinations) for filtering.
 * @returns All post dates as filter tags.
 */
export async function getAllPostDates(): Promise<BlogPostCategory[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts
    .map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered))
    .filter((p) => !p.hidden);

  // Count occurrences of each year-month combination
  const dateCount = new Map<string, number>();
  const dateMap = new Map<string, { year: number; month: number; date: Date }>();

  sanitizedPosts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;

    const count = dateCount.get(key) || 0;
    dateCount.set(key, count + 1);

    // Store the date info by key (we only need one instance)
    if (!dateMap.has(key)) {
      dateMap.set(key, { year, month, date });
    }
  });

  // Convert to array of date tags
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const dateTags: BlogPostCategory[] = Array.from(dateMap.entries()).map(([key, { year, month }]) => ({
    name: `${monthNames[month]} ${year}`,
    slug: key,
    url: `/blog/date/${key}`
  }));

  // Sort by date (most recent first)
  dateTags.sort((a, b) => {
    return b.slug.localeCompare(a.slug); // Descending order (newest first)
  });

  return dateTags;
}

/**
 * Gets date filters for the blog archive, grouped by year.
 * @param activeSlug - The currently active date slug in YYYY-MM format (optional).
 * @returns Array of filter groups with months grouped by year.
 */
export async function getDateFilters(activeSlug?: string): Promise<FilterGroup[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts
    .map((post) => sanitizeBlogPostData(post.data as unknown as BlogPost, post.body, post.rendered))
    .filter((p) => !p.hidden);

  // Count occurrences of each year-month combination
  const dateCount = new Map<string, number>();
  const dateMap = new Map<string, { year: number; month: number }>();

  sanitizedPosts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;

    const count = dateCount.get(key) || 0;
    dateCount.set(key, count + 1);

    // Store the date info by key (we only need one instance)
    if (!dateMap.has(key)) {
      dateMap.set(key, { year, month });
    }
  });

  // Group by year
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const yearGroups = new Map<number, FilterTag[]>();

  dateMap.forEach(({ year, month }, key) => {
    if (!yearGroups.has(year)) {
      yearGroups.set(year, []);
    }

    yearGroups.get(year)!.push({
      name: monthNames[month],
      url: `/blog/date/${key}`,
      active: key === activeSlug,
      count: dateCount.get(key) || 0
    });
  });

  // Convert to FilterGroup array and sort
  const filterGroups: FilterGroup[] = Array.from(yearGroups.entries()).map(([year, tags]) => {
    // Sort months within each year (most recent first)
    tags.sort((a, b) => b.url.localeCompare(a.url));

    return {
      label: String(year),
      tags
    };
  });

  // Sort years (most recent first)
  filterGroups.sort((a, b) => Number(b.label) - Number(a.label));

  return filterGroups;
}



/**
 * Gets related posts based on the given post.
 * @param post The post to get related posts for.
 * @param allPosts All the blog posts.
 * @returns The related posts.
 */
export function getRelatedBlogPosts(post: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  // If the post has no categories, return empty array
  if (!post.categories || post.categories.length === 0) {
    return [];
  }

  // Get the current post's category slugs
  const postCategorySlugs = post.categories.map(cat => {
    if (typeof cat === 'string') {
      return slug(cat);
    }
    return cat.slug;
  });

  // Filter out the current post and hidden posts
  const otherPosts = allPosts.filter(p =>
    p.slug !== post.slug && !p.hidden
  );

  // Calculate relevance score for each post based on shared categories
  const scoredPosts = otherPosts.map(otherPost => {
    // Get the other post's category slugs
    const otherCategorySlugs = otherPost.categories?.map(cat => {
      if (typeof cat === 'string') {
        return slug(cat);
      }
      return cat.slug;
    }) || [];

    // Count how many categories are shared
    const sharedCategories = postCategorySlugs.filter(slug =>
      otherCategorySlugs.includes(slug)
    );

    return {
      post: otherPost,
      score: sharedCategories.length,
      date: otherPost.date
    };
  });

  // Filter posts that have at least one shared category
  const relatedPosts = scoredPosts
    .filter(item => item.score > 0)
    // Sort by score (descending) and then by date (newest first)
    .sort((a, b) => {
      // First sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, sort by date
      return b.date.getTime() - a.date.getTime();
    })
    // Extract just the posts
    .map(item => item.post)
    // Limit to 4 related posts
    .slice(0, 4);

  return relatedPosts;
}

/**
 * Converts a blog post to an RSS item.
 * @param post The blog post to convert.
 * @param options.excerptOnly If true, only include the excerpt instead of full content.
 * @returns The RSS item string.
 */
export function blogPostToRssItem(post: BlogPost, options: { excerptOnly?: boolean } = {}): string {
  const { excerptOnly = false } = options;

  // Posts before 2025-06-01 don't have the /blog prefix
  // Their URL will redirect automatically, but I don't wanna change the RSS guid
  // To avoid the post being duplicated in the RSS feed of existing subscribers
  const guid = rssSiteMeta.baseUrl + (post.date < new Date('2025-06-01') ? '' : '/blog') + '/' + post.slug;
  let coverImage = post.coverImage ? escapeXml(post.coverImage) : null;
  if (coverImage && !coverImage.includes(rssSiteMeta.baseUrl)) {
    coverImage = `${rssSiteMeta.baseUrl}${coverImage}`;
  }

  // Process content URLs to use absolute paths
  let content = post.content || '';
  content = content.replaceAll('<a href="/', `<a href="${rssSiteMeta.baseUrl}/`);
  content = content.replaceAll('<img src="/', `<img src="${rssSiteMeta.baseUrl}/cms/media/`);
  content = content.replaceAll(`<img src="${rssSiteMeta.baseUrl}/cms/media/media/`, `<img src="${rssSiteMeta.baseUrl}/cms/media/`);

  const contentEncoded = excerptOnly
    ? `<p>${escapeXml(post.excerpt)}</p>
        <p><a href="${rssSiteMeta.baseUrl}/blog/${post.slug}">Read more</a></p>`
    : `<div style="margin: 50px 0; font-style: italic;">
          If anything looks wrong, 
          <strong>
            <a href="${rssSiteMeta.baseUrl}/blog/${post.slug}">
              read on the site!
            </a>
          </strong>
        </div>

        ${content}`;

  return `
    <item>
      <guid>${guid}</guid>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${rssSiteMeta.baseUrl}/blog/${post.slug}</link>
      <pubDate>${dateformat(post.date, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
      ${post.categories ? post.categories.map((cat) => `<category>${escapeXml(cat.name)}</category>`).join('') : ''}
      <content:encoded><![CDATA[
        ${contentEncoded}
      ]]></content:encoded>
      ${coverImage ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${coverImage}"/>` : ''}
      ${coverImage ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${coverImage}"/>` : ''}          
    </item>
  `;
}