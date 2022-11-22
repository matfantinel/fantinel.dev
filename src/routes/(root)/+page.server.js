import { error } from '@sveltejs/kit';
import posts from '$lib/posts';

export async function load({ params }) {
	const result = Object.keys(posts)
		.slice(0, 4)
		.map((index) => {
			const { slug, title, date, excerpt, tags, readingTime } = posts[index];
			return {
				slug,
				title,
				date,
				excerpt,
				tags,
				readingTime
			};
		});

	if (result) {
		return {
			posts: result
		};
	}

	throw error(500, `Could not load ${params.slug}`);
}
