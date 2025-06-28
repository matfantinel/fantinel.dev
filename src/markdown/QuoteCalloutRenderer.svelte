<script lang="ts">
	import Blockquote from '@components/atoms/Blockquote';
	import Callout from '@components/atoms/Callout';
	import MarkdownRenderer from '@components/molecules/MarkdownRenderer';

	let { text } : {
		text: string;
	} = $props();

	// Callouts start with a pattern like [!info] or [!success]
	// So, we need to check if the text starts with that pattern
	// And get the type

	const isCallout = /^\[!([a-z]+)\]/i.test(text);
	const calloutType = isCallout ? text.match(/^\[!([a-z]+)\]/i)?.[1] : undefined;
	
	if (isCallout) {
		text = text.replace(/^\[!\w+\]\s?/, '');
	}

	// Replace single line breaks with double line breaks
	text = text.replace(/\n/g, '\n\n');
</script>

{#if isCallout}
	<Callout type={calloutType as 'info' | 'warning' | 'success'}>
		<MarkdownRenderer content={text} />
	</Callout>
{:else}
	<Blockquote>
		<MarkdownRenderer content={text} />
	</Blockquote>
{/if}
