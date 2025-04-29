<script lang="ts">
	import Alert from '@icons/alert.svelte';
	import Check from '@icons/check.svelte';
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
				<Check size="36px" />
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
    background-color: var(--theme--background-accent-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
		border: 2px solid var(--theme--background-base-color);

		--icon-color: var(--theme--color-accent);		

		&__icon {
			position: absolute;
			top: 0;
			left: 0;
			translate: -50% -50%;
			color: var(--icon-color);
			--icon-background-color: var(--theme--background-base-color);
		}

		&--info {
			box-shadow: var(--theme--glow-callouts-info);
			border-color: var(--theme--color-callouts-info);
			--icon-color: var(--theme--color-callouts-info);
		}

		&--warning {
			box-shadow: var(--theme--glow-callouts-warning);
			border-color: var(--theme--color-callouts-warning);
			--icon-color: var(--theme--color-callouts-warning);
		}

		&--success {
			box-shadow: var(--theme--glow-callouts-success);
			border-color: var(--theme--color-callouts-success);
			--icon-color: var(--theme--color-callouts-success);
		}
  }
</style>
