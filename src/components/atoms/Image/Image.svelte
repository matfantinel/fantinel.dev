<script lang="ts">
	import { HttpRegex } from '@utils/regex';
	const isDev = import.meta.env.DEV;

	let {
		src,
		alt,
		figcaption,
		lazy = true,
		skipSrcset = false,
		formats = ['avif', 'webp', 'png'],
		widths,
		class: className,
		...props
	} : {
		src: string;
		alt: string;
		figcaption?: string;
		lazy?: boolean;
		skipSrcset?: boolean;
		formats?: string[];
		widths?: string[];
		class?: string;
		[key: string]: any;
	} = $props();

	let fileName = src ? src.split('.')[0] : '';
	let srcSet = buildSrcset();

	function buildSrcset() {
		if (isDev || skipSrcset || HttpRegex.test(src)) return;

		// Only build srcset if files are png, jpg, jpeg, webp or avif
		if (!src.match(/\.(png|jpe?g|webp|avif)$/)) return;

		// If src is the cms/media folder, replace it with cms/optimized-media
		// "cms/media" must be in the beginning of the string (with or without a leading slash)
		src = src.replace(/^\/?cms\/media/, '/cms/optimized-media');
		fileName = fileName.replace(/^\/?cms\/media/, '/cms/optimized-media');

		// Replace .jpg or .jpeg extensions with .png for optimized media
		src = src.replace(/\.jpe?g$/i, '.png');
		fileName = fileName.replace(/\.jpe?g$/i, '.png');

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
		<figure class={['a-image', className]} {...props}>
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
			class={['a-image', className]}
			{...props}
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
