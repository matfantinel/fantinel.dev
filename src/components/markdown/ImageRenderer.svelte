<script lang="ts">
	import { handleCmsMediaPath } from '@utils/functions';
	import Image from '@components/atoms/Image.svelte';

	let {
		title,
		text,
		href
	} : {
		title?: string;
		text: string;
		href: string;
	} = $props();

	let additionalClass: string | undefined = $state(undefined);

	if (text) {
		if (text.indexOf('||')) {
			const [alt, customClass] = text.split('||').map((x) => x.trim());
			text = alt;
			additionalClass = customClass;
		}
	}

	href = handleCmsMediaPath(href);

	if (text) {
		// Alt text sometimes has some HTML encoded char codes
		// e.g. &#39; for apostrophe
		text = text.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));
	}
</script>

<Image src={href} alt={text} figcaption={title} class={additionalClass} />
