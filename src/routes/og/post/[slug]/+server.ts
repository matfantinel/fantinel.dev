import type { RequestHandler } from "@sveltejs/kit";

import { getPostBySlug } from "$lib/data/blog-posts/api";
import dateformat from 'dateformat';

import { componentToPng } from "$lib/opengraph/renderImage";
import OpengraphImage from "../../opengraph-image.svelte";

export const config = {
  runtime: 'edge',
};

export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  if (slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return new Response('Not found', { status: 404 });
    }

    return componentToPng(OpengraphImage, { text: post.title, date: dateformat(post.date, 'UTC:dd mmm yyyy') })
  }

  return new Response('Not found', { status: 404 });
};
