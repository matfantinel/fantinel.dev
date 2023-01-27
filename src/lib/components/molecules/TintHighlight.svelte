<script lang="ts">
	export let color: 'primary' | 'secondary' | string = 'primary';
</script>

<mark style="--mark-color: var(--color--{color}-tint);">
	<slot />
</mark>

<style lang="scss">
	mark {
		--mark-color: transparent;

		margin-inline: calc(0.1em * -1);
		padding-inline: 0.1em;

		background-color: transparent;
		background-image: linear-gradient(to bottom, transparent 60%, var(--mark-color) 60%);

		color: inherit;
	}
</style>
