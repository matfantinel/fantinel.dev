<script lang="ts">
	import BlogPostCard from '$lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import Button from '../atoms/Button.svelte';

	export let posts: BlogPost[];
</script>

<ContentSection
	id="related-posts"
	title="Related Posts"
	description="Have some time? Feel free to read some other posts by me."
>
	<div slot="button">
		<Button href="/blog" additionalClass="plausible-event-name=Related+Post+Click">View all</Button>
	</div>
	<div class="simple-grid">
		{#each posts as post}
			<BlogPostCard
				slug={post.slug}
				title={post.title}
				excerpt={post.excerpt}
				tags={post.tags}
				categories={post.categories}
				readingTime={post.readingTime}
				showImage={false}
				additionalClass="plausible-event-name=Related+Post+Click"
				hasTransition={false}
			/>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.simple-grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 20px;

		@media (max-width: 1070px) {
			grid-template-columns: 1fr 1fr;
		}

		@include for-tablet-portrait-down {
			grid-template-columns: 1fr;
		}
	}
</style>
