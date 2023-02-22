<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Logo from '$lib/components/atoms/Logo.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Logo" layout={{ type: 'grid', width: 400 }}>
	<Hst.Variant title="Animated">
		<Logo animated={true} />
	</Hst.Variant>

	<Hst.Variant title="Static">
		<Logo animated={false} />
	</Hst.Variant>

	<Hst.Variant title="Icon Only">
		<Logo showFullLogo={false} />
	</Hst.Variant>
</Hst.Story>
