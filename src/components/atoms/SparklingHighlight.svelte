<script lang="ts">
	import Sparkles from '@components/atoms/Sparkles.svelte';
  import type { Snippet } from 'svelte';

	let {
		text,
		color,
		sparkleColor,
		children,
		class: className,
	} : {
		text?: string;
		color?: string;
		sparkleColor?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<Sparkles color={sparkleColor}>
	<strong class={['a-sparkling-highlight', className, color]}>
		{#if text}
			{text}
		{:else}
			{@render children?.()}
		{/if}
	</strong>
</Sparkles>
