<script lang="ts">
	import CodeBlock from '../molecules/CodeBlock.svelte';

	/** 
		This component allows rendering (almost) any Svelte component from Markdown.
	*/

	const imports: any = {
		// Add any possible component here
		Button: () => import('$lib/components/atoms/Button.svelte')
	};

	export let lang: string;
	export let text: string;

	let componentName: string;
	let componentConfig: any;
	let componentChildren: any;
	let componentProps: any;

	let codeFilename: string;
	if (lang === 'sveltecomponent') {
		componentConfig = JSON.parse(text);
		componentName = componentConfig.component;
		componentChildren = componentConfig.props?.children;
		componentProps = componentConfig.props;
		delete componentProps.children;
	} else {
		// Get filename from code block
		// Pattern: ~~~ filename
		// Then remove it from the code block
		const match = text.match(/^~~~\s*(.*)/);
		if (match && match[1]) {
			codeFilename = match[1];
			// The regex below also removes the newline character
			text = text.replace(/^~~~.*(?:\n|$)/, '');
		}
	}
</script>

{#if lang === 'sveltecomponent' && componentName}
	{#await imports[componentName]() then module}
		<svelte:component this={module.default} {...componentProps}>
			{#if componentChildren}
				{@html componentChildren}
			{/if}
		</svelte:component>
	{/await}
{:else}
	<CodeBlock {lang} filename={codeFilename} code={text} />
{/if}
