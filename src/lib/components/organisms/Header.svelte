<script>
	import Logo from '$lib/components/atoms/Logo.svelte';
	import HamburgerMenu from '$lib/components/molecules/HamburgerMenu.svelte';
	import ThemeToggle from '$lib/components/molecules/ThemeToggle.svelte';

	export let animated = false;
	export let showBackground = false;
	export let showFullLogo = false;
</script>

<header class:has-background={showBackground} style="view-transition-name: header">
	<nav class="container">
		<a class="logo" href="/" aria-label="Site logo">
			<Logo {animated} {showFullLogo} />
		</a>
		<div class="links">
			<div class="menu-wrapper">
				<HamburgerMenu
					links={[
						{ href: '/blog', text: 'Blog' },
						{ href: '/subscribe', text: 'Subscribe' }
						// { href: '/resume', text: 'Resume' }
					]}
				/>
			</div>
			<ThemeToggle />
		</div>
	</nav>
</header>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	header {
		position: relative;
		z-index: 9;
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
			justify-content: space-between;
			gap: 30px;

			@include for-phone-only {
				gap: 20px;
			}
		}

		.logo {
			height: 44px;

			@include for-phone-only {
				height: unset;
				width: 60px;
			}
		}

		a {
			color: var(--color--text);
		}

		.links {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 30px;

			a {
				text-decoration: none;

				&:hover {
					color: var(--color--primary);
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}

			// @include for-tablet-portrait-down {
			// 	.desktop-only {
			// 		display: none;
			// 	}
			// }

			@include for-phone-only {
				.menu-wrapper {
					order: 2;
				}
			}
		}
	}
</style>
