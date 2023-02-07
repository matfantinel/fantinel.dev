<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import Callout from './Callout.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<Callout>> = {
		type: 'info'
	};
</script>

<Hst.Story title="Molecules/Callout">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={props.type}
			title="color"
			options={['info', 'warning', 'error', 'success']}
		/>
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<Callout {...props}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien mi, euismod eu
				ipsum eget, faucibus maximus erat. Integer nisl tellus, interdum sit amet nunc vel,
				ullamcorper suscipit odio.
			</Callout>
		</Hst.Variant>
	</div>
</Hst.Story>
