<script lang="ts">
  import CodeBlock from "@components/molecules/CodeBlock.svelte";

	let {
		lang,
		text
	} : {
		lang: string;
		text: string;
	} = $props();

	let filename: string | undefined = $state(undefined);

	// Get filename from code block
	// Pattern: ~filename example.js
	// Then remove it from the code block
	const match = text.match(/^~filename\s*(.*)/);
	if (match && match[1]) {
		filename = match[1];
		// The regex below also removes the newline character
		text = text.replace(/^~filename.*(?:\n|$)/, '');
	}
</script>

<CodeBlock {lang} {filename} code={text} />