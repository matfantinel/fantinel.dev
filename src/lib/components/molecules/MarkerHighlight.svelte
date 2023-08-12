<script lang="ts">
	export let color: 'primary' | 'secondary' = 'primary';
	export let text: string | undefined = undefined;
</script>

<mark class={color}>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</mark>

<style lang="scss">
	@import '$lib/scss/mixins.scss';
	mark {
		@include marker-highlight;

		&.primary {
			--mark-color: var(--color--primary-shade);
		}
		&.secondary {
			--mark-color: var(--color--secondary-shade);
		}
	}
</style>
