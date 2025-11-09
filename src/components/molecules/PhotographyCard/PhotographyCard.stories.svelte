<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import PhotographyCard from './PhotographyCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Photography Card',
    component: PhotographyCard,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      image: { control: 'text' },
      publishedDate: { control: 'date' },
      photoDate: { control: 'date' },
      content: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PhotographyCard
    title={args.title || LoremIpsum.words}
    image={args.image || 'https://placedog.net/1000/1000'}
    {...args}
  />
{/snippet}

<Story
  name="Default"
  args={{
    title: LoremIpsum.words,
    image: 'https://placedog.net/1000/1000',
    publishedDate: new Date(),
    photoDate: new Date(),
    content: LoremIpsum.words,
  }}
/>