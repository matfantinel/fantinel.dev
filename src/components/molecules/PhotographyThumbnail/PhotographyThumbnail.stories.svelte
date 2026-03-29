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
      image={args.image || 'https://picsum.photos/1000/1000'}
      {...args}
    />
  </div>
{/snippet}

<Story
  name="Single Photo"
  args={{
    image: 'https://picsum.photos/1000/1000',
  }}
/>

<Story
  name="Two Photos"
  args={{
    image: 'https://picsum.photos/1000/1000',
    additionalImages: [
      { src: 'https://picsum.photos/800/450', alt: 'Additional image 1' },
    ],
  }}
/>

<Story
  name="Three Photos"
  args={{
    image: 'https://picsum.photos/1000/1000',
    additionalImages: [
      { src: 'https://picsum.photos/800/450', alt: 'Additional image 1' },
      { src: 'https://picsum.photos/450/800', alt: 'Additional image 2' },
    ],
  }}
/>

<Story
  name="Five Photos"
  args={{
    image: 'https://picsum.photos/1000/1000',
    additionalImages: [
      { src: 'https://picsum.photos/800/450', alt: 'Additional image 1' },
      { src: 'https://picsum.photos/600/600', alt: 'Additional image 3' },
      { src: 'https://picsum.photos/450/800', alt: 'Additional image 2' },
      { src: 'https://picsum.photos/500/900', alt: 'Additional image 4' },
    ],
  }}
/>