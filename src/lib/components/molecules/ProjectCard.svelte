<script lang="ts">
	import ExternalLink from '$lib/icons/external-link.svelte';
	import Github from '$lib/icons/socials/github.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import type { TagType } from '$lib/utils/types';
	import Image from '$lib/components/atoms/Image.svelte';

	export let name: string;
	export let description: string;
	export let image: string;
	export let link: string | undefined;
	export let sourceCode: string | undefined;
	export let blogPostLink: string | undefined;
	export let tags: TagType[] | undefined;
</script>

<Card additionalClass="project-card">
	<div class="project-image" slot="image">
		{#if image}
			<Image src={image} alt="Screenshot of {name}" />
		{/if}
	</div>
	<div class="content" slot="content">
		<div class="title">
			<span>{name}</span>
			<div class="links">
				{#if sourceCode}
					<a href={sourceCode} target="_blank" rel="noopener noreferrer" title="Open Source Code">
						<Github />
					</a>
				{/if}
				{#if link}
					<a href={link} target="_blank" rel="noopener noreferrer" title="Open Project">
						<ExternalLink />
					</a>
				{/if}
			</div>
		</div>
		<p>{description}</p>
		{#if blogPostLink}
			<Button ref="blog-post-btn" href={blogPostLink} style="understated" color="secondary"
				>Read Blog Post</Button
			>
		{/if}
	</div>
	<div class="footer" slot="footer">
		{#if tags && tags.length > 0}
			<div class="tags">
				{#each tags as tag}
					<Tag color={tag.color}>{tag.label}</Tag>
				{/each}
			</div>
		{/if}
	</div>
</Card>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
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

	.links {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 15px;

		a {
			width: 30px;
			height: 30px;
			padding: 3px;
			color: var(--color--secondary);

			&:hover {
				filter: drop-shadow(0px 0px 3px var(--color--secondary));
			}
		}
	}

	.tags {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
	}

	.footer {
		margin-top: 20px;
	}

	:global(.project-card .image img) {
		object-fit: cover;
	}

	:global([ref='blog-post-btn']) {
		min-width: 220px;
		margin: 10px auto 0;
	}
</style>
