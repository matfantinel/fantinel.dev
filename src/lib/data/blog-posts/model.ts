import customRichTextResolver from "$lib/storyblok/richText/resolver";
import type { Image } from "$lib/utils/types";
import type { ISbStoryData } from "@storyblok/svelte";
import { renderRichText } from '@storyblok/svelte';
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';

type BlogPost = {
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  markdown: string,
  date?: string,
  updated?: string,
  coverImage?: Image,
  previewImage?: Image,
  tags: string[],
  categories: string[],
  keywords: string[],
  readingTime?: string
}

export const storyToBlogPost = (story: ISbStoryData): BlogPost => {
  const renderedContent = renderRichText(story.content.content, undefined, customRichTextResolver);

  return {
    slug: story.slug,
    title: story.name,
    excerpt: story.content.excerpt,
    content: renderedContent,
    markdown: story.content.markdown,
    date: story.first_published_at || undefined,
    updated: (story.published_at === story.first_published_at ? undefined : story.published_at) || undefined,
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
    readingTime: readingTime(striptags(renderedContent) || '').text
  }
}

export default BlogPost;