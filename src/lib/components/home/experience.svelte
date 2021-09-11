<script>
	import Card from '$lib/components/base/card.svelte';
	import TwoByTwoGrid from '$lib/components/layout/2x2-grid.svelte';
	import Section from '$lib/components/layout/section.svelte';
	import LowAccentHighlight from '$lib/components/style/low-accent-highlight.svelte';
	import Tag from '../base/tag.svelte';
	import Blobs from '../layout/blobs.svelte';

	const careerStart = new Date(2014, 8, 22);
	const yearsOfExperience = Math.abs(
		new Date(Date.now() - careerStart.getTime()).getUTCFullYear() - 1970
	);

	const entries = [
		{
			id: 'freelancer',
			title: 'Freelancer',
			jobTitle: 'Front-End Web Developer',
			timeframe: '2021 ~ Now',
			description:
				"As an independent contractor, I've been able to build new innovative projects from scratch putting my development, planning, design and teamwork skills to the test.",
			tags: [
				{
					color: 'primary',
					text: 'Vue'
				},
        {
					color: 'primary',
					text: 'React'
				},
				{
					color: 'primary',
					text: 'Svelte'
				}
			]
		},
		{
			id: 'logitix',
			title: 'Logitix',
			jobTitle: 'Software Engineer',
			timeframe: '2019 ~ 2021',
			description:
				"Working on one of the biggest ticket brokerage management systems in the world, I've built new features, improved existing ones, and made huge boosts to performance.",
			tags: [
				{
					color: 'primary',
					text: 'Vue'
				},
				{
					color: 'primary',
					text: 'AngularJS'
				},
				{
					color: 'secondary',
					text: '.NET'
				},
				{
					color: 'secondary',
					text: 'SQL'
				}
			]
		},
		{
			id: 'sige',
			title: 'SIGE Cloud',
			jobTitle: 'Software Developer',
			timeframe: '2017 ~ 2019',
			description:
				'Built new mobile apps from scratch with Ionic, a simplified desktop ERP with Electron, and modernized the existing Web version by applying the Microfrontends approach.',
			tags: [
				{
					color: 'primary',
					text: 'Angular'
				},
				{
					color: 'primary',
					text: 'Ionic'
				},
				{
					color: 'primary',
					text: 'Electron'
				},
				{
					color: 'secondary',
					text: '.NET'
				},
				{
					color: 'secondary',
					text: 'MongoDB'
				}
			]
		},
		{
			id: 'promob',
			title: 'Promob',
			jobTitle: 'Software Developer',
			timeframe: '2014 ~ 2017',
			description:
				'Developed and maintained an internal web app, adding and adapting features to the business needs. Built several APIs used by other dev teams, and integrated them with 3rd-party services.',
			tags: [
				{
					color: 'primary',
					text: 'JQuery'
				},
				{
					color: 'secondary',
					text: '.NET'
				},
				{
					color: 'secondary',
					text: 'SQL'
				}
			]
		}
	];
</script>

<section id="experience">
	<Section
		align="right"
		title="Work Experience"
		description="Over the past {yearsOfExperience}+ years, I've worked on a lot of cool projects."
		buttonText="View Resume"
		buttonUrl="/resume"
		buttonColor="secondary"
	>
		<TwoByTwoGrid>
			{#each entries as entry}
				<Card>
					<div slot="content">
						<div class="title">
							<LowAccentHighlight id={entry.id}>{entry.title}</LowAccentHighlight>
						</div>
						<p>{entry.jobTitle}</p>
						<div class="note">{entry.timeframe}</div>
						<div class="text justify">
							{entry.description}
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							{#each entry.tags as tag}
								<Tag color={tag.color}>{tag.text}</Tag>
							{/each}
						</div>
					</div>
				</Card>
			{/each}
		</TwoByTwoGrid>
	</Section>
	<Blobs minLeft={60} maxTop={30} />
</section>

<style lang="scss">
	:global(#freelancer) {
		--bg-color: var(--freelancer-color);
	}
	:global(#logitix) {
		--bg-color: var(--logitix-color);
	}
	:global(#sige) {
		--bg-color: var(--sige-color);
	}
	:global(#promob) {
		--bg-color: var(--promob-color);
	}
</style>
