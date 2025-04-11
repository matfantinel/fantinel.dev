<script lang="ts">
	import {
		MarkerHighlightTokenizerExtension,
		SparklesHighlightTokenizerExtension
	} from '@utils/markdown';
	import { marked } from 'marked';
	import SvelteMarkdown from 'svelte-markdown';
	import HeadingRenderer from '@components/markdown/HeadingRenderer.svelte';
	import ImageRenderer from '@components/markdown/ImageRenderer.svelte';
	import LinkRenderer from '@components/markdown/LinkRenderer.svelte';
	import QuoteCalloutRenderer from '@components/markdown/QuoteCalloutRenderer.svelte';
  import CodeBlockRenderer from '@components/markdown/CodeBlockRenderer.svelte';
	import MarkerHighlight from '@components/atoms/MarkerHighlight.svelte';
	import SparklingHighlight from '@components/atoms/SparklingHighlight.svelte';

	let { 
		content, 
		isInline = false
	} : {
		content: string;
		isInline: boolean;
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