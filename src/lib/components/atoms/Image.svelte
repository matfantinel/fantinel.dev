<script lang="ts">
	import { dev } from '$app/environment';

	export let additionalClass: string | undefined = undefined;

	export let src: string;
	export let alt: string;
	export let figcaption: string | undefined = undefined;
	export let fullBleed: boolean | undefined = undefined;

	export let formats: string[] = ['avif', 'webp', 'png'];
	export let widths: string[] | undefined = undefined;

	$: fileName = src ? src.split('.')[0] : '';

	function buildSrcset() {
		if (dev || src.startsWith('http')) return;

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
		<figure class={additionalClass} class:full-bleed={fullBleed}>
			<img srcset={buildSrcset()} {src} {alt} loading="lazy" decoding="async" />
			<figcaption>{figcaption}</figcaption>
		</figure>
	{:else}
		<img
			srcset={buildSrcset()}
			{src}
			{alt}
			loading="lazy"
			decoding="async"
			class={additionalClass}
			class:full-bleed={fullBleed}
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
