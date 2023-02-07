<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Socials from './Socials.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Socials" layout={{ type: 'single', iframe: true }}>
	<Socials />
</Hst.Story>
