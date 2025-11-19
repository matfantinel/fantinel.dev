import metaConfig from "@public/cms/meta.yml";
import type { SiteMeta } from "@schemas/site-meta";
import { handleCmsMediaPath } from "@utils/functions";
import type { RenderedContent } from "astro:content";
import { getCollection } from "astro:content";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import { slug } from 'github-slugger'
import type { BlogPost, BlogPostCategory } from "@schemas/blog";
import { generateOgPathFromPost, generateOgPathFromCoolLinksPost } from "@utils/functions";

const siteMeta: SiteMeta = metaConfig;

/**
 * Sanitizes a blog post to make it ready for using it in the UI.
 * @param post The blog post to sanitize.
 * @param postBody The body of the blog post.
 * @param renderedPost The rendered blog post.
 * @param allPosts All the blog posts.
 * @returns The sanitized blog post.
 */
export function sanitizePostData(post: BlogPost, postBody?: string, renderedPost?: RenderedContent, allPosts?: BlogPost[]) {
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

  if (!post.relatedPosts && allPosts) {
    post.relatedPosts = getRelatedPosts(post, allPosts);
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
export async function getPaginatedPosts(page: number, category?: string, options: { postsPerPage?: number } = { postsPerPage: 24 }) {
  const { postsPerPage = 12 } = options;

  let posts = await getCollection("blog");
  let sanitizedPosts = posts.map((post) => sanitizePostData(post.data as unknown as BlogPost, post.body, post.rendered, posts.map(p => p.data as unknown as BlogPost)));

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
export async function getRecentPosts(limit: number = 4): Promise<BlogPost[]> {
  const { posts } = await getPaginatedPosts(1, undefined, { postsPerPage: limit });
  return posts;
}

/**
 * Gets all categories.
 * @returns All categories.
 */
export async function getAllCategories(): Promise<BlogPostCategory[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts.map((post) => sanitizePostData(post.data as unknown as BlogPost, post.body, post.rendered));

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
 * Gets related posts based on the given post.
 * @param post The post to get related posts for.
 * @param allPosts All the blog posts.
 * @returns The related posts.
 */
export function getRelatedPosts(post: BlogPost, allPosts: BlogPost[]): BlogPost[] {
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