import { json } from '@sveltejs/kit';

// @migration task: Check imports
import posts from '$lib/posts';

export function GET({ params }) {
	const post = posts.find((x) => x.slug === params.slug);
	if (post) {
		// Suggestion (check for correctness before using):
		// return json(post);
		return json(post);
	}

	return new Response(undefined, { status: 404 });
}
