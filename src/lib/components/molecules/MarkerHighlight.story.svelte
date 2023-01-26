<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import MarkerHighlight from './MarkerHighlight.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<MarkerHighlight>> = {
		color: 'primary'
	};
</script>

<Hst.Story title="Molecules/Marker Highlight">
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={props.color} title="color" options={['primary', 'secondary']} />
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien mi, euismod eu ipsum
			eget, faucibus maximus erat. Integer nisl tellus, interdum sit amet nunc vel, ullamcorper
			suscipit odio. <MarkerHighlight {...props}
				>Praesent vitae nisl eros. Proin vel bibendum ante. Quisque nec fringilla libero. Duis
				accumsan urna at arcu vestibulum placerat. Curabitur tincidunt neque mauris, vel posuere ex
				malesuada quis.</MarkerHighlight
			> Ut nec odio placerat, aliquam elit vitae, volutpat eros. Duis vel sem purus. Donec gravida a
			lectus vel sagittis. Morbi vel porttitor erat. Vestibulum ante ipsum primis in faucibus orci luctus
			et ultrices posuere cubilia curae;
		</Hst.Variant>
	</div>
</Hst.Story>
