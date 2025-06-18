<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';
  import BlogPostCard from '@components/molecules/BlogPostCard';
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

{#snippet contentVariety(hideImage)}
  {#each Array(10) as _, index}
    <BlogPostCard
      title={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      url={`#blog-post-${index + 1}`}
      image={[2,5,6].includes(index) ? `https://placedog.net/600/315?id=${index + 1}` : undefined}
      readingTime={[0,2,4,6,7].includes(index) ? '5 min' : undefined}
      excerpt={[0,1,2,5,9].includes(index) ? LoremIpsum.paragraph : undefined}
      tags={[3,5,6,7].includes(index) ? ['Tag 1', 'Tag 2'] : undefined}
      hideImage={hideImage}
    />
  {/each}
{/snippet}

<Story 
  name="Default" 
  args={{ 
    title: LoremIpsum.words, 
    button: {
      text: 'Button',
      url: '#'
    },
    posts: contentVariety,
  }} 
/>