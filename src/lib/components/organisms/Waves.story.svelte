<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Waves from './Waves.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Organisms/Waves" layout={{ type: 'single', iframe: true }}>
	<Waves />
</Hst.Story>
