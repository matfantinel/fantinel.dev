<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';
  import type { BlogPost } from '@schemas/blog';
  import FeaturedPosts from './FeaturedPosts.svelte';

  function generateMockPosts(count: number): BlogPost[] {
    return Array.from({ length: count }, (_, index) => ({
      title: LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' '),
      slug: `blog-post-${index + 1}`,
      excerpt: [0,1,2,5,9].includes(index) ? LoremIpsum.paragraph : '',
      coverImage: [2,5,6].includes(index) ? `https://placedog.net/600/315?id=${index + 1}` : undefined,
      showToc: false,
      hidden: false,
      categories: [3,5,6,7].includes(index) ? [{ name: 'Tag 1', slug: 'tag-1', url: '/tag-1' }, { name: 'Tag 2', slug: 'tag-2', url: '/tag-2' }] : [],
      date: new Date(2024, 0, index + 1),
      readingTime: [0,2,4,6,7].includes(index) ? '5 min' : undefined,
    }));
  }

  const { Story } = defineMeta({
    title: 'Organisms/Featured Posts',
    component: FeaturedPosts,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      button: { control: 'object' },
      posts: { control: 'object' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <FeaturedPosts {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{ 
    title: LoremIpsum.words, 
    button: {
      text: 'Button',
      href: '#'
    },
    posts: generateMockPosts(6),
  }} 
/>
