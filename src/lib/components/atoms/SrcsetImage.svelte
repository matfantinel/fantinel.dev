<script lang="ts">
	import type { Srcset } from '$lib/utils/types';

	export let srcset: Srcset;
	export let alt: string;
	export let figcaption: string | undefined = undefined;
</script>

<picture {...$$restProps}>
	{#if srcset.avif}
		<source srcset={srcset.avif} type="image/avif" />
	{/if}
	{#if srcset.webp}
		<source srcset={srcset.webp} type="image/webp" />
	{/if}

	<img src={srcset.png} {alt} loading="lazy" decoding="async" />

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
