<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import Footer from './Footer.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Footer',
    component: Footer,
    tags: ['autodocs'],
    argTypes: {
      
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <Footer {...args} />
{/snippet}

<Story name="Default" />