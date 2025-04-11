<script lang="ts">
  import type { Snippet } from "svelte";

	let {
		text,
		children
	} : {
		text?: string;
		children?: Snippet;
	} = $props();
</script>

<mark class="m-marker-highlight">
	{#if text}
		{text}
	{:else}
		{@render children?.()}
	{/if}
</mark>
