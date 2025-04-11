<script lang="ts">
	import Callout from '@components/molecules/Callout.svelte';
	import MarkdownRenderer from '@components/molecules/MarkdownRenderer.svelte';

	let { text } : {
		text: string;
	} = $props();

	// Callouts start with a pattern like [!info] or [!success]
	// So, we need to check if the text starts with that pattern
	// And get the type

	// But first, we need to remove the "\" character from the beginning of the string
	// That Tina CMS adds before the callout pattern
	text = text.replace(/^\\/g, '');

	const isCallout = /^\[!([a-z]+)\]/i.test(text);
	const calloutType = isCallout ? text.match(/^\[!([a-z]+)\]/i)?.[1] : undefined;
	
	if (isCallout) {
		text = text.replace(/^\[!\w+\]\s?/, '');
	}

	// Remove the line breaks (\n) from beginning and end of the string
	text = text.replace(/^\n|\n$/g, '');

	// Now, replace the remaining line breaks with <br> tags
	text = text.replace(/\n/g, '<br>');

	// #region Handle Tina CMS editor quirks

	// Remove every "\" character immediately before or after a <br> tag
	text = text.replace(/\\<br>/g, '<br>');
	text = text.replace(/<br>\\/g, '<br>');

	// #endregion
</script>

{#if isCallout}
	<Callout type={calloutType}>
		<MarkdownRenderer content={text} isInline />
	</Callout>
{:else}
	<blockquote>
		<MarkdownRenderer content={text} isInline />
	</blockquote>
{/if}
