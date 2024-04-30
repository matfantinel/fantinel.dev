import type { RequestHandler } from "@sveltejs/kit";

import { componentToPng } from "$lib/opengraph/renderImage";
import OpengraphImage from "./opengraph-image.svelte";

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams;

  const text = query.get('text');
  const date = query.get('date');

  if (!text) {
    return new Response('Text query param is mandatory', { status: 400 });
  }

  return componentToPng(OpengraphImage, { text, date })
};
