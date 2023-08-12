import customRichTextResolver from "$lib/storyblok/richText/resolver";
import type { StoryblokAsset } from "$lib/storyblok/types";
import type { ISbStoryData } from "@storyblok/svelte";
import { renderRichText } from '@storyblok/svelte';
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';

type Article = {
  slug: string,
  title: string,
  excerpt: string,
  content: string,
  markdown: string,
  date?: string,
  updated?: string,
  coverImage: StoryblokAsset | undefined,
  previewImage: StoryblokAsset | undefined,
  tags: string[],
  categories: string[],
  keywords: string[],
  readingTime?: string
}

export const storyToArticle = (story: ISbStoryData): Article | null => {
  if (!story) return null;

  const renderedContent = renderRichText(story.content.content, undefined, customRichTextResolver);

  return {
    slug: story.slug,
    title: story.name,
    excerpt: story.content.excerpt,
    content: renderedContent,
    markdown: story.content.markdown,
    date: story.first_published_at || undefined,
    updated: (story.published_at === story.first_published_at ? undefined : story.published_at) || undefined,
    coverImage: story.content.coverImage,
    previewImage: story.content.previewImage,
    tags: story.content.tags,
    categories: story.content.categories,
    keywords: story.content.keywords?.split(",").map((x: string) => x.trim()) || [],
    readingTime: readingTime(striptags(renderedContent) || '').text
  }
}

export default Article;