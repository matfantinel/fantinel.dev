<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SearchResult from './SearchResult.svelte';
  import { PostType } from '@schemas/post-types';

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
    excerpt={args.excerpt || 'Cillum fugiat excepteur non est <mark>test</mark> minim qui sit est officia excepteur ipsum.' }
    url={args.url || '#'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={{
    image: 'https://placedog.net/1000/1000',
    imageAlt: 'Dog',
    type: PostType.BLOG_POST,
  }}
/>

<Story
  name="No Image"
  args={{
    type: PostType.BLOG_POST,
  }}
/>

<Story
  name="Quick Review"
  args={{
    type: PostType.QUICK_REVIEW,
  }}
/>

<Story
  name="Cool Link"
  args={{
    type: PostType.COOL_LINK,
  }}
/>

<Story
  name="Photography"
  args={{
    type: PostType.PHOTOGRAPHY,
  }}
/>

<Story
  name="Page"
  args={{
    type: PostType.PAGE,
  }}
/>