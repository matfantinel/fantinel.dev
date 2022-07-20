import posts from '$lib/posts';

export async function GET() {
	const body = Object.keys(posts).map((index) => {
    const { slug, title, date, excerpt, tags, readingTime } = posts[index]
    return {
      slug,
      title,
      date,
      excerpt,
      tags,
      readingTime
    }
  });

	return {
    status: 200,
		body: JSON.stringify(body)
	};
}