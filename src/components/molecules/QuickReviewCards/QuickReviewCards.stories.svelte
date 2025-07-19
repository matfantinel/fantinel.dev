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
      title={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      slug={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      image={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      rating={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      theme={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      customBg={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
      content={LoremIpsum.paragraph.split(' ').slice(0, index + 4).join(' ')}
    />
  {/each}
{/snippet}

<Story name="Default" args={{ children }} />
