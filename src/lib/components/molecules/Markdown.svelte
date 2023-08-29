<script lang="ts">
	import { marked } from 'marked';
	import SvelteMarkdown from 'svelte-markdown';
	import ComponentRenderer from '../markdown/ComponentRenderer.svelte';
	import ImageRenderer from '../markdown/ImageRenderer.svelte';
	import MarkerHighlight from './MarkerHighlight.svelte';
	import SparklingHighlight from './SparklingHighlight.svelte';
	import ButtonRenderer from '../markdown/ButtonRenderer.svelte';
	import QuoteCalloutRenderer from '../markdown/QuoteCalloutRenderer.svelte';

	export let content: string;

	const sparklesHighlightTokenizerExtension: marked.TokenizerAndRendererExtension = {
		name: 'sparklesHighlight',
		// 'inline' looks for matches within a paragraph or other blocks
		level: 'inline',
		start(src: string) {
			// Marks the start of a match
			return src.indexOf('@@@');
		},
		tokenizer(src: string) {
			// Will match anything between @@@ and @@@. e.g. @@@sparkle@@@
			const rule = /^\@\@\@(.*?)\@\@\@/;
			const match = rule.exec(src);
			if (match) {
				return {
					type: 'sparklesHighlight',
					raw: match[0],
					text: match[1],
					color: 'secondary'
				};
			}
		}
	};

	const markerHighlightTokenizerExtension: marked.TokenizerAndRendererExtension = {
		name: 'markerHighlight',
		level: 'inline',
		start(src: string) {
			return src.indexOf('///');
		},
		tokenizer(src: string) {
			// Will match anything between /// and ///. e.g. ///highlight///
			const rule = /^\/\/\/(.*?)\/\/\//;
			const match = rule.exec(src);
			if (match) {
				return {
					type: 'markerHighlight',
					raw: match[0],
					text: match[1]
				};
			}
		}
	};

	const buttonTokenizerExtension: marked.TokenizerAndRendererExtension = {
		name: 'button',
		level: 'block',
		start(src: string) {
			return src.indexOf('[[[');
		},
		tokenizer(src: string) {
			// Will match anything between [[[ and ]]]. e.g. [[[button text]]]
			const rule = /^\[\[\[(.*?)\]\]\]/;
			const match = rule.exec(src);
			if (match) {
				return {
					type: 'button',
					raw: match[0],
					text: match[1]
				};
			}
		}
	};

	marked.use({
		extensions: [
			sparklesHighlightTokenizerExtension,
			markerHighlightTokenizerExtension,
			buttonTokenizerExtension
		]
	});
	const options = marked.defaults;

	const renderers = {
		code: ComponentRenderer,
		sparklesHighlight: SparklingHighlight,
		markerHighlight: MarkerHighlight,
		image: ImageRenderer,
		button: ButtonRenderer,
		blockquote: QuoteCalloutRenderer
	} as any;
</script>

<SvelteMarkdown source={content} {renderers} {options} />
