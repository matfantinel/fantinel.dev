<script lang="ts">
	import Alert from '@icons/alert.svelte';
	import Check from '@icons/check.svelte';
	import Info from '@icons/info.svelte';
  import type { Snippet } from 'svelte';

	let { 
    type = 'info',
    class: className,
    children,
  } : {
    type?: 'info' | 'warning' | 'success';
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
	{@render children?.()}
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
			box-shadow: var(--theme--glow-blue);
			border-color: var(--color--blue);
			--icon-color: var(--color--blue);
		}

		&--warning {
			box-shadow: var(--theme--glow-yellow);
			border-color: var(--color--yellow);
			--icon-color: var(--color--yellow);
		}

		&--success {
			box-shadow: var(--theme--glow-green);
			border-color: var(--color--green);
			--icon-color: var(--color--green);
		}
  }
</style>
