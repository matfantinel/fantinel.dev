<script lang="ts">
	import Alert from '@icons/alert.svelte';
	import Check from '@icons/check.svelte';
	import Info from '@icons/info.svelte';

	let { type = 'info', ...props } = $props();
</script>

<div class="callout-block {type}">
	{#if type}
		<div class="icon-wrapper">
			{#if type == 'info'}
				<Info size="50px" />
			{:else if type == 'warning' || type == 'error'}
				<Alert size="50px" />
			{:else if type == 'success'}
				<Check size="50px" />
			{/if}
		</div>
	{/if}
	{@render props.children?.()}
</div>
