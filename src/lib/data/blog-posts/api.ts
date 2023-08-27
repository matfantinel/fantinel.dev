import { useStoryblokApi, type ISbStoryData } from "@storyblok/svelte";
import type { ItemWithStoryResponse, PaginatedResponse } from "../types";
import type BlogPost from "./model";
import { storyToBlogPost } from "./model";

const PAGE_SIZE = 10;

export const getPosts = async (page: number = 1): Promise<PaginatedResponse<BlogPost>> => {
  const storyblokApi = useStoryblokApi();

  const response = await storyblokApi.get(`cdn/stories`, {
    starts_with: 'blog/',
    is_startpage: false, // exclude the /blog root page from the result,
    per_page: PAGE_SIZE,
    page: page,
    sort_by: 'content.publishedDate:desc'
  });

  let posts: BlogPost[] = [];
  if (response.data?.stories?.length) {
    posts = response.data.stories.map((story: ISbStoryData) => storyToBlogPost(story));
  }

  return {
    items: posts,
    totalItems: (response.headers as any).total,
    totalPages: Math.ceil((response.headers as any).total / PAGE_SIZE),
    currentPage: page
  };
};

export const getPostBySlug = async (slug: string, loadDraft: boolean = false): Promise<ItemWithStoryResponse<BlogPost> | null> => {
  const storyblokApi = useStoryblokApi();

  const response = await storyblokApi.get(`cdn/stories/blog/${slug}`, { version: loadDraft ? 'draft' : 'published' });

  if (response.data?.story) {
    return {
      story: response.data.story,
      item: storyToBlogPost(response.data.story)
    }
  }

  return null;
}

export const getAllSlugs = async (): Promise<string[]> => {
  const storyblokApi = useStoryblokApi();

  const response = await storyblokApi.get(`cdn/stories`, {
    starts_with: 'blog/',
    is_startpage: false, // exclude the /blog root page from the result,
    per_page: 100,
    sort_by: 'content.publishedDate:desc',
    excluding_fields: 'content,tags,categories,keywords,coverImage,previewImage,excerpt,component,updatedDate'
  });


  let slugs: string[] = [];
  if (response.data?.stories?.length) {
    slugs = response.data.stories.map((story: ISbStoryData) => story.slug);
  }

  return slugs;
}