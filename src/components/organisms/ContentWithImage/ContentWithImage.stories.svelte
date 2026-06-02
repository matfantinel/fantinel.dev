<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import ContentWithImage from './ContentWithImage.svelte';
  import PolaroidCard from '@components/molecules/PolaroidCard';

  const { Story } = defineMeta({
    title: 'Organisms/Content With Image',
    component: ContentWithImage,
    tags: ['autodocs'],
    argTypes: {
      heading: { control: 'text' },
      body: { control: 'text' },
      button: { control: 'object' },
      secondaryButton: { control: 'object' },
      image: { control: 'text' },
      imageAlt: { control: 'text' },
      imageBehavior: { control: 'select', options: ['cover', 'contain'] },
      imagePosition: { control: 'select', options: ['before', 'after'] },
      background: { control: 'select', options: ['clear', 'card'] },
      class: { control: false },
    },
    render: template,
  });
</script>

{#snippet template(args)}
  <ContentWithImage
    heading={args.heading ?? LoremIpsum.words}
    body={args.body ?? LoremIpsum.paragraph}
    image={args.image ?? 'https://placedog.net/600/600'}
    imageAlt={args.imageAlt ?? 'A placeholder dog'}
    button={args.button ?? { text: 'Primary', href: '#' }}
    secondaryButton={args.secondaryButton ?? { text: 'Secondary', href: '#' }}
    {...args}
  />
{/snippet}

{#snippet polaroidSnippet()}
  <PolaroidCard
    title="A cute dog"
    image="https://placedog.net/600/600"
    rotation={3}
  />
{/snippet}

<!-- Cover, After, Clear (defaults) -->
<Story name="Default" />

<!-- Cover, Before, Clear -->
<Story
  name="Image Before"
  args={{
    imagePosition: 'before',
  }}
/>

<!-- Contain, After, Clear -->
<Story
  name="Image Contain"
  args={{
    imageBehavior: 'contain',
  }}
/>

<!-- Cover, After, Card -->
<Story
  name="Background Card"
  args={{
    background: 'card',
  }}
/>

<!-- Cover, Before, Card -->
<Story
  name="Card + Image Before"
  args={{
    imagePosition: 'before',
    background: 'card',
  }}
/>

<!-- Contain, After, Card -->
<Story
  name="Card + Image Contain"
  args={{
    imageBehavior: 'contain',
    background: 'card',
  }}
/>

<!-- Contain, Before, Clear -->
<Story
  name="Before + Contain"
  args={{
    imageBehavior: 'contain',
    imagePosition: 'before',
  }}
/>

<!-- Single polaroid -->
<Story
  name="With Single Polaroid"
  args={{
    polaroids: { title: 'A cute dog', image: 'https://placedog.net/600/600', rotation: 3 },
  }}
/>

<!-- Single polaroid, image before -->
<Story
  name="With Single Polaroid + Before"
  args={{
    imagePosition: 'before',
    polaroids: { title: 'A cute dog', image: 'https://placedog.net/600/600', rotation: -3 },
  }}
/>

<!-- Multiple polaroids -->
<Story
  name="With Multiple Polaroids"
  args={{
    polaroids: [
      { title: 'First', image: 'https://placedog.net/400/300', },
      { title: 'Second', image: 'https://placedog.net/400/300', },
      { title: 'Third', image: 'https://placedog.net/400/300', },
    ],
  }}
/>

<!-- Snippet (PolaroidCard) -->
<Story
  name="With Snippet (Polaroid)"
  args={{
    imageSlot: polaroidSnippet,
  }}
/>

<!-- Snippet (PolaroidCard), image before -->
<Story
  name="With Snippet (Polaroid) + Before"
  args={{
    imagePosition: 'before',
    imageSlot: polaroidSnippet,
  }}
/>
