<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import TimelineGroup from './TimelineGroup.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Timeline Group',
    component: TimelineGroup,
    tags: ['autodocs'],
    argTypes: {
      date: { control: 'text' },
      posts: { control: 'object' },
      class: { control: false },
    },
    render: template
  });

  const blogPost = {
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
  };

  const quickReview = {
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
  };

  const coolLink = {
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
  };

  const photography = {
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
  };
</script>

{#snippet template(args)}
  <TimelineGroup
    date={args.date || '2026-05-02'}
    posts={args.posts || []}
    {...args}
  />
{/snippet}

<Story
  name="All Post Types"
  args={{
    date: '2026-05-02',
    posts: [blogPost, quickReview, coolLink, photography],
  }}
/>
