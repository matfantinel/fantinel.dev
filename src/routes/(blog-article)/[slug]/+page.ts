import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  // Unfortunately I have to reimport the posts here, because it's the only way
  // I was able to access the post as a component module, that can then
  // be rendered in the page component with svelte:element

  const allPosts = import.meta.glob(`../../../lib/posts/*.md`, { eager: true });
  const post = allPosts[`../../../lib/posts/${params.slug}.md`] as any;

  if (post) {
    return {
      page: post.default
    };
  }

  throw error(500, `Could not load ${params.slug}`);
}
