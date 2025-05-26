<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import Tags from './Tags.svelte';
  import Tag from '@components/atoms/Tag';

  const { Story } = defineMeta({
    title: 'Molecules/Tags',
    component: Tags,
    tags: ['autodocs'],
    argTypes: {      
      class: { control: false },
      size: {
        control: { type: 'select' },
        options: ['default', 'small'],
      },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <Tags {...args}>
    {#each Array(10) as _, tag}
      <Tag size={args.size ?? 'default'}>Tag {tag}</Tag>
    {/each}
  </Tags>
{/snippet}

<Story name="Default" />