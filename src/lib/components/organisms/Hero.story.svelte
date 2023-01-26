<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Hero from './Hero.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Organisms/Hero" layout={{ type: 'single', iframe: true }}>
	<Hero />
</Hst.Story>
