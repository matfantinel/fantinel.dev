<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import NavMenuLink from './NavMenuLink.svelte';
  import Home from '@assets/icons/home.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Nav Menu Link',
    component: NavMenuLink,
    tags: ['autodocs'],
    globals: {
      backgrounds: { value: 'var(--t-v6--surface--base)' },
    },
    argTypes: {
      href: { control: 'text', required: true },
      children: { control: 'text', name: 'Example' },
      color: { control: 'text' },
      icon: { control: false },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet iconSnippet()}<Home />{/snippet}
{#snippet template(args)}
  <NavMenuLink {...args} href="#" icon={iconSnippet}>{args.children ?? 'Example'}</NavMenuLink>
  <br>
  <NavMenuLink {...args} href="#" icon={iconSnippet} active>{args.children ?? 'Example'}</NavMenuLink>
{/snippet}

<Story name="Default" />
<Story name="Accent" args={{ color: 'accent' }} />
<Story name="Complementary" args={{ color: 'complementary' }} />
<Story name="Blog" args={{ color: 'blog' }} />
<Story name="Quick Review" args={{ color: 'quick-review' }} />
<Story name="Cool Links" args={{ color: 'cool-link' }} />
<Story name="Photography" args={{ color: 'photography' }} />
<Story name="Mobile" args={{ isMobile: true }} />
