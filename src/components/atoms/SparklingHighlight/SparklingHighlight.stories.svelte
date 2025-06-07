<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SparklingHighlight from './SparklingHighlight.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Sparkling Highlight',
    component: SparklingHighlight,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' }
    },
    render: template
  });
</script>

{#snippet template(args)}
  <p>
    <SparklingHighlight {...args} />
  </p>
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.words }} />