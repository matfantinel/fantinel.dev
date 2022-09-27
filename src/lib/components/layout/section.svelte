<script>
	export let title = null;
	export let description = null;
	export let buttonText = null;
	export let buttonUrl = null;
	export let buttonColor = 'primary';

	export let align = 'left';
</script>

<div class="section-container {align}">
	<div class="title-area">
		{#if title || description}
			<div class="text">
				{#if title}
					<h2>
						{title}
					</h2>
				{/if}
				{#if description}
					<p>
						{description}
					</p>
				{/if}
			</div>
		{/if}
		{#if buttonText && buttonUrl}
			<a class="button {buttonColor}" href={buttonUrl}>
				{buttonText}
			</a>
		{/if}
	</div>
	<div class="content-area">
		<slot />
	</div>
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.section-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		padding: 50px 0;

		.title-area {
			flex: 2;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			gap: 15px;

			.text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;
			}

			.button {
				min-width: 180px;
				max-width: 100%;
				width: auto;
			}
		}
		.content-area {
			flex: 5;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		@include for-tablet-portrait-up {
			&.left {
				.title-area {
					order: 1;
				}
				.content-area {
					order: 2;
				}
			}
			&.right {
				.title-area {
					order: 2;
				}
				.content-area {
					order: 1;
				}
			}
			&.top {
				flex-direction: column;
				.title-area {
					order: 1;
					max-width: 600px;
				}
				.content-area {
					order: 2;
					width: 100%;
				}
			}
		}
		@include for-phone-only {
			flex-direction: column;
		}
	}
</style>
