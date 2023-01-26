<script>
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';

	export let animated = true;
	export let showBackground = false;
</script>

<header class:has-background={showBackground}>
	<nav class="container">
		<div class="left">
			<a class="logo" href="/" aria-label="Site logo">
				<Logo {animated} />
			</a>
			<div class="links">
				<a href="/blog">Blog</a>
				<a href="/resume">Resume</a>
			</div>
		</div>
		<div class="right">
			<Socials />
		</div>
	</nav>
</header>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	header {
		position: relative;
		padding: 30px 0;

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
			justify-content: space-between;

			@include for-phone-only {
				justify-content: center;
			}
		}

		.left {
			display: flex;
			align-items: center;
			gap: 30px;

			@include for-phone-only {
				flex-direction: column;
				justify-content: center;
				gap: 15px;
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
						filter: drop-shadow(0px 0px 3px rgba(var(--color--primary-rgb), 0.5));
					}
				}
			}
		}
		.logo {
			height: 44px;
		}

		.right {
			@include for-phone-only {
				display: none;
			}
		}
	}
</style>
