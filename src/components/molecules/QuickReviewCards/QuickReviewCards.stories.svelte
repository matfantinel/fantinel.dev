<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import QuickReviewCards from './QuickReviewCards.svelte';
  import QuickReviewCard from '@components/molecules/QuickReviewCard';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Quick Review Cards',
    component: QuickReviewCards,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <QuickReviewCards {...args}>
    {@render args.children?.()}
  </QuickReviewCards>
{/snippet}

{#snippet children()}
  {#each Array(10) as _, index}
    <QuickReviewCard
      title="Title of movie, tv show, game or music album"
      slug="slug-of-the-review"
      metadata="2025 - Director, Artist, Publisher, Developer"
      image="https://placedog.net/220/330"
      date="2025-01-01"
      type="Movie"
      rating="Loved it!"
      content={LoremIpsum.paragraph}
    />
  {/each}
{/snippet}

<Story name="Default" args={{ children }} />
