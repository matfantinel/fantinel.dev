import posts from '$lib/posts';

export function GET({ params }) {
  const post = posts.find(x => x.slug === params.slug);
  if (post) {
    return {
      status: 200,
      body: post,
    };
  }

  return {
    status: 404,
  };
}
