<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import ContentWithImage from './ContentWithImage.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Organisms/Content With Image" layout={{ type: 'single', iframe: true }}>
	<ContentWithImage />
</Hst.Story>
