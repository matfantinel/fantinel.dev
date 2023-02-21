<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';
	import type { TagType } from '$lib/utils/types';
	import TintHighlight from './TintHighlight.svelte';

	export let companySlug: string | undefined = undefined;
	export let company: string;
	export let jobTitle: string;
	export let timeframe: string;
	export let description: string;
	export let tags: TagType[] | undefined;
</script>

<Card>
	<div class="content" slot="content">
		<p class="title">
			<TintHighlight color={companySlug}>{company}</TintHighlight>
		</p>
		<p>{jobTitle}</p>
		<p class="note">{timeframe}</p>
		<p class="text">
			{description}
		</p>
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
</style>
