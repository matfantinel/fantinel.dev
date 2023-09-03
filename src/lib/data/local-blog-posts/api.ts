import fs from 'fs-extra';
import grayMatter from 'gray-matter';
import path from 'path';
import type BlogPost from "../blog-posts/model";
import type { PaginatedResponse } from "../types";
import { frontmatterToBlogPost } from "./model";

const PAGE_SIZE = 10;
const POSTS_PATH = path.join(process.cwd(), 'cms/articles');

export const getPosts = async (page: number = 1): Promise<PaginatedResponse<BlogPost>> => {
  // Read all files in the specified directory and get the .md files
  const fileNames = await fs.readdir(POSTS_PATH);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
  // Reverse the array so that the newest posts are first
  mdFiles.reverse();

  // Paginate
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = page * PAGE_SIZE;
  const paginatedMdFiles = mdFiles.slice(startIndex, endIndex);

  const blogPosts: BlogPost[] = [];

  for (const mdFile of paginatedMdFiles) {
    const fileContent = await fs.readFile(`${POSTS_PATH}/${mdFile}`, 'utf-8');
    const parsedData = grayMatter(fileContent);
    blogPosts.push(frontmatterToBlogPost(parsedData.data, parsedData.content));
  }

  return {
    items: blogPosts,
    totalItems: mdFiles.length,
    totalPages: Math.ceil(mdFiles.length / PAGE_SIZE),
    currentPage: page
  }
}

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const fileNames = await fs.readdir(POSTS_PATH);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const mdFile = mdFiles.find((fileName) => fileName.endsWith(`${slug}.md`));
  if (!mdFile) {
    return null;
  }

  const fileContent = await fs.readFile(`${POSTS_PATH}/${mdFile}`, 'utf-8');
  const parsedData = grayMatter(fileContent);
  return frontmatterToBlogPost(parsedData.data, parsedData.content)
}

export const getAllSlugs = async (): Promise<string[]> => {
  const fileNames = await fs.readdir(POSTS_PATH);

  // Filenames are in the format yyyy-MM-dd-slug.md
  // Grab only the slug
  const slugs = fileNames.map((fileName) => fileName.split('-').slice(3).join('-').replace('.md', ''));

  return slugs;
}