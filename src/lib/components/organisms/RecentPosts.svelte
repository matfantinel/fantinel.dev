<script lang="ts">
	import BlogPostCard from '$lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';

	export let posts: BlogPost[];
</script>

<ContentSection
	id="recent-posts"
	title="Latest posts"
	description="Every now and then I write about something I'm interested about."
	align="left"
>
	<div slot="button">
		<Button href="/blog">View More</Button>
	</div>
	<div class="grid">
		{#each posts as post}
			<BlogPostCard
				slug={post.slug}
				title={post.title}
				excerpt={post.excerpt}
				tags={post.tags}
				categories={post.categories.slice(0, 2)}
				readingTime={post.readingTime}
				showImage={false}
			/>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;

		@include for-phone-only {
			grid-template-columns: 1fr;
		}
	}
</style>
