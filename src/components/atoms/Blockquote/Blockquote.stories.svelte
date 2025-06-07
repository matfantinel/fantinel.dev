<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
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
    render: template
  });
</script>

{#snippet template(args)}
  <Blockquote {...args} />
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.paragraph }} />