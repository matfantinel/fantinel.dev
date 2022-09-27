import posts from '$lib/posts';

export async function GET() {
	const body = Object.keys(posts)
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

	return new Response(JSON.stringify(body));
}
