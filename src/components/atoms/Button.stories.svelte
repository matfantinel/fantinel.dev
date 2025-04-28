<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: { type: 'select' },
        options: ['default', 'green', 'yellow', 'peach', 'red', 'mauve', 'blue', 'teal'],
      },
      href: { control: 'text' },
      children: { control: 'text', name: 'Button Text' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
      icon: { control: false }
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <Button {...args}>{args.children ?? 'Button'}</Button>
{/snippet}

<Story name="Default" />