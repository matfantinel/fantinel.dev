<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import HamburgerMenu from './HamburgerMenu.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Hamburger Menu">
	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<HamburgerMenu
				links={[
					{ href: '/blog', text: 'Blog' },
					{ href: '/resume', text: 'Resume' }
				]}
			/>
		</Hst.Variant>
	</div>
</Hst.Story>
