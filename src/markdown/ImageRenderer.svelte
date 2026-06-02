<script lang="ts">
	import { handleCmsMediaPath } from '@utils/functions';
	import Image from '@components/atoms/Image';
  import IconLink from '@components/atoms/IconLink';

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
	let isAudio = href.endsWith('.mp3');

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

	function playAudio() {
		const audio = new Audio(href);
		audio.play();
	}
</script>

{#if isAudio}
	<IconLink icon="audio" onclick={playAudio}>{text || 'Listen'}</IconLink>
{:else}
	<Image src={href} alt={text} figcaption={title} class={additionalClass} />
{/if}
