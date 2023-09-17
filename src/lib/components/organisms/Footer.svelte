<script>
	import FooterWave from '$lib/icons/footer-wave.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';
	import ThemeToggle from '$lib/components/molecules/ThemeToggle.svelte';
	import RssLink from '$lib/components/atoms/RssLink.svelte';

	let currentYear = new Date().getFullYear();
</script>

<footer>
	<div class="wave">
		<FooterWave />
	</div>
	<div class="content">
		<div class="copyright">
			© {currentYear} Matheus Fantinel. Made in Brazil.
		</div>
		<div class="credits">
			Powered by <a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer"
				>SvelteKit</a
			>. Icons by
			<a href="https://iconoir.com/" target="_blank" rel="noopener noreferrer">Iconoir</a>.
		</div>
		<div class="socials">
			<Socials />
			<RssLink />
			<ThemeToggle />
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		height: 340px;
		width: 100%;
		background: linear-gradient(60deg, var(--color--waves-start) 0%, var(--color--waves-end) 100%);
		display: grid;
		grid-template-rows: 120px 1fr;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 15px;
			font-weight: 600;
			text-align: center;

			.credits {
				font-weight: 400;
				font-size: 90%;
				color: var(--color--text-shade);
			}

			.socials {
				display: flex;
				align-items: center;
				gap: 20px;
			}
		}

		a {
			&:hover {
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}
</style>
