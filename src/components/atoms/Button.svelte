<script lang="ts">
	import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';

	let { 
    href,
    target,
    rel,
    class: className,
    icon,
    children,
    ...props
  } : {
    href?: string;
    target?: string;
    rel?: string;
    class?: string;
    icon?: Snippet;
    children?: Snippet;
  } = $props();

  const tag = href ? 'a' : 'button';
  const isExternalLink = !!href && HttpRegex.test(href);
  const linkProps = {
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener noreferrer' : undefined)
  };

</script>

<svelte:element
	this={tag}
	{...linkProps}
	class={['a-button', className]}
	data-sveltekit-preload-data
	role="link"
	tabindex="0"
	{...props}
>
	{#if icon}
		<div class="icon">
			{@render icon()}
		</div>
	{/if}
	{@render children?.()}
</svelte:element>

<style lang="scss">
  .a-button {
    display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
    
    background: peachpuff;
    padding: 5px;
  }
</style>