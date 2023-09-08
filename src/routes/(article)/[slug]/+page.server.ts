import { getAllSlugs } from '$lib/data/blog-posts/api';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const data = await parent();
  return data;
}

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}