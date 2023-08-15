import { filteredPosts } from '$lib/data/blog-posts-old';

export async function load({ url }: { url: { pathname: string } }) {
  const { pathname } = url;
  const slug = pathname.replace('/old/', '');
  const post = filteredPosts.find((post) => post.slug === slug);

  return {
    post
  };
}
