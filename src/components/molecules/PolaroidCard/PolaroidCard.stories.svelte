<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import PolaroidCard from './PolaroidCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Polaroid Card',
    component: PolaroidCard,
    tags: ['autodocs'],
    argTypes: {
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PolaroidCard
    title="Cute dog"
    image="https://placedog.net/400/400"
    imageAlt="Cute dog"
    photoDate={new Date()}
    content={LoremIpsum.sentence}
    {...args}
  />
{/snippet}

<Story
  name="Default"
/>