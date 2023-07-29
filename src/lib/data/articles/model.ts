import richTextSchema from "$lib/storyblok/richTextSchema";
import type { StoryblokAsset } from "$lib/storyblok/types";
import type { ISbRichtext, ISbStoryData } from "@storyblok/svelte";
import { renderRichText } from '@storyblok/svelte';
import { RichtextResolver } from "storyblok-js-client";
import readingTime from 'reading-time/lib/reading-time';
import striptags from 'striptags';
import emojis from 'unicode-emoji-json/data-by-emoji.json';

type Article = {
  slug: string,
  title: string,
  excerpt: string,
  content: string,
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

  // const renderedContent = renderRichText(story.content.content, {
  //   resolver: (_, blok) => {
  //     return `__BLOK__!!!${JSON.stringify(blok)}__BLOK__`;
  //   }
  // });
  const resolver = new RichtextResolver(richTextSchema);
  (resolver as any).renderEmoji = (item: ISbRichtext) => {
    // Find the emoji unicode character by its name
    // This is done because Storyblok replaces the unicode character with an image, which is dumb
    const emoji = Object.keys(emojis)
      .find(key => ((emojis as any)[key] as any).slug === item.attrs.name);
    return emoji ?? item.attrs.name;
  };
  const renderedContent = renderRichText(story.content.content, undefined, resolver);

  return {
    slug: story.slug,
    title: story.name,
    excerpt: story.content.excerpt,
    content: renderedContent,
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