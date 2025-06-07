<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import IconLink from './IconLink.svelte';
  import Rss from '@assets/icons/rss.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Icon Link',
    component: IconLink,
    tags: ['autodocs'],
    argTypes: {
      href: { control: 'text', required: true },
      children: { control: 'text', name: 'Example' },
      icon: { control: false },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet iconSnippet()}<Rss />{/snippet}
{#snippet template(args)}
  <IconLink {...args} href="#" icon={iconSnippet}>{args.children ?? 'Example'}</IconLink>
{/snippet}

<Story name="Default" />