<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import Blockquote from './Blockquote.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' },
      cite: { control: 'text' },
      class: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <Blockquote {...args} />
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.paragraph }} />