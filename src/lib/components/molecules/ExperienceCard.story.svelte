<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import ExperienceCard from './ExperienceCard.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Experience Card">
	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<ExperienceCard
				company="Company Name"
				jobTitle="Job Title"
				timeframe="2020 - 2021"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl."
				tags={[{ label: 'Tag 1' }, { label: 'Tag 2', color: 'secondary' }]}
			/>
		</Hst.Variant>
	</div>
</Hst.Story>
