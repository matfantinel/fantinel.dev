<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // Get posts info
	// const allPosts = import.meta.glob('../../lib/posts/*.md',  { eager: true });

	// let posts = [];
  // Get the posts' slugs
	// for (let path in allPosts) {
	// 	const post = allPosts[path];
	// 	const slug = post.metadata.slug;
	// 	const p = { post, slug };
	// 	posts.push(p);
	// }

	// export function load({ params }) {
	// 	const { slug } = params;

    // Find the post with the slug
	// 	const filteredPost = posts.find((p) => {
	// 		return p.slug.toLowerCase() === slug.toLowerCase();
	// 	});

	// 	return {
	// 		props: {
        // Tell page to load that post's module
	// 			page: filteredPost.post.default
	// 		}
	// 	};
	// };
</script>

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	export let page;
</script>

<svelte:component this={page}/>