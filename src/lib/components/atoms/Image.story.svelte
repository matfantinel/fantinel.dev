<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Image from './Image.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Atoms/Image" layout={{ type: 'grid', width: 400 }}>
	<Hst.Variant title="Default">
		<Image src="favicon.png" alt="Site Favicon" />
	</Hst.Variant>
</Hst.Story>
