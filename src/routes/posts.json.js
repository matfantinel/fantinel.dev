import posts from '$lib/posts';

export async function get() {
	const body = Object.keys(posts).slice(0, 4).map((slug) => ({
    slug,
    ...posts[slug],
  }));

	return {
    status: 200,
		body: JSON.stringify(body)
	};
}