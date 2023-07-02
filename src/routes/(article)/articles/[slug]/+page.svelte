<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import { storyToArticle } from '$lib/data/articles/model';
	import { renderRichText, useStoryblokBridge } from '@storyblok/svelte';
	import dateformat from 'dateformat';
	import { onMount } from 'svelte';

	export let data: { story: any };
	$: ({ story } = data);
	$: article = storyToArticle(story);
	$: articleHtml = renderRichText(article?.content);

	onMount(() => {
		useStoryblokBridge(story.id, (newStory) => {
			story = newStory;
			article = storyToArticle(story);
		});
	});
</script>

{#key article}
	<Card>
		<div class="wrapper" slot="content">
			<div class="header">
				{#if article}
					<h1>{article.title}</h1>
					<div class="note">
						Published {dateformat(article.date, 'UTC:dd mmmm yyyy')}
					</div>
					{#if article.updated}
						<div class="note">Updated on {dateformat(article.updated, 'UTC:dd mmmm yyyy')}</div>
					{/if}
					<!-- {#if post.readingTime}
      <div class="note">{post.readingTime}</div>
    {/if} -->
					{#if article.categories?.length || article.tags?.length}
						<div class="tags">
							{#if article.categories?.length}
								<Tag color="secondary">{article.categories[0]}</Tag>
							{/if}
							{#if article.tags?.length}
								{#each article.tags as tag}
									<Tag>{tag}</Tag>
								{/each}
							{/if}
						</div>
					{/if}
				{/if}
			</div>
			<div class="content">
				{@html articleHtml}
			</div>
		</div>
	</Card>
{/key}

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns:
			1fr
			min(65ch, 100%)
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
