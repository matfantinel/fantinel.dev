<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import Header from './Header.svelte';
  import Header from '.';

  const { Story } = defineMeta({
    title: 'Organisms/Header',
    component: Header,
    tags: ['autodocs'],
    argTypes: {
      
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <Header {...args} />
{/snippet}

<Story name="Default" />