<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import ArrowLink from './ArrowLink.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Arrow Link',
    component: ArrowLink,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: { type: 'select' },
        options: ['default', 'green', 'yellow', 'peach', 'red', 'mauve', 'blue', 'teal'],
      },
      href: { control: 'text' },
      children: { control: 'text', name: 'Arrow Link' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <ArrowLink {...args}>{args.children ?? 'Arrow Link'}</ArrowLink>
{/snippet}

<Story name="Default" />