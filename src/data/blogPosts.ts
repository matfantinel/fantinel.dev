import metaConfig from "@public/cms/meta.yml";
import type { SiteMeta } from "@schemas/site-meta";
import { handleCmsMediaPath } from "@utils/functions";
import type { RenderedContent } from "astro:content";
import { getCollection } from "astro:content";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import { slug } from 'github-slugger'
import type { BlogPost } from "@schemas/blog";

const siteMeta: SiteMeta = metaConfig;

export function sanitizePostData(post: BlogPost, postBody?: string, renderedPost?: RenderedContent) {
  if (postBody) {
    post.readingTime = readingTime(striptags(postBody)).text
  }

  if (post.showToc && renderedPost?.metadata?.headings) {
    post.toc = (renderedPost.metadata.headings as any[]).map((heading: any) => {
      return {
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth
      }
    });
  }

  if (!post.author && siteMeta.author) {
    post.author = {
      name: siteMeta.author.name,
      image: siteMeta.author.avatar
    };
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

  return post;
}

export async function getPaginatedPosts(page: number, category?: string, options: { postsPerPage?: number } = { postsPerPage: 12 }) {
  const { postsPerPage = 12 } = options;

  let posts = await getCollection("blog");
  let sanitizedPosts = posts.map((post) => sanitizePostData(post.data as unknown as BlogPost, post.body, post.rendered));

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
    category
  };
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const posts = await getCollection("blog");
  const sanitizedPosts = posts.map((post) => sanitizePostData(post.data as unknown as BlogPost, post.body, post.rendered));

  const categories = sanitizedPosts.flatMap((post) => {
    const cats = post.categories?.map(c => c.slug);
    return Array.isArray(cats) ? cats : [];
  });

  return [...new Set(categories)];
}