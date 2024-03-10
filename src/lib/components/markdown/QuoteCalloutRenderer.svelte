<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Callout from '../molecules/Callout.svelte';

	export let text: string;

	// Callouts start with a pattern like [!info] or [!success]
	// So, we need to check if the text starts with that pattern
	// And get the type

	// But first, we need to remove the "\" character from the beginning of the string
	// That Tina CMS adds before the callout pattern
	text = text.replace(/^\\/g, '');

	const isCallout = /^\[!([a-z]+)\]/i.test(text);
	const calloutType = isCallout ? text.match(/^\[!([a-z]+)\]/i)?.[1] : undefined;

	let cleanText = text;
	$: {
		if (isCallout) {
			cleanText = cleanText.replace(/^\[!\w+\]\s?/, '');
		}

		// Remove the line breaks (\n) from beginning and end of the string
		cleanText = cleanText.replace(/^\n|\n$/g, '');

		// Now, replace the remaining line breaks with <br> tags
		cleanText = cleanText.replace(/\n/g, '<br>');

		// #region Handle Tina CMS editor quirks

		// Remove every "\" character immediately before or after a <br> tag
		cleanText = cleanText.replace(/\\<br>/g, '<br>');
		cleanText = cleanText.replace(/<br>\\/g, '<br>');

		// #endregion
	}
</script>

{#if isCallout}
	<Callout type={calloutType}>
		<SvelteMarkdown source={cleanText} />
	</Callout>
{:else}
	<blockquote>
		<SvelteMarkdown source={cleanText} />
	</blockquote>
{/if}
