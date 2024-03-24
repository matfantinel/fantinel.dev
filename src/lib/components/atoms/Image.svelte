<script lang="ts">
	import { dev } from '$app/environment';
	import { HttpRegex } from '$lib/utils/regex';

	export let additionalClass: string | undefined = undefined;

	export let src: string;
	export let alt: string;
	export let figcaption: string | undefined = undefined;
	export let fullBleed: boolean | undefined = undefined;
	export let lazy: boolean = true;

	export let formats: string[] = ['avif', 'webp', 'png'];
	export let widths: string[] | undefined = undefined;

	// $: fileName = src ? src.split('.')[0] : '';

	let fileName: string;
	let srcSet: string | undefined;

	$: {
		fileName = src ? src.split('.')[0] : '';
		srcSet = buildSrcset();
	}

	function buildSrcset() {
		if (dev || HttpRegex.test(src)) return;

		// Only build srcset if files are png, jpg, jpeg, webp or avif
		if (!src.match(/\.(png|jpe?g|webp|avif)$/)) return;

		// If src is the images folder, replace it with optimized-images
		// "images" must be in the beginning of the string (with or without a leading slash)
		src = src.replace(/^\/?images/, '/optimized-images');
		fileName = fileName.replace(/^\/?images/, '/optimized-images');

		let srcset = '';

		if (widths) {
			for (let i = 0; i < widths.length; i++) {
				srcset += `${fileName}-${widths[i]}.${formats[0]} ${widths[i]}w`;

				if (i < widths.length - 1) {
					srcset += ', ';
				}
			}
		} else {
			for (let i = 0; i < formats.length; i++) {
				srcset += `${fileName}.${formats[i]}`;

				if (i < formats.length - 1) {
					srcset += ', ';
				}
			}
		}

		return srcset;
	}
</script>

{#if src}
	{#if figcaption}
		<figure class={additionalClass} class:full-bleed={fullBleed} {...$$restProps}>
			<img srcset={srcSet} {src} {alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" />
			<figcaption>{@html figcaption}</figcaption>
		</figure>
	{:else}
		<img
			srcset={srcSet}
			{src}
			{alt}
			loading={lazy ? 'lazy' : 'eager'}
			decoding="async"
			class={additionalClass}
			class:full-bleed={fullBleed}
			{...$$restProps}
		/>
	{/if}
{/if}

<style lang="scss">
	img,
	figure {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
