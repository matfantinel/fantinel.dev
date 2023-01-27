<script lang="ts">
	export let color: 'primary' | 'secondary' = 'primary';
</script>

<mark class={color}>
	<slot />
</mark>

<style lang="scss">
	mark {
		--mark-color: transparent;

		margin-inline: calc(0.3em * -1);
		padding-inline: 0.3em;

		background-color: transparent;
		background-image: linear-gradient(to bottom right, transparent 50%, var(--mark-color) 50%),
			linear-gradient(var(--mark-color), var(--mark-color)),
			linear-gradient(to top left, transparent 50%, var(--mark-color) 50%);
		background-size: 0.25em 1em, calc(100% - 0.25em * 2 + 1px) 1em, 0.25em 1em;
		background-position: left center, center, right center;
		background-repeat: no-repeat;
		color: inherit;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;

		&.primary {
			--mark-color: var(--color--primary-shade);
		}
		&.secondary {
			--mark-color: var(--color--secondary-shade);
		}
	}
</style>
