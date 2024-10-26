<script lang="ts">
	import Socials from './Socials.svelte';

	export let links: { href: string; text: string }[];

	// ✨ Progressive enhancement ✨
	// When closing, add closing class to the menu
	// so it can animate out
	// If no JS is present, everything still works, just not as smoothly
	let menuIsClosing = false;
	function handleToggle(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.checked) {
			menuIsClosing = true;

			setTimeout(() => {
				menuIsClosing = false;
			}, 500);
		}
	}

	function handleMenuItemClick() {
		// Close the menu
		const control = document.getElementById('control') as HTMLInputElement;
		control.checked = false;
	}
</script>

<nav class="hamburger-menu">
	<div class="wrapper">
		<input
			type="checkbox"
			aria-label="Toggle the menu"
			aria-controls="menu"
			id="control"
			on:change={handleToggle}
		/>

		<span class="line one" />
		<span class="line two" />
		<span class="line three" />

		<ul id="menu" class:closing={menuIsClosing}>
			<li class="socials"><Socials /></li>
			{#each links as link}
				<li class="menu-item">
					<a href={link.href} on:click={handleMenuItemClick}>{link.text}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';
	.wrapper {
		display: grid;
		place-items: center;
		width: 40px;
		height: 32px;
		z-index: 1;

		// Disallow text selection so it doesn't look weird
		-webkit-user-select: none;
		user-select: none;
	}

	#control {
		display: block;
		width: 40px;
		height: 32px;
		position: absolute;
		cursor: pointer;
		// opacity: 0; // Hide the checkbox
		-webkit-appearance: none;
		appearance: none;
		z-index: 99; // and place it over the hamburger

		// https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout
		-webkit-touch-callout: none;

		&:hover {
			~ .line {
				color: var(--color--primary);
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}

	.line {
		z-index: 98;
		display: block;
		width: 33px;
		height: 4px;
		margin-bottom: 5px;
		position: relative;
		background: var(--color--text);
		border-radius: 3px;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
			background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), all 0.5s ease;

		&.three {
			margin-bottom: 0;
		}
	}

	#menu {
		z-index: 97;
		position: fixed;
		top: 0;
		right: 0;
		margin: 0;
		padding: 70px 20px;
		width: 100dvw;
		height: 100dvh;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;

		background: rgba(var(--color--page-background-rgb), 1);
		// TODO: why is blur no longer working in Chromium?
		// Possibly related: https://stackoverflow.com/a/76207141
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		list-style-type: none;
		-webkit-font-smoothing: antialiased;

		transform-origin: top right;
		transform: translate(100%, 0);
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
		opacity: 0;

		&.closing {
			transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
				opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1) 0.5s;
		}
	}

	.menu-item {
		font-size: 1.5rem;
		width: fit-content;

		a {
			text-decoration: none;
		}

		&:hover {
			color: var(--color--primary);
			filter: drop-shadow(0px 0px 3px var(--color--primary));
		}

		@include for-tablet-portrait-up {
			font-size: 1rem;
			text-decoration: none;
		}
	}

	#control:checked {
		~ .line {
			&.one {
				transform: rotate(45deg) translate(6px, -3px);
				transform-origin: top left;
			}

			&.two {
				opacity: 0;
				transform: rotate(0deg) scale(0.2, 0.2);
			}

			&.three {
				transform: rotate(-45deg) translate(4px, 3px);
				transform-origin: bottom left;
			}
		}

		~ #menu {
			transform: none;
			opacity: 1;
		}
	}

	@include for-phone-only {
		.socials {
			margin-inline: auto;
			display: flex;
			align-items: center;
			gap: 20px;
			margin-top: 20px;
			order: 2;

			:global(a) {
				width: 32px !important;
				display: inline-block;
			}
		}
	}

	@include for-tablet-portrait-up {
		// .mobile-only {
		// 	display: none;
		// }

		// Just show the menu as regular links
		#control {
			display: none;
		}
		.line {
			display: none;
		}
		.wrapper {
			place-items: unset;
			width: unset;
			height: unset;
		}
		#menu {
			flex-direction: row;
			gap: 30px;

			z-index: unset;
			position: relative;
			padding: 0;
			width: fit-content;
			height: unset;
			background: unset;
			-webkit-backdrop-filter: unset;
			backdrop-filter: unset;
			transform: unset;
			opacity: 1;
		}
	}
</style>
