import { filteredPosts } from '$lib/data/blog-posts';

export async function load() {
  return {
    posts: filteredPosts
  };
}
