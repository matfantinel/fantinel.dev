<script lang="ts">
	import ExperienceCard from '$lib/components/molecules/ExperienceCard.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type WorkExperience from '$lib/data/work-experience/model';
	import Button from '../atoms/Button.svelte';

	export let yearsOfExperience: number;
	export let entries: WorkExperience[];
</script>

<ContentSection
	id="experience"
	title="Work Experience"
	description="Over the past {yearsOfExperience}+ years, I've worked on a lot of cool projects with great people."
>
	<div slot="button">
		<Button color="secondary" href="/resume">View Resume</Button>
	</div>
	<div class="grid">
		{#each entries as entry}
			<ExperienceCard
				companySlug={entry.companySlug}
				company={entry.company}
				jobTitle={entry.jobTitle}
				timeframe={entry.timeframe}
				description={entry.description}
				tags={entry.tags}
			/>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.grid {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 20px;
		:global(> *) {
			flex: 1 0 320px;
		}
	}
</style>
