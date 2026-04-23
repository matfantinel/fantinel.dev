<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';
  import PostsSection from './PostsSection.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Posts Section',
    component: PostsSection,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      button: { control: 'object' },
      posts: { control: 'array' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PostsSection {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{ 
    title: LoremIpsum.words, 
    button: {
      text: 'Button',
      url: '#'
    },
    posts: Array.from({ length: 4 }, (_, index) => ({
      title: 'Post ' + (index + 1),
      url: '#',
      image: 'https://picsum.photos/600/315',
      readingTime: '5 min',
      excerpt: LoremIpsum.paragraph,
      tags: ['Tag 1', 'Tag 2'],
    }))
  }} 
/>