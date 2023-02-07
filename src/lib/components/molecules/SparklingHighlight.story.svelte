<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import SparklingHighlight from './SparklingHighlight.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<SparklingHighlight>> = {
		color: 'default',
		sparkleColor: 'default'
	};

	let text = 'Sparkling Text';
</script>

<Hst.Story title="Molecules/Sparkling Highlight">
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="Text" />
		<Hst.Select
			bind:value={props.color}
			title="color"
			options={['default', 'primary', 'secondary']}
		/>
		<Hst.Select
			bind:value={props.sparkleColor}
			title="sparkle color"
			options={['default', 'primary', 'secondary']}
		/>
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<SparklingHighlight {...props}>
				{text}
			</SparklingHighlight>
		</Hst.Variant>
	</div>
</Hst.Story>
