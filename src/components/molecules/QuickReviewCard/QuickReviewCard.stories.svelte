<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import QuickReviewCard from './QuickReviewCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Quick Review Card',
    component: QuickReviewCard,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      slug: { control: 'text' },
      image: { control: 'text' },
      customBg: { control: 'text' },
      content: { control: 'text' },
      class: { control: false },
    },
    render: template
  });

  const defaultArgs = {
    title: 'Title of movie, tv show, game or music album',
    slug: 'slug-of-the-review',
    metadata: '2025 - Director, Artist, Publisher, Developer',
    image: 'https://placedog.net/220/330',
    date: '2025-01-01',
    type: 'Movie',
    rating: 'Loved it!',
    content: LoremIpsum.paragraph
  };
</script>

{#snippet template(args)}
  <QuickReviewCard
    title={args.title || 'Quick Review Title'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={defaultArgs}
/>

<Story
  name="Light Theme"
  args={{
    ...defaultArgs,
    theme: 'light'
  }}
/>

<Story
  name="Custom BG, Dark"
  args={{
    ...defaultArgs,
    customBg: 'A30200'
  }}
/>

<Story
  name="Custom BG, Light"
  args={{
    ...defaultArgs,
    theme: 'light',
    customBg: '44CBE2'
  }}
/>