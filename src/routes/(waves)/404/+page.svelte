<script>
	import Error from '$lib/svg/error.svelte';
</script>

<div class="error-page">
	<div class="container">
		<h1>Oh no!</h1>
		<div class="svg-wrapper">
			<Error />
		</div>
		<p>It seems like coffee was spilled all over this page, and now it can't be displayed.</p>
		<a class="button secondary" href="/">Start over</a>
	</div>
</div>

<style lang="scss">
	.error-page {
		background: var(--page-background-color);
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

		.button {
			margin-top: 30px;
			width: fit-content;
		}
	}
</style>
