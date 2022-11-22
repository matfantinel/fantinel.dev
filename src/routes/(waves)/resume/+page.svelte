<script>
	import { title } from '$lib/meta';
	import Resume from '$lib/components/resume/resume.svelte';
	import DownloadIcon from '$lib/svg/download.svelte';
</script>

<svelte:head>
	<title>Resume - {title}</title>
	<meta property="og:title" content="Resume - {title}" />
	<meta name="twitter:title" content="Resume - {title}" />
</svelte:head>

<div class="resume-wrapper">
	<a
		class="download-link button secondary-light"
		href="https://github.com/matfantinel/matfantinel.github.io/raw/main/static/Matheus%20Fantinel%20-%20Resume.pdf"
	>
		<DownloadIcon />
		Download as PDF
	</a>

	<Resume />
</div>

<style lang="scss">
	.resume-wrapper {
		position: relative;
		padding: 40px 0 40px;
		min-height: 80vh;

		.download-link {
			position: absolute;
			top: -5px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			margin: 0 auto;
			width: fit-content;
			z-index: 1;

			:global(svg) {
				width: 20px;
				height: 20px;
				color: inherit;
			}
		}
	}
	@media print {
		.resume-wrapper {
			padding: 0;

			.download-link {
				display: none !important;
			}
		}

		:global(body) {
			background: var(--card-background-color);
		}
	}
</style>
