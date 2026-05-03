<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import SectionHeader from './SectionHeader.svelte';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Section Header',
    component: SectionHeader,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      body: { control: 'text' },
      button: { control: 'object' },
      secondaryButton: { control: 'object' },
      centered: { control: 'boolean' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <SectionHeader {...args} />
{/snippet}

<Story
  name="Default"
  args={{
    title: LoremIpsum.words,
    body: LoremIpsum.sentence,
    button: {
      text: 'Primary',
      url: '#'
    },
    secondaryButton: {
      text: 'Secondary',
      url: '#'
    },
  }}
/>

<Story
  name="Centered"
  args={{
    title: LoremIpsum.words,
    body: LoremIpsum.sentence,
    button: {
      text: 'Primary',
      url: '#'
    },
    secondaryButton: {
      text: 'Secondary',
      url: '#'
    },
    centered: true,
  }}
/>

<Story
  name="No Body"
  args={{
    title: LoremIpsum.words,
    button: {
      text: 'Primary',
      url: '#'
    },
  }}
/>

<Story
  name="Primary Button Only"
  args={{
    title: LoremIpsum.words,
    body: LoremIpsum.sentence,
    button: {
      text: 'Primary',
      url: '#'
    },
  }}
/>

<Story
  name="No Buttons"
  args={{
    title: LoremIpsum.words,
    body: LoremIpsum.sentence,
  }}
/>