<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import CodeBlock from './CodeBlock.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Code Block',
    component: CodeBlock,
    tags: ['autodocs'],
    argTypes: {
      code: { control: 'text' },
      filename: { control: 'text' },
      lang: { control: 'text' },
      class: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <CodeBlock {...args} />
{/snippet}

<Story name="JavaScript" args={{ lang: 'javascript', filename: 'example.js', code: LoremIpsum.jsCode }} />
<Story name="CSS" args={{ lang: 'css', filename: 'example.css', code: LoremIpsum.cssCode }} />
<Story name="HTML" args={{ lang: 'html', filename: 'example.html', code: LoremIpsum.htmlCode }} />