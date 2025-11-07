<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import CoolLinkCard from './CoolLinkCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Cool Link Card',
    component: CoolLinkCard,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      date: { control: 'text' },
      author: { control: 'text' },
      url: { control: 'text' },
      tags: { control: 'object' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CoolLinkCard
    title={args.title || LoremIpsum.words}
    url={args.url || '#'}
    date={args.date || '2025-01-01'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={{
    tags: ['Tag 1', 'Tag 2'],
    author: 'Author Name',
    content: LoremIpsum.paragraph,
  }}
/>

<Story
  name="No Author"
  args={{
    tags: ['Tag 1', 'Tag 2'],
    content: LoremIpsum.paragraph,
  }}
/>

<Story
  name="No Content"
  args={{
    tags: ['Tag 1', 'Tag 2'],
    author: 'Author Name',
  }}
/>

<Story
  name="No Tags"
  args={{
    author: 'Author Name',
    content: LoremIpsum.paragraph,
  }}
/>

<Story
  name="Bare Minimum"
  args={{
  }}
/>
