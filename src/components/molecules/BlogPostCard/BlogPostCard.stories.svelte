<script module lang="ts">
  import { defineMeta, setTemplate, type Args, type StoryContext } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import BlogPostCard from './BlogPostCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Blog Post Card',
    component: BlogPostCard,
    tags: ['autodocs'],
    argTypes: {
      image: { control: 'text' },
      title: { control: 'text' },
      readingTime: { control: 'text' },
      excerpt: { control: 'text' },
      tags: { control: 'object' },
      url: { control: 'text' },
      class: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <BlogPostCard
    title={args.title || 'Blog Post Title'}
    url={args.url || '#'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={{
    image: 'https://placedog.net/600/315',
    readingTime: '5 min',
    excerpt: LoremIpsum.paragraph,
    tags: ['Tag 1', 'Tag 2'],
  }}
/>

<Story
  name="No Image"
  args={{
    readingTime: '5 min',
    excerpt: LoremIpsum.paragraph,
    tags: ['Tag 1', 'Tag 2'],
  }}
/>

<Story
  name="Hide Image"
  args={{
    hideImage: true,
    readingTime: '5 min',
    excerpt: LoremIpsum.paragraph,
    tags: ['Tag 1', 'Tag 2'],
  }}
/>

<Story
  name="No Excerpt"
  args={{
    image: 'https://placedog.net/600/315',
    readingTime: '5 min',
    tags: ['Tag 1', 'Tag 2'],
  }}
/>

<Story
  name="No Tags"
  args={{
    image: 'https://placedog.net/600/315',
    readingTime: '5 min',
    excerpt: LoremIpsum.paragraph,
  }}
/>

<Story
  name="Bare Minimum"
  args={{
  }}
/>