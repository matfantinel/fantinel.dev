<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import TimelineItem from './TimelineItem.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Timeline Item',
    component: TimelineItem,
    tags: ['autodocs'],
    argTypes: {
      type: { control: 'text' },
      data: { control: 'object' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <TimelineItem
    type={args.type}
    data={args.data}
    {...args}
  />
{/snippet}

<Story
  name="Blog Post"
  args={{
    type: 'blog',
    data: {
      title: 'A Blog Post Title',
      slug: 'a-blog-post-title',
      excerpt: LoremIpsum.paragraph,
      coverImage: 'https://placedog.net/600/315',
      coverImageAlt: 'A cute dog',
      categories: [{ name: 'Dev', slug: 'dev', url: '/blog/category/dev' }],
      date: new Date(),
      readingTime: '5 min',
    },
  }}
/>

<Story
  name="Quick Review"
  args={{
    type: 'quick-review',
    data: {
      title: 'A Movie Title',
      slug: 'a-movie-title',
      metadata: '2026 - Some Director',
      image: 'https://placedog.net/220/330',
      rating: 'Loved it!',
      type: 'Movie',
      theme: 'dark',
      date: new Date(),
      content: LoremIpsum.paragraph,
    },
  }}
/>

<Story
  name="Cool Link"
  args={{
    type: 'cool-link',
    data: {
      title: 'An Interesting Article',
      slug: 'an-interesting-article',
      url: '#',
      author: 'Author Name',
      savedOn: new Date(),
      tags: [{ name: 'Tag 1', slug: 'tag-1', url: '/cool-links/tag/tag-1' }],
      content: LoremIpsum.paragraph,
    },
  }}
/>

<Story
  name="Photography"
  args={{
    type: 'photography',
    data: {
      title: 'A Beautiful Photo',
      slug: 'a-beautiful-photo',
      image: 'https://placedog.net/1000/1000',
      photoDate: new Date(),
      publishedDate: new Date(),
      imageAlt: 'A cute dog',
      content: LoremIpsum.words,
    },
  }}
/>
