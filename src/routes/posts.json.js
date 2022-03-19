import posts from '$lib/posts';

export async function get() {
	const body = Object.keys(posts).slice(0, 4).map((index) => {
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