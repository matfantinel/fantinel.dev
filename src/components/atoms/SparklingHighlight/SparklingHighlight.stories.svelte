<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SparklingHighlight from './SparklingHighlight.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Sparkling Highlight',
    component: SparklingHighlight,
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
    <SparklingHighlight {...args} />
  </p>
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.words }} />