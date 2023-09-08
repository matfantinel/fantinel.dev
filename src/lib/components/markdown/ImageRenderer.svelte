<script lang="ts">
	import { HttpRegex } from '$lib/utils/regex';
	import Image from '../atoms/Image.svelte';

	export let title: string | undefined;
	export let text: string;
	export let href: string;

	let fullBleed: boolean | undefined = undefined;
	let additionalClass: string | undefined = undefined;

	if (text) {
		if (text.indexOf('||')) {
			const [alt, customClass] = text.split('||').map((x) => x.trim());
			text = alt;
			if (customClass === 'full-bleed') {
				fullBleed = true;
			} else {
				additionalClass = customClass;
			}
		}
	}

	if (!href.startsWith('/images')) {
		href = `/images/${href}`;
	}

	if (text) {
		// Alt text sometimes has some HTML encoded char codes
		// e.g. &#39; for apostrophe
		text = text.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
	}
</script>

<Image src={href} alt={text} figcaption={title} {fullBleed} {additionalClass} />
