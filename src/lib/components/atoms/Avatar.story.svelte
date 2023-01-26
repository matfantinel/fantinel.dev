<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Avatar from './Avatar.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Atoms/Avatar">
	<Avatar />
</Hst.Story>
