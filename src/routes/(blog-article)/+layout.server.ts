import { error } from '@sveltejs/kit';
import { filteredPosts } from '$lib/data/blog-posts';

export async function load({ params }: { params: { slug: string } }) {
	const post = filteredPosts.find((x) => x.slug === params.slug);

	if (post) {
		return {
			post
		};
	}

	throw error(500, `Could not load ${params.slug}`);
}
