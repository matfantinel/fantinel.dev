<script lang="ts">
	import {
		MarkerHighlightTokenizerExtension,
		SparklesHighlightTokenizerExtension
	} from '$lib/utils/markdown';
	import { marked } from 'marked';
	import SvelteMarkdown from 'svelte-markdown';
	import ComponentRenderer from '../markdown/ComponentRenderer.svelte';
	import HeadingRenderer from '../markdown/HeadingRenderer.svelte';
	import ImageRenderer from '../markdown/ImageRenderer.svelte';
	import LinkRenderer from '../markdown/LinkRenderer.svelte';
	import QuoteCalloutRenderer from '../markdown/QuoteCalloutRenderer.svelte';
	import MarkerHighlight from './MarkerHighlight.svelte';
	import SparklingHighlight from './SparklingHighlight.svelte';

	export let content: string;

	marked.use({
		extensions: [SparklesHighlightTokenizerExtension, MarkerHighlightTokenizerExtension]
	});
	const options = marked.defaults;

	const renderers = {
		code: ComponentRenderer,
		sparklesHighlight: SparklingHighlight,
		markerHighlight: MarkerHighlight,
		image: ImageRenderer,
		blockquote: QuoteCalloutRenderer,
		link: LinkRenderer,
		heading: HeadingRenderer
	} as any;
</script>

<SvelteMarkdown source={content} {renderers} {options} />
