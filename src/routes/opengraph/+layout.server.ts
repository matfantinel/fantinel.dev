import { getPostBySlug } from "$lib/data/blog-posts/api";
import dateformat from 'dateformat';

/** @type {import('./$types').LayoutLoadEvent} */
export async function load({ params }) {
  const { type, slug, title } = params;


  if (!slug && !title) {
    return {
      status: 404
    };
  }

  let response;

  if (type === 'post' && slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return {
        status: 404
      };
    }

    response = {
      title: post.title,
      date: dateformat(post.date, 'UTC:dd mmm yyyy')
    };
  } else if (title) {
    response = {
      title: title
    };
  } else {
    response = {
      status: 404
    };
  }

  return response;
}
