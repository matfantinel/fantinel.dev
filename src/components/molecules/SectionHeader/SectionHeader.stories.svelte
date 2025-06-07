<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import SectionHeader from './SectionHeader.svelte';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Section Header',
    component: SectionHeader,
    tags: ['autodocs'],
    argTypes: {
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
    button: {
      text: 'Button',
      url: '#'
    }
  }}
/>

<Story
  name="Centered"
  args={{
    title: LoremIpsum.words,
    button: {
      text: 'Button',
      url: '#'
    },
    centered: true
  }}
/>