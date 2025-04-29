<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text,
		children,
		class: className,
	} : {
		text?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<sparkly-text number-of-sparkles="5" style="--sparkly-text-color: var(--theme--color-sparkles); --sparkly-text-size: 1.25rem">
	<strong class={['a-sparkling-highlight', className]}>
		{#if text}
			{text}
		{:else}
			{@render children?.()}
		{/if}
	</strong>
</sparkly-text>
