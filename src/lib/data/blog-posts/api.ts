import fs from 'fs-extra';
import grayMatter from 'gray-matter';
import path from 'path';
import type { PaginatedResponse } from "$lib/utils/types";
import { frontmatterToBlogPost } from "./model";
import type BlogPost from './model';

const PAGE_SIZE = 12;
const MD_FILES_PATH = path.join(process.cwd(), 'cms/articles');

export const getPosts = async (page?: number, count?: number, showHidden = false): Promise<PaginatedResponse<BlogPost>> => {
  // Read all files in the specified directory and get the .md files
  const fileNames = await fs.readdir(MD_FILES_PATH);
  let mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
  // Reverse the array so that the newest posts are first
  mdFiles.reverse();

  if (!showHidden) {
    // Only get files that don't end with --hidden
    mdFiles = mdFiles.filter((item) => !item.endsWith('--hidden.md'));
  }

  const paginatedMdFiles = paginate(mdFiles, page, count);

  let blogPosts: BlogPost[] = [];

  for (const mdFile of paginatedMdFiles) {
    const fileContent = await fs.readFile(`${MD_FILES_PATH}/${mdFile}`, 'utf-8');
    const parsedData = grayMatter(fileContent);
    blogPosts.push(frontmatterToBlogPost(parsedData.data, parsedData.content));
  }

  return {
    items: blogPosts,
    totalItems: mdFiles.length,
    totalPages: Math.ceil(mdFiles.length / (count ?? PAGE_SIZE)),
    currentPage: page ?? 1
  }
}

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const allPosts = await getPosts(undefined, undefined, true);
  const post = allPosts.items?.find((post) => post.slug === slug) ?? null;
  if (post) {
    post.relatedPosts = getRelatedPosts(post, allPosts.items);
  }

  return post;
}

export const getAllSlugs = async (): Promise<string[]> => {
  const fileNames = await fs.readdir(MD_FILES_PATH);

  // Filenames are in the format yyyy-MM-dd-slug.md
  // Grab only the slug
  const slugs = fileNames.map((fileName) => fileName.split('-').slice(3).join('-').replace('.md', '').replace('--hidden', ''));

  return slugs;
}

export const getPostsByCategory = async (category: string, page?: number, count?: number, showHidden = false): Promise<PaginatedResponse<BlogPost>> => {
  // Since categories are inside the frontmatter, we need to read all files
  const allPosts = await getPosts(undefined, undefined, showHidden);

  let filteredPosts = allPosts.items?.filter(
    (post) => post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
  ) ?? [];

  const paginatedPosts = paginate(filteredPosts, page, count);

  return {
    items: paginatedPosts,
    totalItems: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / (count ?? PAGE_SIZE)),
    currentPage: page ?? 1,
    currentCategory: category
  }
}

// #region Private

const paginate = (items: any[], page?: number, count?: number): any[] => {
  const pageSize = count ?? PAGE_SIZE;
  const startIndex = page ? (page - 1) * pageSize : 0;
  const endIndex = page ? page * pageSize : count ?? 9999;
  const paginatedItems = items.slice(startIndex, endIndex);

  return paginatedItems;
}

const getRelatedPosts = (post: BlogPost, allPosts: BlogPost[], count: number = 3): BlogPost[] => {
  const otherPosts = allPosts.filter((otherPost) => !otherPost.hidden && otherPost.slug !== post.slug);
  const rankedPosts = otherPosts.map((otherPost) => {
    return {
      post: otherPost,
      score: otherPost.categories.filter((category) => post.categories.includes(category)).length
    };
  }).sort((a, b) => {
    if (b.score === a.score && b.post.date && a.post.date) {
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    } else {
      return b.score - a.score;
    }
  });

  return rankedPosts.map(p => p.post).slice(0, count);
}

// #endregion