<script lang="ts">
  import ExternalLink from '@assets/icons/external-link.svelte';
	import Button from '@components/atoms/Button';
  import { HttpRegex } from '@utils/regex';

	let {
		text,
		href,
		title
	} : {
		text: string;
		href: string;
		title?: string;
	} = $props();

	const target = href.startsWith('#') ? '_self' : '_blank';

	const isExternalLink = !!href && HttpRegex.test(href);

	// We'll use the title attribute to check if a link should be rendered as a Button
	const isButton = title && title.indexOf('button') > -1;
	let buttonProps = $state({});
	if (isButton) {
		// Let's try fetching button props following the pattern "button || prop=value"

		const parts = title.split('||');
		const propsPart = parts[1]?.trim() || '';

		const propsArray = propsPart.split(/\s+/).map((prop) => {
			const [name, value] = prop.split('=');
			return { [name]: value };
		});

		buttonProps = Object.assign({}, ...propsArray);
	}
</script>

{#if isButton}
	<Button {href} {...buttonProps} class="md-button">{text}</Button>
{:else}
	<a {href} {target} class="md-link" rel="noopener noreferrer">
		{text}{#if isExternalLink} <ExternalLink size="14px" />{/if}
	</a>
{/if}

<style lang="scss">
	:global(.md-button) {
		width: fit-content;
		margin: 5px auto;
	}

	:global(.md-link) {
		:global(svg) {
			display: inline;
			margin-left: 5px;
		}
	}
</style>