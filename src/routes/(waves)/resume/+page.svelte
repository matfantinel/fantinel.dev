<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import Resume from '$lib/components/organisms/Resume.svelte';
	import { title } from '$lib/data/meta';
	import DownloadIcon from '$lib/icons/download.svelte';
	import type { ExperienceEntry } from '$lib/utils/types';

	export let data: {
		yearsOfExperience: number;
		experienceEntries: ExperienceEntry[];
	};

	let { yearsOfExperience, experienceEntries } = data;
</script>

<svelte:head>
	<title>Resume - {title}</title>
	<meta property="og:title" content="Resume - {title}" />
	<meta name="twitter:title" content="Resume - {title}" />
</svelte:head>

<div class="resume-wrapper">
	<Button
		additionalClass="download-link"
		href="https://github.com/matfantinel/matfantinel.github.io/raw/main/static/Matheus%20Fantinel%20-%20Resume.pdf"
		style="understated"
		color="secondary"
	>
		<DownloadIcon slot="icon" />
		Download as PDF
	</Button>

	<Resume {yearsOfExperience} {experienceEntries} />
</div>

<style lang="scss">
	.resume-wrapper {
		position: relative;
		padding: 40px 0 40px;
		min-height: 80vh;
		display: flex;
		gap: 10px;
		flex-direction: column;
		align-items: center;
	}

	@media print {
		.resume-wrapper {
			padding: 0;
		}

		:global(.download-link) {
			display: none !important;
		}

		:global(body) {
			background: var(--color--card-background);
		}
	}
</style>
