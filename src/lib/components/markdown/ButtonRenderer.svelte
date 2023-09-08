<script lang="ts">
	import Button from '../atoms/Button.svelte';

	export let text: string;

	const parts = text.split('||');
	const buttonText = parts[0].trim();
	const propsPart = parts[1]?.trim() || '';

	const propsArray = propsPart.split(/\s+/).map((prop) => {
		const [name, value] = prop.split('=');
		return { [name]: value };
	});

	const buttonProps = Object.assign({}, ...propsArray);
</script>

<Button additionalClass="md-button" {...buttonProps}>{buttonText}</Button>

<style lang="scss">
	:global(.md-button) {
		width: fit-content;
		margin: 5px auto;
	}
</style>
