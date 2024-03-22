<script lang="ts">
	import Button from '../atoms/Button.svelte';

	export let text: string;
	export let href: string;
	export let title: string;

	const target = href.startsWith('#') ? '_self' : '_blank';

	// We'll use the title attribute to check if a link should be rendered as a Button
	const isButton = title?.indexOf('button') > -1;
	let buttonProps = {};
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
	<Button {href} {...buttonProps} additionalClass="md-button">{text}</Button>
{:else}
	<a {href} {target} rel="noopener noreferrer">{text}</a>
{/if}

<style lang="scss">
	:global(.md-button) {
		width: fit-content;
		margin: 5px auto;
	}
</style>
