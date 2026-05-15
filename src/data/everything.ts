import type { BlogPost } from '@schemas/blog';
import type { CoolLink } from '@schemas/cool-link';
import type { Photography } from '@schemas/photography';
import { PostType } from '@schemas/post-types';
import type { QuickReview } from '@schemas/quick-review';
import type { FilterGroup } from '@schemas/filter';
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

    const dateA = getDate(a);
    const dateB = getDate(b);

    // Check if dates are on the same day
    const isSameDay = dateA.toDateString() === dateB.toDateString();

    if (isSameDay) {
      // If same day, blog posts come first
      if (a.type === PostType.BLOG_POST && b.type !== PostType.BLOG_POST) {
        return -1;
      }
      if (b.type === PostType.BLOG_POST && a.type !== PostType.BLOG_POST) {
        return 1;
      }
    }

    // Otherwise sort by date descending
    return dateB.getTime() - dateA.getTime();
  });
  
  return posts;
}

/**
 * Gets date filters for the archive, grouped by year with months as tags.
 * @param activeSlug - The currently active date slug in YYYY-MM format (optional).
 * @returns Array of filter groups with months grouped by year.
 */
export async function getDateFilters(activeSlug?: string): Promise<FilterGroup[]> {
  const allPosts = await getAllPosts();

  const getPostDate = (item: typeof allPosts[0]): Date => {
    if (item.type === PostType.COOL_LINK) return (item.data as CoolLink).savedOn;
    if (item.type === PostType.PHOTOGRAPHY) return (item.data as Photography).publishedDate;
    return (item.data as BlogPost | QuickReview).date;
  };

  const dateCount = new Map<string, number>();
  const dateMap = new Map<string, { year: number; month: number }>();

  allPosts.forEach((post) => {
    const date = getPostDate(post);
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

  const yearGroups = new Map<number, { label: string; url: string; active: boolean; count: number }[]>();

  dateMap.forEach(({ year, month }, key) => {
    if (!yearGroups.has(year)) {
      yearGroups.set(year, []);
    }

    yearGroups.get(year)!.push({
      label: monthNames[month],
      url: `/archive/date/${key}`,
      active: key === activeSlug,
      count: dateCount.get(key) || 0,
    });
  });

  const filterGroups: FilterGroup[] = Array.from(yearGroups.entries()).map(([year, tags]) => {
    tags.sort((a, b) => b.url.localeCompare(a.url));
    return { label: String(year), tags };
  });

  filterGroups.sort((a, b) => Number(b.label) - Number(a.label));

  if (filterGroups.length > 0 && !filterGroups.some((g) => g.tags?.some((t) => t.active))) {
    filterGroups[0].defaultOpen = true;
  }

  return filterGroups;
}

/**
 * Gets all timeline entries for a given YYYY-MM date slug, grouped by day.
 * @param dateSlug - The date slug in YYYY-MM format.
 * @returns Posts grouped by day for that month.
 */
export async function getEntriesByDate(dateSlug: string): Promise<{ date: string; posts: Awaited<ReturnType<typeof getAllPosts>> }[]> {
  const allPosts = await getAllPosts();

  const getPostDate = (item: typeof allPosts[0]): Date => {
    if (item.type === PostType.COOL_LINK) return (item.data as CoolLink).savedOn;
    if (item.type === PostType.PHOTOGRAPHY) return (item.data as Photography).publishedDate;
    return (item.data as BlogPost | QuickReview).date;
  };

  const filtered = allPosts.filter((post) => {
    const date = getPostDate(post);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return key === dateSlug;
  });

  const groupedByDay = new Map<string, typeof allPosts>();

  filtered.forEach((post) => {
    const day = getPostDate(post).toISOString().split('T')[0];
    if (!groupedByDay.has(day)) {
      groupedByDay.set(day, []);
    }
    groupedByDay.get(day)!.push(post);
  });

  return Array.from(groupedByDay.entries())
    .map(([date, posts]) => ({ date, posts }))
    .sort((a, b) => b.date.localeCompare(a.date));
}