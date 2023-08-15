import { useStoryblokApi, type ISbStoryData } from "@storyblok/svelte";
import type { ItemWithStoryResponse, PaginatedResponse } from "../types";
import type Article from "./model";
import { storyToArticle } from "./model";

const PAGE_SIZE = 3;

export const getPosts = async (page: number = 1): Promise<PaginatedResponse<Article>> => {
  const storyblokApi = useStoryblokApi();

  const response = await storyblokApi.get(`cdn/stories`, {
    starts_with: 'articles/',
    is_startpage: false, // exclude the /articles root page from the result,
    per_page: PAGE_SIZE,
    page: page,
  });

  let posts: Article[] = [];
  if (response.data?.stories?.length) {
    posts = response.data.stories.map((story: ISbStoryData) => storyToArticle(story));
  }

  return {
    items: posts,
    totalItems: (response.headers as any).total,
    totalPages: Math.ceil((response.headers as any).total / PAGE_SIZE),
    currentPage: page
  };
};

export const getPostBySlug = async (slug: string, loadDraft: boolean = false): Promise<ItemWithStoryResponse<Article> | null> => {
  const storyblokApi = useStoryblokApi();

  const response = await storyblokApi.get(`cdn/stories/articles/${slug}`, { version: loadDraft ? 'draft' : 'published' });

  if (response.data?.story) {
    return {
      story: response.data.story,
      item: storyToArticle(response.data.story)
    }
  }

  return null;
}