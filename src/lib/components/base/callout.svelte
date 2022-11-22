<script>
	import Alert from '$lib/svg/alert.svelte';
	import Check from '$lib/svg/check.svelte';
	import Info from '$lib/svg/info.svelte';

	export let type = null;
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
		--bg-color: var(--callout-background-color);
		--accent-color: transparent;

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
			background: var(--post-page-background-color);
			padding: 8px;
			border-radius: 50%;
			fill: var(--accent-color);
			color: var(--accent-color);
		}

		&.info {
			--bg-color: var(--callout-info-background-color);
			--accent-color: var(--callout-info-accent-color);
		}
		&.warning {
			--bg-color: var(--callout-warning-background-color);
			--accent-color: var(--callout-warning-accent-color);
		}
		&.error {
			--bg-color: var(--callout-error-background-color);
			--accent-color: var(--callout-error-accent-color);
		}
		&.success {
			--bg-color: var(--callout-success-background-color);
			--accent-color: var(--callout-success-accent-color);
		}
	}
</style>
