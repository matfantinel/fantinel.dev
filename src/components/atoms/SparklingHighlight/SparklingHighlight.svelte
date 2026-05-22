<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BaseProps } from '@utils/types';

	export type SparklingHighlightProps = BaseProps & {
		text?: string;
	};

	let {
		text,
		children,
		class: className,
	} : SparklingHighlightProps & { children?: Snippet } = $props();
</script>

<sparkly-text number-of-sparkles="5" style="--sparkly-text-color: var(--t-v6--sparkles); --sparkly-text-size: 1.25rem">
	<strong class={['a-sparkling-highlight', className]}>
		{#if text}
			{text}
		{:else}
			{@render children?.()}
		{/if}
	</strong>
</sparkly-text>
