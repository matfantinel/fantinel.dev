// Get posts info
const allPosts = import.meta.glob('../../../lib/posts/*.md', { eager: true });

let posts = [];
// Get the posts' slugs
for (let path in allPosts) {
	const post = allPosts[path];
	const slug = post.metadata.slug;
	const p = { post, slug };
	posts.push(p);
}

export function load({ params }) {
	const { slug } = params;

	// Find the post with the slug
	const filteredPost = posts.find((p) => {
		return p.slug.toLowerCase() === slug.toLowerCase();
	});

	return {
		// Tell page to load that post's module
		page: filteredPost.post.default
	};
}
