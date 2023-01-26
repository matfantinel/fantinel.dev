<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Tag from './Tag.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Atoms/Tag" layout={{ type: 'grid', width: 200 }}>
	<Hst.Variant title="Primary">
		<Tag>This is a Tag</Tag>
	</Hst.Variant>

	<Hst.Variant title="Secondary">
		<Tag color="secondary">This is a Tag</Tag>
	</Hst.Variant>
</Hst.Story>
