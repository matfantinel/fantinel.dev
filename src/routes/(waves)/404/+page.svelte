<script>
	import Button from '$lib/components/atoms/Button.svelte';
	import Error from '$lib/icons/error.svelte';
</script>

<div class="error-page">
	<div class="container">
		<h1>Oh no! 404!</h1>
		<div class="svg-wrapper">
			<Error />
		</div>
		<p>It seems like coffee was spilled all over this page, and now it can't be displayed.</p>
		<br />
		<Button href="/">Start over</Button>
	</div>
</div>

<style lang="scss">
	.error-page {
		background: var(--color--page-background);
		position: relative;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		text-align: center;

		.svg-wrapper {
			width: 300px;
			margin-top: -60px;
			margin-bottom: -30px;

			:global(svg) {
				filter: drop-shadow(2px 6px 0px rgba(0, 0, 0, 0.1));
			}
		}
	}
</style>
