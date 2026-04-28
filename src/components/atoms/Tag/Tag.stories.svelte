<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Tag from './Tag.svelte';
  import Cool from '@assets/icons/cool.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Tag',
    component: Tag,
    tags: ['autodocs'],
    render: template
  });
</script>

{#snippet coolIconSnippet()}<Cool />{/snippet}

{#snippet template(args)}
  <Tag {...args}>{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} icon={coolIconSnippet}>{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} count={3}>{args.children ?? 'Tag'}</Tag>
  <br /><br />
  <Tag {...args} icon={coolIconSnippet} count={3}>{args.children ?? 'Tag'}</Tag>
{/snippet}

<Story name="Default" />

<Story name="Active" args={{ active: true }} />

<Story name="Small" args={{ size: 'small' }} />

<Story name="Responsive" args={{ size: 'responsive' }} />

<Story name="Hyperlinks" args={{ href: '#' }} />

<Story name="Hyperlinks, Active" args={{ href: '#', active: true }} />