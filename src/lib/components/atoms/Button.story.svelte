<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import Button from './Button.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';
	import Icon from '$lib/icons/chat.svelte';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<Button>> = {
		color: 'primary',
		style: 'solid',
		size: 'medium',
		href: '',
		target: '_blank',
		rel: 'noopener noreferrer'
	};

	let text = 'This is a Button';
</script>

<Hst.Story title="Atoms/Button" layout={{ type: 'grid', width: 400 }}>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="Text" />
		<Hst.Select bind:value={props.color} title="color" options={['primary', 'secondary']} />
		<Hst.Select
			bind:value={props.style}
			title="Style"
			options={['solid', 'understated', 'clear']}
		/>
		<Hst.Select bind:value={props.size} title="Size" options={['small', 'medium', 'large']} />
		<Hst.Text bind:value={props.href} title="Href" />
		<Hst.Select bind:value={props.target} title="Target" options={['_self', '_blank']} />
		<Hst.Text bind:value={props.rel} title="Rel" />
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="No Icon">
			<Button {...props}>
				{text}
			</Button>
		</Hst.Variant>
		<Hst.Variant title="With Icon">
			<Button {...props}>
				<Icon slot="icon" />
				{text}
			</Button>
		</Hst.Variant>
	</div>
</Hst.Story>
