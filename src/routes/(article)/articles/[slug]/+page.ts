/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { story } = await parent();

  return {
    story
  };
}
