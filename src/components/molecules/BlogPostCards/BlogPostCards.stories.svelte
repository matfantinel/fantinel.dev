<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import BlogPostCards from './BlogPostCards.svelte';
  import BlogPostCard from '@components/molecules/BlogPostCard';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Blog Post Cards',
    component: BlogPostCards,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <BlogPostCards {...args}>
    {@render args.children?.()}
  </BlogPostCards>
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

{#snippet hideImage()}
  {#each Array(10) as _, index}
    <BlogPostCard
      title={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      url={`#blog-post-${index + 1}`}
      image={[2,5,6].includes(index) ? `https://placedog.net/600/315?id=${index + 1}` : undefined}
      readingTime={[0,2,4,6,7].includes(index) ? '5 min' : undefined}
      excerpt={[0,1,2,5,9].includes(index) ? LoremIpsum.paragraph : undefined}
      tags={[3,5,6,7].includes(index) ? ['Tag 1', 'Tag 2'] : undefined}
      hideImage
    />
  {/each}
{/snippet}

<Story name="Default" args={{ children: contentVariety }} />

<Story name="Hide Images" args={{ children: hideImage }} />
