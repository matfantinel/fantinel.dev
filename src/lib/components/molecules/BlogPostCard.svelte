<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import SrcsetImage from '$lib/components/atoms/SrcsetImage.svelte';
	import type { Srcset } from '$lib/utils/types';

	export let categories: string[] | undefined = undefined;
	export let title: string;
	export let coverImage: Srcset | undefined = undefined;
	export let excerpt: string;
	export let slug: string;
	export let tags: string[] | undefined;
	export let readingTime: string | undefined = undefined;

	export let showImage = true;
</script>

<Card
	href="/{slug}"
	target="_self"
	additionalClass="blog-post-card {(!showImage || !coverImage) && 'no-image'}"
>
	<SrcsetImage
		hidden={showImage && coverImage}
		srcset={coverImage || { png: '', webp: '', avif: '' }}
		slot="image"
		alt="Cover image of this blog post"
	/>
	<div class="content" slot="content">
		<p class="title">
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
					<Tag color="secondary">{categories[0]}</Tag>
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

	:global(.blog-post-card.no-image > .image) {
		display: none;
	}
</style>
