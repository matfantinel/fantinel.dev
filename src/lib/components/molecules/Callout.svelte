<script lang="ts">
	import Alert from '$lib/icons/alert.svelte';
	import Check from '$lib/icons/check.svelte';
	import Info from '$lib/icons/info.svelte';

	export let type: string | undefined = undefined;
</script>

<div class="callout-block {type ?? ''}">
	{#if type}
		<div class="icon-wrapper">
			{#if type == 'info'}
				<Info />
			{:else if type == 'warning' || type == 'error'}
				<Alert />
			{:else if type == 'success'}
				<Check />
			{/if}
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	.callout-block {
		--bg-color: var(--color--page-background);
		--accent-color: transparent;
		--text-color: var(--color--text);

		margin: 40px 0 30px;
		padding: 25px 25px;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		background: var(--bg-color);
		color: var(--text-color);
		border-left: 4px solid var(--accent-color);

		position: relative;

		.icon-wrapper {
			position: absolute;
			width: 50px;
			height: 50px;
			top: 0;
			left: 0;
			transform: translate(calc(-50% - 1.5px), -50%);
			background: var(--color--post-page-background);
			padding: 8px;
			border-radius: 50%;
			fill: var(--accent-color);
			color: var(--accent-color);
		}

		&.info {
			--bg-color: var(--color--callout-background--info);
			--accent-color: var(--color--callout-accent--info);
		}
		&.warning {
			--bg-color: var(--color--callout-background--warning);
			--accent-color: var(--color--callout-accent--warning);
		}
		&.error {
			--bg-color: var(--color--callout-background--error);
			--accent-color: var(--color--callout-accent--error);
		}
		&.success {
			--bg-color: var(--color--callout-background--success);
			--accent-color: var(--color--callout-accent--success);
		}
	}
</style>
