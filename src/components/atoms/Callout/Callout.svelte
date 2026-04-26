<script lang="ts">
	import Alert from '@icons/alert.svelte';
	import CheckCircle from '@icons/check-circle.svelte';
	import Info from '@icons/info.svelte';
  import type { Snippet } from 'svelte';

	let { 
    type = 'info',
		text,
    class: className,
    children,
  } : {
    type?: 'info' | 'warning' | 'success';
    text?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<div class={[
	'a-callout',
	`a-callout--${type}`,
	className
]}>
	{#if type}
		<div class="a-callout__icon">
			{#if type == 'info'}
				<Info size="36px" />
			{:else if type == 'warning'}
				<Alert size="36px" />
			{:else if type == 'success'}
				<CheckCircle size="36px" />
			{/if}
		</div>
	{/if}
	{#if text}
		{text}
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
  .a-callout {
    position: relative;
    background-color: var(--t-v6--surface--accent);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);

		--callout-color: var(--t-v6--accent);
    --callout-glow: var(--t-v6--accent--glow-small);

		box-shadow: var(--callout-glow);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.12' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
		border: 2px solid var(--callout-color);

		&__icon {
			position: absolute;
			top: 0;
			left: 0;
			translate: -50% -50%;
			color: var(--callout-color);
			--icon-background-color: var(--t-v6--surface--base);
		}

		&--info {
			--callout-color: var(--t-v6--info);
			--callout-glow: var(--t-v6--info--glow-small);
		}

		&--warning {
			--callout-color: var(--t-v6--warning);
			--callout-glow: var(--t-v6--warning--glow-small);
		}

		&--success {
			--callout-color: var(--t-v6--success);
			--callout-glow: var(--t-v6--success--glow-small);
		}
  }
</style>
