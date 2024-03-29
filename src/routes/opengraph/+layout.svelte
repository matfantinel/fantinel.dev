<script lang="ts">
	import Avatar from '$lib/components/atoms/Avatar.svelte';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Waves from '$lib/components/organisms/Waves.svelte';
	import InternetIcon from '$lib/icons/internet.svelte';

	export let data: { title: string; date?: string };
	$: ({ title, date } = data);
</script>

<main>
	<div class="heading">
		<Waves />
		<h1>{title}</h1>
	</div>

	<div class="bottom">
		<ul class="info-list">
			<li class="logo">
				<Logo showFullLogo colored />
			</li>
			<li>
				<span class="icon"><InternetIcon /></span>
				fantinel.dev
			</li>
			{#if date}
				<li>{date}</li>
			{/if}
		</ul>

		<div class="avatar">
			<Avatar />
		</div>
	</div>
	<slot />
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
	}

	.heading {
		padding: 40px;
		position: relative;
		width: 100%;
		z-index: 1;

		:global(.waves-container) {
			height: max(calc(100% + 40px), 65vh);
			top: 0;
			left: 0;
		}

		h1 {
			font-size: 5rem;
			z-index: 1;
			text-wrap: balance;
			position: relative;
		}
	}

	.avatar {
		width: 300px;
	}

	.bottom {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	.info-list {
		list-style: none;
		margin: 20px 40px 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		flex: 1;

		li {
			display: flex;
			align-items: center;
			font-size: 1.6rem;
			font-weight: 600;

			.icon {
				margin-right: 12px;
				color: var(--color--primary);
				:global(svg) {
					width: 36px;
					height: 36px;
				}
			}
		}

		.logo {
			height: 50px;
		}
	}
</style>
