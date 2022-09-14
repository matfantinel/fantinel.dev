

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import BlogGrid from '$lib/components/layout/3-2-1-grid.svelte';
	import Section from '$lib/components/layout/section.svelte';
	import BlogPostCard from '$lib/components/base/blog-post-card.svelte';

	export let posts;
</script>

<section id="blog">
	<Section align="top" title="All posts">
		<div class="container">
			<BlogGrid>
				{#each posts as post}
					<BlogPostCard {post} />
				{/each}
			</BlogGrid>
		</div>
	</Section>
</section>
