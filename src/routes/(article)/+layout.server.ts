import { browser, dev } from "$app/environment";
import { getPostBySlug } from "$lib/data/blog-posts/api";

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params, url }) {
  const { slug } = params;

  if (!slug) {
    return {
      status: 404
    };
  }

  let loadDraft = false;
  if (browser || dev) {
    loadDraft = Boolean(url.searchParams.get("_storyblok"));
  }

  const response = getPostBySlug(slug, loadDraft);

  return response;
}
