<script lang="ts">
	import {
		MarkerHighlightTokenizerExtension,
		SparklesHighlightTokenizerExtension
	} from '@utils/markdown';
	import { marked } from 'marked';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import HeadingRenderer from '@markdown/HeadingRenderer.svelte';
	import ImageRenderer from '@markdown/ImageRenderer.svelte';
	import LinkRenderer from '@markdown/LinkRenderer.svelte';
	import QuoteCalloutRenderer from '@markdown/QuoteCalloutRenderer.svelte';
  import CodeBlockRenderer from '@markdown/CodeBlockRenderer.svelte';
	import MarkerHighlight from '@components/atoms/MarkerHighlight';
	import SparklingHighlight from '@components/atoms/SparklingHighlight';

	let { 
		content, 
		isInline = false
	} : {
		content: string;
		isInline?: boolean;
	} = $props();

	marked.use({
		extensions: [SparklesHighlightTokenizerExtension, MarkerHighlightTokenizerExtension]
	});
	const options = marked.defaults;

	const renderers = {
		code: CodeBlockRenderer,
		sparklesHighlight: SparklingHighlight,
		markerHighlight: MarkerHighlight,
		image: ImageRenderer,
		blockquote: QuoteCalloutRenderer,
		link: LinkRenderer,
		heading: HeadingRenderer
	} as any;
</script>

<SvelteMarkdown source={content} {renderers} {options} {isInline} />