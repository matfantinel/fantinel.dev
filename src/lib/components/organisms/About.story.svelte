<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import About from './About.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Organisms/About" layout={{ type: 'single', iframe: true }}>
	<About />
</Hst.Story>
