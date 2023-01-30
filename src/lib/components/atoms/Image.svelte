<script lang="ts">
	export let path: string;
	export let filename: string;
	export let alt: string;
	export let figcaption: string | undefined = undefined;

	export let formats: string[] = ['webp', 'avif', 'png'];
	export let widths: string[] | undefined = undefined;

	$: imageSrc = `/optimized-images/${path ? path + '/' : ''}${filename}`;
</script>

<picture {...$$restProps}>
	{#each formats as format}
		{#if widths}
			{#each widths as width}
				<source
					srcset="{imageSrc}-{width}.{format}"
					type="image/{format}"
					media="(min-width: {width}px)"
				/>
			{/each}
		{:else}
			<source srcset="{imageSrc}.{format}" type="image/{format}" />
		{/if}
	{/each}

	<img src="{imageSrc}.png" {alt} loading="lazy" decoding="async" />

	{#if figcaption}
		<!-- svelte-ignore a11y-structure -->
		<figcaption>{@html figcaption}</figcaption>
	{/if}
</picture>

<style lang="scss">
	picture {
		position: relative;
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
