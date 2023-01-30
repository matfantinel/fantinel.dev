<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

	export let title: string;
	export let excerpt: string;
	export let readingTime: string;
	export let slug: string;
	export let tags: string[] | undefined;

	export let showImage = true;
</script>

<Card href="/{slug}" target="_self" additionalClass="blog-post-card {!showImage && 'no-image'}">
	<Image
		hidden={showImage}
		path="posts/{slug}"
		filename="cover"
		slot="image"
		alt="Cover image of this blog post"
	/>
	<div class="content" slot="content">
		<div class="title">
			<h4>{title}</h4>
		</div>
		<p class="note">{readingTime}</p>
		<p class="text">
			{excerpt}
		</p>
	</div>
	<div class="footer" slot="footer">
		{#if tags && tags.length > 0}
			<div class="tags">
				{#each tags.slice(0, 2) as tag}
					<Tag>{tag}</Tag>
				{/each}
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
