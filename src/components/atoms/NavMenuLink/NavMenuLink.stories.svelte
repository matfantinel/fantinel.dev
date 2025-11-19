<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import NavMenuLink from './NavMenuLink.svelte';
  import Rss from '@assets/icons/rss.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Nav Menu Link',
    component: NavMenuLink,
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
  <NavMenuLink {...args} href="#" icon={iconSnippet}>{args.children ?? 'Example'}</NavMenuLink>
{/snippet}

<Story name="Default" />