import { filteredPosts } from '$lib/data/blog-posts-old';

export async function load() {
  return {
    posts: filteredPosts
  };
}
