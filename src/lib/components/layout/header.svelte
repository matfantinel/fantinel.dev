<script>
	import Logo from '$lib/svg/logo.svelte';
	import Socials from '$lib/components/base/socials.svelte';

	export let animated = true;
</script>

<header>
	<nav class="container">
		<div class="left">
			<a class="logo" href="/" alt="Site logo">
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
	@import '../../scss/breakpoints.scss';

	header {
		position: relative;
		padding: 30px 0;

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
				color: var(--text-color);
			}

			.links {
				display: flex;
				align-items: center;
				gap: 30px;
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
