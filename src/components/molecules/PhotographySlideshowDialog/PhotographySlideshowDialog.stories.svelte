<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import PhotographySlideshowDialog from './PhotographySlideshowDialog.svelte';
  import Button from '@components/atoms/Button';

  const { Story } = defineMeta({
    title: 'Molecules/Photography Slideshow Dialog',
    component: PhotographySlideshowDialog,
    tags: ['autodocs'],
    argTypes: {
      slug: { control: 'text' },
      image: { control: 'text' },
      imageAlt: { control: 'text' },
      additionalImages: { control: 'object' },
      photoDate: { control: 'date' },
      content: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <div style="display: flex; flex-direction: column; gap: var(--spacing-md); align-items: center;">
    <Button commandfor={args.slug || 'story-dialog'} command="show-modal">
      Open Slideshow
    </Button>
    <PhotographySlideshowDialog {...args} slug={args.slug || 'story-dialog'} />
  </div>
{/snippet}

<Story
  name="Single Image"
  args={{
    slug: 'single-image-dialog',
    image: 'https://placedog.net/1000/1000',
    imageAlt: 'A cute dog',
    photoDate: new Date(),
    content: LoremIpsum.words,
    title: LoremIpsum.words
  }}
/>

<Story
  name="With Additional Images"
  args={{
    slug: 'multi-image-dialog',
    image: 'https://placedog.net/1000/1000',
    imageAlt: 'Main photo',
    additionalImages: [
      { src: 'https://placedog.net/800/450', alt: 'Additional image 1' },
      { src: 'https://placedog.net/450/800', alt: 'Additional image 2' },
      { src: 'https://placedog.net/600/600', alt: 'Additional image 3' },
    ],
    photoDate: new Date(),
    content: LoremIpsum.sentence,
    title: LoremIpsum.words
  }}
/>

<Story
  name="No Description"
  args={{
    slug: 'no-desc-dialog',
    image: 'https://placedog.net/1000/1000',
    imageAlt: 'A photo without description',
    photoDate: new Date(),
    title: LoremIpsum.words
  }}
/>
