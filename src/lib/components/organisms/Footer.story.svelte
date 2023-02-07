<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Footer from './Footer.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Organisms/Footer" layout={{ type: 'single', iframe: true }}>
	<Footer />
</Hst.Story>
