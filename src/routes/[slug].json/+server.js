import { json } from '@sveltejs/kit';

// @migration task: Check imports
import posts from '$lib/posts';

export function GET({ params }) {
  const post = posts.find(x => x.slug === params.slug);
  if (post) {
    throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
    // Suggestion (check for correctness before using):
    // return json(post);
    return {
      status: 200,
      body: post,
    };
  }

  return new Response(undefined, { status: 404 });
}
