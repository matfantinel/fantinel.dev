<script lang="ts">
	import Sparkles from '@components/atoms/Sparkles.svelte';
  import type { Snippet } from 'svelte';

	let {
		text,
		color,
		children,
		class: className,
	} : {
		text?: string;
		color?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<Sparkles>
	<strong class={['a-sparkling-highlight', className, color]}>
		{#if text}
			{text}
		{:else}
			{@render children?.()}
		{/if}
	</strong>
</Sparkles>
