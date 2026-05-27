<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import IconLink from './IconLink.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Icon Link',
    component: IconLink,
    tags: ['autodocs'],
    argTypes: {
      href: { control: 'text', required: true },
      children: { control: 'text', name: 'Example' },
      icon: { control: 'text' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <IconLink {...args} href="#" icon="rss">{args.children ?? 'Example'}</IconLink>
{/snippet}

<Story name="Default" />

<Story name="Icon on Right" args={{ iconPosition: 'right' }} />
