<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import Markdown from '$lib/components/molecules/Markdown.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import { storyToBlogPost } from '$lib/data/blog-posts/model';
	import type { ItemWithStoryResponse } from '$lib/data/types';
	import { useStoryblokBridge } from '@storyblok/svelte';
	import dateformat from 'dateformat';
	import { onMount } from 'svelte';

	export let data: ItemWithStoryResponse<BlogPost>;
	let { item: post, story } = data;

	onMount(() => {
		useStoryblokBridge(story.id, (newStory) => {
			story = newStory;
			post = storyToBlogPost(story);
		});
	});
</script>

{#key post}
	<Card additionalClass="article-card">
		<div class="wrapper" slot="content">
			<div class="header">
				{#if post}
					<h1>{post.title}</h1>
					<div class="note">
						Published {dateformat(post.date, 'UTC:dd mmmm yyyy')}
					</div>
					{#if post.updated}
						<div class="note">Updated on {dateformat(post.updated, 'UTC:dd mmmm yyyy')}</div>
					{/if}
					{#if post.readingTime}
						<div class="note">{post.readingTime}</div>
					{/if}
					{#if post.categories?.length || post.tags?.length}
						<div class="tags">
							{#if post.categories?.length}
								<Tag color="secondary">{post.categories[0]}</Tag>
							{/if}
							{#if post.tags?.length}
								{#each post.tags as tag}
									<Tag>{tag}</Tag>
								{/each}
							{/if}
						</div>
					{/if}
				{/if}
			</div>
			<div class="content">
				{#if post}
					{#if post?.content}
						<Markdown content={post.content} />
					{/if}
				{/if}
			</div>
		</div>
	</Card>
{/key}

<style lang="scss">
	.wrapper {
		padding-block: 60px;

		display: grid;
		grid-template-columns:
			1fr
			min(60ch, 100%)
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

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;

		.note {
			font-size: 85%;
			color: rgba(var(--color--text-rgb), 0.8);
		}
	}

	.tags {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		flex-wrap: wrap;
	}
</style>
