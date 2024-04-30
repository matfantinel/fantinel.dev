import OpengraphImage from '../opengraph-image.svelte';

import { componentToPng } from '$lib/opengraph/renderImage';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
  const { text } = params;

  return componentToPng(OpengraphImage, { text });
};