<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import Card from './Card.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Atoms/Card" layout={{ type: 'grid', width: 400 }}>
	<div style="padding: 10px;">
		<Hst.Variant title="Default">
			<Card>
				<div slot="content">Card Content</div>
				<div slot="footer">Footer</div>
			</Card>
		</Hst.Variant>

		<Hst.Variant title="With Image">
			<Card>
				<img slot="image" src="https://placedog.net/500" alt="A cute dog" />
				<div slot="content">
					Cards with images will automatically adapt between showing the image on top or bottom
					depending on how wide it is.
				</div>
			</Card>
		</Hst.Variant>

		<Hst.Variant title="With Link">
			<Card href="#">
				<img slot="image" src="https://placedog.net/500" alt="A cute dog" />
				<div slot="content">Card Content</div>
				<div slot="footer">Footer</div>
			</Card>
		</Hst.Variant>
	</div>
</Hst.Story>
