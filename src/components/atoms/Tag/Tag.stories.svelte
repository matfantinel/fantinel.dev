<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Tag from './Tag.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
      icon: { control: 'text' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Tag {...args}>{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} icon="cool">{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} count={3}>{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} icon="cool" count={3}>{args.children ?? 'Tag'}</Tag>
{/snippet}

<Story name="Default" />

<Story name="Active" args={{ active: true }} />

<Story name="Small" args={{ size: 'small' }} />

<Story name="Responsive" args={{ size: 'responsive' }} />

<Story name="Hyperlinks" args={{ href: '#' }} />

<Story name="Hyperlinks, Active" args={{ href: '#', active: true }} />