/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { story } = await parent();

  return {
    story
  };
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  // TODO: query Storyblok API for all article slugs
  return [
    { slug: '2019-year-in-review' }
  ];
}