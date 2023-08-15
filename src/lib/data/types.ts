import type { ISbStoryData } from "@storyblok/svelte";

export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type ItemWithStoryResponse<T> = {
  item: T;
  story: ISbStoryData;
};