<script>
	import Card from '$lib/components/base/card.svelte';
	import TwoByTwoGrid from '$lib/components/layout/2x2-grid.svelte';
	import Section from '$lib/components/layout/section.svelte';
	import LowAccentHighlight from '$lib/components/style/low-accent-highlight.svelte';
	import Tag from '../base/tag.svelte';
	import Blobs from '../layout/blobs.svelte';
	import { yearsOfExperience, entries } from '$lib/experience';
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
