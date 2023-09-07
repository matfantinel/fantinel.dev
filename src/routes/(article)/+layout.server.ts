import { getPostBySlug } from "$lib/data/blog-posts/api";

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params }) {
  const { slug } = params;

  if (!slug) {
    return {
      status: 404
    };
  }

  const response = {
    post: await getPostBySlug(slug)
  };

  return response;
}
