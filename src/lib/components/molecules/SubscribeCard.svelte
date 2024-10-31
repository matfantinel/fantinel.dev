<script lang="ts">
	import Card from '$lib/components/atoms/Card.svelte';

	export let title: string | undefined = undefined;
</script>

<Card additionalClass="subscribe-card">
	<div class="content" slot="content">
		<div class="header">
			{#if title}
				<h2 class="title">{title}</h2>
			{/if}
			{#if $$slots['icon']}
				<div class="icon">
					<slot name="icon" />
				</div>
			{/if}
		</div>
		<div class="inner-content">
			<slot />
		</div>
	</div>
	<div class="footer" slot="footer">
		{#if $$slots['button']}
			<slot name="button" />
		{/if}
	</div>
</Card>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.content {
		display: flex;
		flex-direction: column;
		gap: 0px;
		align-items: flex-start;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.icon {
		width: 24px;
		height: 24px;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 1.2rem;
		font-family: var(--font--title);
		font-weight: 700;
		text-wrap: balance;
	}

	.inner-content {
		margin-top: 15px;
		margin-top: 15px;
		max-width: 60ch;
		margin-inline: auto;
	}

	.footer {
		margin-top: 20px;
	}
</style>
