<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Tag from './Tag.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
      selected: { control: 'boolean' },
      size: {
        control: { type: 'select' },
        options: ['default', 'small', 'responsive'],
      },
      href: { control: 'text' },
      children: { control: 'text', name: 'Tag Text' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Tag {...args}>{args.children ?? 'Tag'}</Tag>
{/snippet}

<Story name="Default" />

<Story name="Selected" args={{ selected: true }} />

<Story name="Small" args={{ size: 'small' }} />

<Story name="Small, Selected" args={{ size: 'small', selected: true }} />

<Story name="Inverted" args={{ color: 'inverted' }} />