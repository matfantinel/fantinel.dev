<script>
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';

	export let animated = true;
	export let showBackground = false;
</script>

<header class:has-background={showBackground}>
	<nav class="container">
		<a class="logo" href="/" aria-label="Site logo">
			<Logo {animated} />
		</a>
		<div class="links">
			<a href="/blog">Blog</a>
			<a href="/resume">Resume</a>
		</div>
		<div class="socials">
			<Socials />
		</div>
	</nav>
</header>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	header {
		position: relative;
		padding: 30px 0;

		@include for-phone-only {
			padding: 20px 0;
		}

		&.has-background {
			background: linear-gradient(
				60deg,
				var(--color--waves-start) 0%,
				var(--color--waves-end) 100%
			);
		}

		.container {
			display: flex;
			align-items: center;
			gap: 30px;

			@include for-phone-only {
				flex-direction: column;
				justify-content: center;
				gap: 20px;

				.links {
					order: 4;
				}
			}
		}

		.logo {
			height: 44px;
			order: 1;
		}

		.links {
			order: 2;
		}

		.socials {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			order: 3;
		}

		a {
			color: var(--color--text);
		}

		.links {
			display: flex;
			align-items: center;
			gap: 30px;

			a {
				text-decoration: none;

				&:hover {
					color: var(--color--primary);
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}
		}
	}
</style>
