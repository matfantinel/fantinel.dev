import type { StoryblokAsset } from "$lib/storyblok/types";
import type { ISbRichtext, ISbStoryData } from "@storyblok/svelte";

type Article = {
  slug: string,
  title: string,
  excerpt: string,
  content: ISbRichtext,
  date?: string,
  updated?: string,
  coverImage: StoryblokAsset | undefined,
  previewImage: StoryblokAsset | undefined,
  tags: string[],
  categories: string[],
  keywords: string[],
}

export const storyToArticle = (story: ISbStoryData): Article | null => {
  if (!story) return null;

  return {
    slug: story.slug,
    title: story.name,
    excerpt: story.content.excerpt,
    content: story.content.content,
    date: story.first_published_at || undefined,
    updated: (story.published_at === story.first_published_at ? undefined : story.published_at) || undefined,
    coverImage: story.content.coverImage,
    previewImage: story.content.previewImage,
    tags: story.content.tags,
    categories: story.content.categories,
    keywords: story.content.keywords?.split(",").map((x: string) => x.trim()) || [],
  }
}

export default Article;