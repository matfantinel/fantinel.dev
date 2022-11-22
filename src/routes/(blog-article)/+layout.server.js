import { error } from '@sveltejs/kit';
import posts from '$lib/posts';

export async function load({ params }) {
	const post = posts.find((x) => x.slug === params.slug);

	if (post) {
		return {
			post
		};
	}

	throw error(500, `Could not load ${params.slug}`);
}
