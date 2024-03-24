<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import type { Image as ImageType } from '$lib/utils/types';

	export let categories: string[] | undefined = undefined;
	export let title: string;
	export let coverImage: string | ImageType | undefined = undefined;
	export let excerpt: string;
	export let slug: string;
	export let tags: string[] | undefined;
	export let readingTime: string | undefined = undefined;
	export let additionalClass: string | undefined = undefined;
	export let hasTransition: boolean = true;
	export let lazyImage: boolean = true;

	export let showImage = true;
</script>

<Card
	href="/{slug}"
	on:click
	additionalClass="blog-post-card {(!showImage || !coverImage) && 'hide-image'} {showImage &&
		!coverImage &&
		'missing-image'} {additionalClass}"
>
	<div class="cover-image" slot="image">
		{#if coverImage && showImage}
			<Image
				src={typeof coverImage === 'string' ? coverImage : coverImage.src}
				alt={typeof coverImage === 'string' ? 'Cover image of this blog post' : coverImage.alt}
				lazy={lazyImage}
			/>
		{/if}
	</div>
	<div class="content" slot="content">
		<p class="title" style={hasTransition ? `view-transition-name: title-${slug}` : ''}>
			{title}
		</p>
		{#if readingTime}
			<div class="note">{readingTime}</div>
		{/if}
		<p class="text">
			{excerpt}
		</p>
	</div>
	<div class="footer" slot="footer">
		{#if categories?.length || tags?.length}
			<div class="tags">
				{#if categories?.length}
					{#each categories as category}
						<Tag>{category}</Tag>
					{/each}
				{/if}
				{#if tags?.length}
					{#each tags.slice(0, 2) as tag}
						<Tag>{tag}</Tag>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</Card>

<style lang="scss">
	@import '../../scss/breakpoints.scss';
	.content {
		display: flex;
		flex-direction: column;
		gap: 0px;
		align-items: flex-start;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 1.2rem;
		font-family: var(--font--title);
		font-weight: 700;
		text-wrap: balance;
	}

	.tags {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
	}

	.note {
		font-size: 0.8rem;
		color: rgba(var(--color--text-rgb), 0.8);
	}

	.text {
		margin-top: 5px;
		font-size: 0.9rem;
		text-align: justify;
	}

	.footer {
		margin-top: 20px;
	}

	:global(.blog-post-card .image img) {
		object-fit: cover;
	}

	:global(.blog-post-card.hide-image .image) {
		display: none;
	}

	@include for-tablet-portrait-down {
		:global(.blog-post-card.missing-image .image) {
			display: none;
		}
	}
</style>
