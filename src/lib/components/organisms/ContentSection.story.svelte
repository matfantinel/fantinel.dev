<script lang="ts">
	import '$lib/scss/global.scss';
	import type { NoUndefinedField } from '$lib/utils/types';
	import type { Hst } from '@histoire/plugin-svelte';
	import type { ComponentProps } from 'svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import ContentSection from './ContentSection.svelte';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<ContentSection>> = {
		title: 'Content Section',
		description: 'This is a section of content that can be used in a bunch of places',
		align: 'top'
	};
</script>

<Hst.Story title="Organisms/Content Section" layout={{ type: 'single', iframe: true }}>
	<Hst.Variant title="Top Aligned">
		<ContentSection {...props}>
			<div slot="button">
				<Button>Button</Button>
			</div>
			<pre>Content</pre>
		</ContentSection>
	</Hst.Variant>

	<Hst.Variant title="Left Aligned">
		<ContentSection {...props} align="left">
			<div slot="button">
				<Button>Button</Button>
			</div>
			<pre>Content</pre>
		</ContentSection>
	</Hst.Variant>

	<Hst.Variant title="Right Aligned">
		<ContentSection {...props} align="right">
			<div slot="button">
				<Button>Button</Button>
			</div>
			<pre>Content</pre>
		</ContentSection>
	</Hst.Variant>
</Hst.Story>
