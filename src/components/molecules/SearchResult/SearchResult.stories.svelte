<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SearchResult from './SearchResult.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Search Result',
    component: SearchResult,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      readingTime: { control: 'text' },
      excerpt: { control: 'text' },
      tags: { control: 'object' },
      url: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <SearchResult
    title={args.title || LoremIpsum.words}
    url={args.url || '#'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={{
    readingTime: '5 min',
    excerpt: LoremIpsum.paragraph,
    tags: ['Tag 1', 'Tag 2'],
  }}
/>