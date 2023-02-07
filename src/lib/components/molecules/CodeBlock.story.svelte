<script lang="ts">
	import '$lib/scss/global.scss';
	import type { ComponentProps } from 'svelte';
	import type { Hst } from '@histoire/plugin-svelte';
	import CodeBlock from './CodeBlock.svelte';
	import type { NoUndefinedField } from '$lib/utils/types';

	export let Hst: Hst;

	let props: NoUndefinedField<ComponentProps<CodeBlock>> = {
		filename: '+page.svelte',
		lang: 'svelte'
	};
</script>

<Hst.Story title="Molecules/Code Block">
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={props.filename} title="File Name" />
		<Hst.Text bind:value={props.lang} title="Language" />
	</svelte:fragment>

	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<CodeBlock {...props}>
				<pre class="language-svelte"><code class="language-svelte"
						><span class="token tag"
							><span class="token tag"><span class="token punctuation">&lt;</span>Header</span
							> <span class="token punctuation">/&gt;</span></span
						>

          <span class="token tag"
							><span class="token tag"><span class="token punctuation">&lt;</span>main</span><span
								class="token punctuation">&gt;</span
							></span
						>
            <span class="token tag"
							><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span
								class="token punctuation">/&gt;</span
							></span
						>
          <span class="token tag"
							><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span
								class="token punctuation">&gt;</span
							></span
						>
          
          <span class="token tag"
							><span class="token tag"><span class="token punctuation">&lt;</span>Footer</span
							> <span class="token punctuation">/&gt;</span></span
						></code
					></pre>
			</CodeBlock>
		</Hst.Variant>
	</div>
</Hst.Story>
