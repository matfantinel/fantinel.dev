<script lang="ts">
	import Footer from '$lib/components/organisms/Footer.svelte';
	import Header from '$lib/components/organisms/Header.svelte';

	import Waves from '$lib/components/organisms/Waves.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import { storyToBlogPost } from '$lib/data/blog-posts/model';
	import { keywords, siteBaseUrl, title } from '$lib/data/meta';
	import type { ItemWithStoryResponse } from '$lib/data/types';
	import { useStoryblokBridge } from '@storyblok/svelte';
	import { onMount } from 'svelte';

	export let data: ItemWithStoryResponse<BlogPost>;
	let { item: post, story } = data;

	onMount(() => {
		useStoryblokBridge(story.id, (newStory) => {
			story = newStory;
			post = storyToBlogPost(story);
		});
	});

	let metaKeywords = keywords;

	$: {
		if (post?.categories?.length) {
			metaKeywords = post.categories.concat(metaKeywords);
		}
		if (post?.tags?.length) {
			metaKeywords = post.tags.concat(metaKeywords);
		}
		if (post?.keywords?.length) {
			metaKeywords = post.keywords.concat(metaKeywords);
		}
	}
</script>

<svelte:head>
	{#if post}
		<meta name="keywords" content={metaKeywords.join(', ')} />

		<meta name="description" content={post.excerpt} />
		<meta property="og:description" content={post.excerpt} />
		<meta name="twitter:description" content={post.excerpt} />
		<link rel="canonical" href="{siteBaseUrl}/{post.slug}" />

		<title>{post.title} - {title}</title>
		<meta property="og:title" content="{post.title} - {title}" />
		<meta name="twitter:title" content="{post.title} - {title}" />

		{#if post.previewImage?.src}
			<meta property="og:image" content="{siteBaseUrl}{post.previewImage.src}" />
			<meta name="twitter:image" content="{siteBaseUrl}{post.previewImage.src}" />
		{/if}
	{/if}
</svelte:head>

{#if post}
	<div class="post-layout">
		{#if post.coverImage?.src}
			<div class="cover-image-wrapper">
				<img class="cover-image" src={`${post.coverImage.src}`} alt={post.coverImage.alt} />
				<div class="cover-image-overlay" />
			</div>
		{:else}
			<Waves />
		{/if}

		<Header />

		<main id="article-content" class:has-cover={Boolean(post.coverImage?.src)}>
			<slot />

			<!-- {#if post.relatedPosts && post.relatedPosts.length > 0}
			<div class="container">
				<RelatedPosts posts={post.relatedPosts} />
			</div>
		{/if} -->
		</main>

		<Footer />
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/_mixins.scss';

	.post-layout {
		--body-background-color: var(--color--post-page-background);
		--body-background-color-rgb: var(--color--post-page-background-rgb);
		background-color: var(--color--post-page-background);
	}

	.cover-image-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60dvh;
	}

	.cover-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cover-image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60dvh;
		background-image: linear-gradient(
			to bottom,
			var(--body-background-color) 0%,
			rgba(var(--body-background-color-rgb), 0) 100%
		);
	}

	main {
		min-height: 55dvh;

		position: relative;
		padding-top: 40px;
		padding-bottom: 80px;
		padding-right: 15px;
		padding-left: 15px;

		@include for-iphone-se {
			padding-left: 0;
			padding-right: 0;
		}

		@include for-tablet-portrait-up {
			padding-right: 20px;
			padding-left: 20px;
		}

		@include for-tablet-landscape-up {
			padding-right: 30px;
			padding-left: 30px;
		}

		&.has-cover {
			padding-top: 200px;
		}

		display: grid;
		grid-template-columns:
			1fr
			min(85ch, 100%)
			1fr;
		grid-row-gap: 30px;

		:global(> *) {
			grid-column: 2;
		}

		:global(> .full-bleed) {
			width: 100%;
			grid-column: 1 / 4;
		}
	}
</style>
