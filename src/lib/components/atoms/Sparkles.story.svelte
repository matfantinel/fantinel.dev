<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import Sparkles from './Sparkles.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';
	import Button from '$lib/components/atoms/Button.svelte';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<Sparkles>> = {
		color: 'default'
	};
</script>

<Hst.Story title="Atoms/Sparkles">
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={props.color}
			title="color"
			options={['default', 'primary', 'secondary']}
		/>
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<Sparkles {...props}>
				<Button>Sparkles can be added anywhere</Button>
			</Sparkles>
		</Hst.Variant>
	</div>
</Hst.Story>
