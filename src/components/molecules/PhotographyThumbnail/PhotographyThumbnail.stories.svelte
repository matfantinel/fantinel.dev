<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import PhotographyThumbnail from './PhotographyThumbnail.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Photography Thumbnail',
    component: PhotographyThumbnail,
    tags: ['autodocs'],
    argTypes: {
      image: { control: 'text' },
      additionalImages: { control: 'object' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <div style="width: min(100%, 800px); aspect-ratio: 1 / 1;">
    <PhotographyThumbnail
      image={args.image || 'https://placedog.net/1000/1000'}
      {...args}
    />
  </div>
{/snippet}

<Story
  name="Single Photo"
  args={{
    image: 'https://placedog.net/1000/1000',
  }}
/>

<Story
  name="Two Photos"
  args={{
    image: 'https://placedog.net/1000/1000',
    additionalImages: [
      { src: 'https://placedog.net/800/450', alt: 'Additional image 1' },
    ],
  }}
/>

<Story
  name="Three Photos"
  args={{
    image: 'https://placedog.net/1000/1000',
    additionalImages: [
      { src: 'https://placedog.net/800/450', alt: 'Additional image 1' },
      { src: 'https://placedog.net/450/800', alt: 'Additional image 2' },
    ],
  }}
/>

<Story
  name="Five Photos"
  args={{
    image: 'https://placedog.net/1000/1000',
    additionalImages: [
      { src: 'https://placedog.net/800/450', alt: 'Additional image 1' },
      { src: 'https://placedog.net/600/600', alt: 'Additional image 3' },
      { src: 'https://placedog.net/450/800', alt: 'Additional image 2' },
      { src: 'https://placedog.net/500/900', alt: 'Additional image 4' },
    ],
  }}
/>