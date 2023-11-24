<script lang="ts">
	import Tag from '$lib/components/atoms/Tag.svelte';
	import Markdown from '$lib/components/molecules/Markdown.svelte';
	import type BlogPost from '$lib/data/blog-posts/model';
	import dateformat from 'dateformat';

	export let data: { post: BlogPost };
	$: ({ post } = data);
</script>

{#key post}
	<div id="article-page">
		<div class="header">
			{#if post}
				<h1 style={`view-transition-name: title-${post.slug}`}>{post.title}</h1>
				<div class="meta">
					<img
						class="author-photo"
						src="https://www.gravatar.com/avatar/03096594216040d3777c75862fde89a5?s=100"
						alt="Matt Fantinel"
					/>
					<div class="details">
						<p class="note">by Matt Fantinel</p>
						<p class="note">{dateformat(post.date, 'UTC:dd mmm yyyy')} - {post.readingTime}</p>
						{#if post.updated}
							<p class="note">Updated {dateformat(post.updated, 'UTC:dd mmm yyyy')}</p>
						{/if}
					</div>
				</div>
				{#if post.categories?.length || post.tags?.length}
					<div class="tags">
						{#if post.categories?.length}
							{#each post.categories as category}
								<Tag>{category}</Tag>
							{/each}
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
		<div class="article-content">
			{#if post}
				{#if post?.content}
					<Markdown content={post.content} />
				{/if}
			{/if}
		</div>
	</div>
{/key}

<style lang="scss">
	#article-page {
		--main-column-width: 60ch;
		padding-block: 60px;

		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;

		width: min(var(--main-column-width), 100%);
		margin: 0 auto;

		h1 {
			text-align: center;
		}

		.meta {
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 15px 0;

			.author-photo {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				object-fit: cover;
				margin: 0;
			}

			.details {
				display: flex;
				flex-direction: column;
			}
		}
		.note {
			font-size: 80%;
			color: rgba(var(--color--text-rgb), 0.8);
			margin: 0;
		}
	}

	.article-content {
		display: grid;
		grid-template-columns:
			1fr
			min(var(--main-column-width), 100%)
			1fr;

		:global(> *) {
			grid-column: 2;
		}

		:global(> .full-bleed),
		:global(> p:has(> .full-bleed)) {
			grid-column: 1 / 4;
			max-width: 2200px;
			max-height: 600px;
			margin-left: auto;
			margin-right: auto;

			width: calc(100% + (var(--inline-padding) * 2));
			translate: calc(var(--inline-padding) * -1);

			:global(> figure.full-bleed img) {
				margin-top: 0;
				border-radius: 0;
				box-shadow: none;
				max-height: 100%;
				object-fit: cover;
				width: 100%;

				// Currently Chromium-only: https://caniuse.com/mdn-css_properties_animation-timeline
				animation: parallax-effect linear;
				animation-timeline: scroll(block);

				@keyframes parallax-effect {
					0% {
						object-position: top;
					}
					25% {
						object-position: center;
					}
					50% {
						object-position: bottom;
					}
				}
			}
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
