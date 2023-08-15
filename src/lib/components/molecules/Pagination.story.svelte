<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Pagination from './Pagination.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Pagination">
	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<Pagination currentPage={25} totalPages={50} />
		</Hst.Variant>
	</div>
</Hst.Story>
