<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import ThemeToggle from './ThemeToggle.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Theme Toggle',
    component: ThemeToggle,
    tags: ['autodocs'],
    argTypes: {
      
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <ThemeToggle {...args} />
{/snippet}

<Story name="Default" />