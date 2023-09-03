import { getPosts } from '$lib/data/local-blog-posts/api';
import { browser, dev } from "$app/environment";

export async function load({ url }) {
  let currentPage = 1;
  if (browser || dev) {
    const pageParam = url.searchParams.get("page");
    currentPage = pageParam ? parseInt(pageParam) : 1;
  }

  const response = await getPosts(currentPage);

  return response;
}
