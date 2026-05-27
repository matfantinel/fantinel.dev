<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';
  import { PostType } from '@schemas/post-types';

  import SearchResults from './SearchResults.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Search Results',
    component: SearchResults,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <SearchResults {...args} />
{/snippet}

<Story
  name="Multiple Results"
  args={{
    results: [
      {
        type: PostType.BLOG_POST,
        title: 'First Blog Post',
        url: '#',
        image: 'https://placedog.net/1000/1000',
        imageAlt: 'Dog photo',
        excerpt: 'Cillum fugiat excepteur non est <mark>test</mark> minim qui sit est officia.',
      },
      {
        type: PostType.QUICK_REVIEW,
        title: 'Quick Review: Something',
        url: '#',
        image: 'https://placedog.net/800/600',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        type: PostType.COOL_LINK,
        title: 'A Cool Link',
        url: '#',        
        excerpt: 'Check out this amazing resource I found.',
      },
      {
        type: PostType.PHOTOGRAPHY,
        title: 'Mountain Hike Photos',
        url: '#',
        image: 'https://placedog.net/600/800',
        excerpt: 'Some shots from my weekend trip.',
      },
    ],
  }}
/>

<Story
  name="Single Result"
  args={{
    results: [
      {
        type: PostType.BLOG_POST,
        title: 'Only One Result',
        url: '#',
        excerpt: LoremIpsum.paragraph,
      },
    ],
  }}
/>
