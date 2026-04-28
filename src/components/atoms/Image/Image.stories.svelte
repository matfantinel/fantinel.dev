<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Image from './Image.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Image',
    component: Image,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'Does nothing style-wise, but handles srcsets and lazy loading.',
        },
      },
    },
    argTypes: {
      src: { control: 'text', required: true },
      figcaption: { control: 'text' },
    },
    render: template,
  });
</script>

{#snippet template(args)}
  <Image {...args} />
{/snippet}

<Story
  name="Default"
  args={{
    src: 'https://placedog.net/600/600',
  }}
/>
