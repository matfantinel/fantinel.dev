import { getPosts, getPostsByCategory } from '$lib/data/blog-posts/api';
import { browser, dev } from "$app/environment";

export async function load({ url }) {
  let category;
  let currentPage = 1;
  if (browser || dev) {
    const pageParam = url.searchParams.get("page");
    currentPage = pageParam ? parseInt(pageParam) : 1;

    category = url.searchParams.get("category");
  }

  let response;
  if (category) {
    response = await getPostsByCategory(category, currentPage);
  } else {
    response = await getPosts(currentPage);
  }

  return response;
}
