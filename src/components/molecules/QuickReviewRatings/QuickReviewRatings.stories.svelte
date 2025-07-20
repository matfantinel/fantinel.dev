<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import QuickReviewRatings from './QuickReviewRatings.svelte';
  import { QuickReviewRating } from '@schemas/quick-review-types';

  const { Story } = defineMeta({
    title: 'Molecules/Quick Review Ratings',
    component: QuickReviewRatings,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <QuickReviewRatings
    {...args}
  />
{/snippet}

<Story
  name="Light, Loved"
  args={{
    rating: QuickReviewRating.LovedIt,
    theme: 'light',
  }}
/>

<Story
  name="Light, Liked"
  args={{
    rating: QuickReviewRating.LikeIt,
    theme: 'light',
  }}
/>

<Story
  name="Light, Decent"
  args={{
    rating: QuickReviewRating.Decent,
    theme: 'light',
  }}
/>

<Story
  name="Light, Didn't Like It"
  args={{
    rating: QuickReviewRating.DidntLikeIt,
    theme: 'light',
  }}
/>
  
<Story
  name="Dark, Loved"
  args={{
    rating: QuickReviewRating.LovedIt,
    theme: 'dark',
  }}
/>

<Story
  name="Dark, Liked"
  args={{
    rating: QuickReviewRating.LikeIt,
    theme: 'dark',
  }}
/>

<Story
  name="Dark, Monochrome, Loved"
  args={{
    rating: QuickReviewRating.LovedIt,
    theme: 'dark',
    monochrome: true,
  }}
/>

<Story
  name="Dark, Monochrome, Liked"
  args={{
    rating: QuickReviewRating.LikeIt,
    theme: 'dark',
    monochrome: true,
  }}
/>

<Story
  name="Light, Monochrome, Loved"
  args={{
    rating: QuickReviewRating.LovedIt,
    theme: 'light',
    monochrome: true,
  }}
/>

<Story
  name="Light, Monochrome, Liked"
  args={{
    rating: QuickReviewRating.LikeIt,
    theme: 'light',
    monochrome: true,
  }}
/>
  