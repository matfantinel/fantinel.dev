import type { Image } from "$lib/utils/types";
import type { ISbStoryData } from "@storyblok/svelte";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';

type BlogPost = {
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  date?: string,
  updated?: string,
  coverImage?: Image,
  previewImage?: Image,
  tags: string[],
  categories: string[],
  keywords?: string[],
  readingTime?: string
}

export const storyToBlogPost = (story: ISbStoryData): BlogPost => {
  return {
    slug: story.slug,
    title: story.name,
    excerpt: story.content.excerpt,
    content: story.content.content,
    date: story.content.publishedDate || story.first_published_at || undefined,
    updated: story.content.updatedDate || undefined,
    coverImage: story.content.coverImage ? {
      src: story.content.coverImage.filename,
      alt: story.content.coverImage.alt
    } : undefined,
    previewImage: story.content.previewImage ? {
      src: story.content.previewImage.filename,
      alt: story.content.previewImage.alt
    } : undefined,
    tags: story.content.tags,
    categories: story.content.categories,
    keywords: story.content.keywords?.split(",").map((x: string) => x.trim()) || [],
    readingTime: readingTime(striptags(story.content.content) || '').text
  }
}

export default BlogPost;