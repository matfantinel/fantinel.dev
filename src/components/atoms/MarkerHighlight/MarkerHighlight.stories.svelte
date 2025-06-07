<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import MarkerHighlight from './MarkerHighlight.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Marker Highlight',
    component: MarkerHighlight,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' }
    },
    render: template
  });
</script>

{#snippet template(args)}
  <p>
    {LoremIpsum.sentence}
    <MarkerHighlight {...args} />
    {LoremIpsum.sentence}
  </p>
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.sentence }} />