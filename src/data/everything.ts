import type { BlogPost } from '@schemas/blog';
import type { CoolLink } from '@schemas/cool-link';
import type { Photography } from '@schemas/photography';
import { PostType } from '@schemas/post-types';
import type { QuickReview } from '@schemas/quick-review';
import { getAllBlogPosts } from "./blogPosts";
import { getAllCoolLinks } from "./coolLinks";
import { getAllPhotographyPosts } from "./photographies";
import { getAllQuickReviews } from "./quickReviews";

/**
 * Gets posts from all content types, sorted by date (newest first)
 * @param page The page number (1-indexed).
 * @param postTypes The post types to filter by.
 * @param options Pagination options including postsPerPage.
 * @returns The paginated posts grouped by date.
 */
export async function getPaginatedTimelineEntries(page: number = 1, postTypes?: PostType[], options: { postsPerPage?: number, breakDays?: boolean } = { postsPerPage: 12, breakDays: false }) {
  const { postsPerPage = 20, breakDays = false } = options;
  const allPosts = await getAllPosts(postTypes);
  
  // Helper to get date from any post type
  const getPostDate = (item: typeof allPosts[0]) => {
    if (item.type === PostType.COOL_LINK) return (item.data as CoolLink).savedOn;
    if (item.type === PostType.PHOTOGRAPHY) return (item.data as Photography).publishedDate;
    return (item.data as BlogPost | QuickReview).date;
  };
  
  // Pages work a bit differently here, because the timeline entries are grouped by date
  // Which means that, for example, if the last item of a page (20th item) is in the day 2026-01-17,
  // and the next item (21st item) is also in that same day, I want to show both together.
  // This means that pages have dynamic sizes.
  // The cleanest way to do this is to just build all the pages and then return the requested one.
  // Since this website is static, there's no performance considerations here, as it's all gonna run just on build.
  // All of the above doesn't apply if "breakDays" is set to true

  const pages: { date: string; posts: typeof allPosts }[][] = [];
  let remainingPosts = [...allPosts];
  
  while (remainingPosts.length > 0) {
    let pagePosts = remainingPosts.slice(0, postsPerPage);
    
    // Extend to complete the date group
    if (remainingPosts.length > postsPerPage && !breakDays) {
      const lastPostDate = getPostDate(pagePosts[pagePosts.length - 1]).toISOString().split('T')[0];
      let extraIndex = postsPerPage;
      
      while (extraIndex < remainingPosts.length) {
        const nextPostDate = getPostDate(remainingPosts[extraIndex]).toISOString().split('T')[0];
        if (nextPostDate === lastPostDate) {
          pagePosts.push(remainingPosts[extraIndex]);
          extraIndex++;
        } else {
          break;
        }
      }
    }
    
    const groupedByDate = new Map<string, typeof pagePosts>();
    
    pagePosts.forEach(post => {
      const date = getPostDate(post);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!groupedByDate.has(dateKey)) {
        groupedByDate.set(dateKey, []);
      }
      
      groupedByDate.get(dateKey)!.push(post);
    });
    
    const groupedPosts = Array.from(groupedByDate.entries()).map(([date, posts]) => ({
      date,
      posts
    }));
    
    pages.push(groupedPosts);
    remainingPosts = remainingPosts.slice(pagePosts.length);
  }
  
  const pageIndex = page - 1;
  
  if (pageIndex < 0 || pageIndex >= pages.length) {
    return {
      posts: [],
      currentPage: page,
      totalPages: pages.length,
      totalPosts: allPosts.length
    };
  }
    
  return {
    posts: pages[pageIndex],
    currentPage: page,
    totalPages: pages.length,
    totalPosts: allPosts.length
  };
}

/**
 * Gets all posts from all post types, sorted by date (newest first).
 * @returns The posts, with their type and data in separate properties.
 */
export async function getAllPosts(postTypes?: PostType[]) {
  if (!postTypes || !postTypes.length) {
    postTypes = [
      PostType.BLOG_POST,
      PostType.QUICK_REVIEW,
      PostType.COOL_LINK,
      PostType.PHOTOGRAPHY
    ];
  }

  const blogPosts = postTypes.includes(PostType.BLOG_POST) ? await getAllBlogPosts(true) : [];
  const reviews = postTypes.includes(PostType.QUICK_REVIEW) ? await getAllQuickReviews() : [];
  const links = postTypes.includes(PostType.COOL_LINK) ? await getAllCoolLinks() : [];
  const photographies = postTypes.includes(PostType.PHOTOGRAPHY) ? await getAllPhotographyPosts() : [];
  
  const posts = [
    ...blogPosts.map(post => ({ type: PostType.BLOG_POST, data: post })), 
    ...reviews.map(review => ({ type: PostType.QUICK_REVIEW, data: review })),
    ...links.map(link => ({ type: PostType.COOL_LINK, data: link })),
    ...photographies.map(photo => ({ type: PostType.PHOTOGRAPHY, data: photo }))
  ].sort((a, b) => {
    // Get the appropriate date property based on content type
    const getDate = (item: typeof a) => {
      if (item.type === PostType.COOL_LINK) return (item.data as CoolLink).savedOn;
      if (item.type === PostType.PHOTOGRAPHY) return (item.data as Photography).publishedDate;
      return (item.data as BlogPost | QuickReview).date;
    };
    
    return getDate(b).getTime() - getDate(a).getTime();
  });
  
  return posts;
}