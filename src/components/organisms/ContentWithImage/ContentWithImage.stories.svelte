<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import ContentWithImage from './ContentWithImage.svelte';

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
    button={args.button ?? { text: 'Primary', url: '#' }}
    secondaryButton={args.secondaryButton ?? { text: 'Secondary', url: '#' }}
    {...args}
  />
{/snippet}

<!-- Cover, After, Clear (defaults) -->
<Story
  name="Default"
/>

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
