<script lang="ts">
	import BlogPostCard from '$lib/components/molecules/BlogPostCard.svelte';
	import Pagination from '$lib/components/molecules/Pagination.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import type { PaginatedResponse } from '$lib/utils/types';
	import { page } from '$app/stores';

	export let data: PaginatedResponse<BlogPost>;

	$: posts = data.items;
	$: totalPages = data.totalPages;
	$: currentPage = data.currentPage;
	$: currentCategory = data.currentCategory;

	let paginationBaseUrl: string;
	$: {
		paginationBaseUrl = $page.url.pathname.split('/').slice(0, 2).join('/');
		if (currentCategory) {
			paginationBaseUrl += `/${currentCategory}`;
		}
	}
</script>

{#key currentPage}
	<div class="container">
		<ContentSection title="Blog Posts">
			<div class="grid">
				{#each posts as post, index}
					<BlogPostCard
						title={post.title}
						coverImage={post.showImage ? post.coverImage : undefined}
						excerpt={post.excerpt}
						readingTime={post.readingTime}
						slug={post.slug}
						tags={post.tags}
						categories={post.categories}
						lazyImage={index > 6}
					/>
				{/each}
			</div>
		</ContentSection>

		<Pagination baseUrl={paginationBaseUrl} {currentPage} {totalPages} />
	</div>
{/key}

<style lang="scss">
	@import '$lib/scss/_mixins.scss';

	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 20px;

		@include for-tablet-portrait-down {
			grid-template-columns: 1fr;
		}

		@include for-tablet-landscape-up {
			// Select every 6 elements, starting from position 1
			// And make it take up 6 columns
			> :global(:nth-child(6n + 1)) {
				grid-column: span 6;
			}
			// Select every 6 elements, starting from position 2
			// And make it take up 3 columns
			> :global(:nth-child(6n + 2)) {
				grid-column: span 3;
			}
			// Select every 6 elements, starting from position 3
			// And make it take up 3 columns
			> :global(:nth-child(6n + 3)) {
				grid-column: span 3;
			}
			// Select every 6 elements, starting from position 4, 5 and 6
			// And make it take up 2 columns
			> :global(:nth-child(6n + 4)),
			:global(:nth-child(6n + 5)),
			:global(:nth-child(6n + 6)) {
				grid-column: span 2;
			}
		}
	}
</style>
