<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

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
    render: template
  });
</script>

{#snippet template(args)}
  <Tags {...args}>
    {#each Array(10) as _, tag}
      <Tag size={args.size ?? 'default'}>Tag {tag}</Tag>
    {/each}
  </Tags>
{/snippet}

<Story name="Default" />