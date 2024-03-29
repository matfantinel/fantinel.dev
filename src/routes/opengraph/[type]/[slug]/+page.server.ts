import { getAllSlugs } from '$lib/data/blog-posts/api.js';

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug, type: 'post' }));
}