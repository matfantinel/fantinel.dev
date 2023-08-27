import { getAllSlugs } from '$lib/data/blog-posts/api.js';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { story } = await parent();

  return {
    story
  };
}

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}