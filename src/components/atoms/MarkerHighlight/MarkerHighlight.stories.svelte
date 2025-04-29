<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import MarkerHighlight from './MarkerHighlight.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Marker Highlight',
    component: MarkerHighlight,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' }
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <p>
    {LoremIpsum.sentence}
    <MarkerHighlight {...args} />
    {LoremIpsum.sentence}
  </p>
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.sentence }} />