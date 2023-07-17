<script lang="ts">
	export let color: 'primary' | 'secondary' = 'primary';
</script>

<mark class={color}>
	<slot />
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
