<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import ProjectCard from './ProjectCard.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Project Card">
	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<ProjectCard
				name="Project Name"
				description="Doggo ipsum very taste wow doge noodle horse wow very biscit, woofer. Puggorino you are doin me a concern long doggo woofer borkdrive length boy, shoob long water shoob ur givin me a spook."
				image="https://placedog.net/500"
				link="#"
				sourceCode="#"
				blogPostLink="#"
				tags={[{ label: 'Tag 1' }, { label: 'Tag 2', color: 'secondary' }]}
			/>
		</Hst.Variant>
	</div>
</Hst.Story>
