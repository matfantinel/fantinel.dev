<script lang="ts">
	import { HttpRegex } from '$lib/utils/regex';

	export let additionalClass: string | undefined = undefined;

	export let href: string | undefined = undefined;
	const isExternalLink = !!href && HttpRegex.test(href);
	export let target: '' | '_blank' = isExternalLink ? '_blank' : '';
	export let rel = isExternalLink ? 'noopener noreferrer' : undefined;

	$: tag = href ? 'a' : 'article';
	$: linkProps = {
		href,
		target,
		rel
	};
</script>

<svelte:element
	this={tag}
	class="card {additionalClass}"
	{...linkProps}
	data-sveltekit-preload-data
	{...$$restProps}
>
	<div class="wrapper">
		{#if $$slots.image}
			<div class="image">
				<slot name="image" />
			</div>
		{/if}
		<div class="body">
			<div class="content">
				<slot name="content" />
			</div>
			{#if $$slots.footer}
				<div class="footer">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</div>
</svelte:element>

<style lang="scss">
	.card {
		background: var(--color--card-background);
		box-shadow: var(--card-shadow);
		color: var(--color--text);
		border-radius: 10px;
		transition: all 0.4s ease;
		position: relative;
		overflow: hidden;
		width: 100%;

		text-decoration: none;

		&[href],
		&[onclick] {
			cursor: pointer;
			&:hover {
				box-shadow: var(--card-shadow-hover);
				transform: scale(1.01);
			}
		}
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
		padding: 20px 20px;
		flex: 1 0 50%;

		.content {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}

	.image {
		background-color: var(--color--post-page-background);
		position: relative;
		flex: 1 0 max(50%, 330px);
		// height: min(100%, 300px);
		min-height: 280px;
		max-height: 350px;
	}

	:global(.card [slot='image']) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
	}

	@supports (container-type: inline-size) {
		.card {
			container-type: inline-size;
		}

		@container (max-width: 675px) {
			.wrapper {
				flex-direction: column;
				flex-wrap: nowrap;
			}
			.image {
				flex: 0 0 50%;
				max-width: unset;
			}
		}
	}
</style>
