<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import NewPhotographyCard from './NewPhotographyCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/New Photography Card',
    component: NewPhotographyCard,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      image: { control: 'text' },
      publishedDate: { control: 'date' },
      photoDate: { control: 'date' },
      content: { control: 'text' },
      additionalImages: { control: 'object' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <NewPhotographyCard
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

<Story
  name="With Additional Images"
  args={{
    title: LoremIpsum.words,
    image: 'https://placedog.net/1000/1000',
    publishedDate: new Date(),
    photoDate: new Date(),
    content: LoremIpsum.words,
    additionalImages: [
      { src: 'https://placedog.net/800/450', alt: 'Additional image 1' },
      { src: 'https://placedog.net/450/800', alt: 'Additional image 2' },
    ],
  }}
/>

