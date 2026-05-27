<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Header from './Header.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Header',
    component: Header,
    tags: ['autodocs'],
    argTypes: {
      
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Header {...args} />
{/snippet}

<Story name="Default" args={{
  socials: [
    { name: 'Mastodon', url: '#' },
    { name: 'GitHub', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Email', url: '#' },
    { name: 'RSS', url: '#' }
  ],
  navigation: [
    { label: 'Home', href: '/', icon: 'home', color: 'og-accent' },
    { label: 'Archive', href: '/archive', icon: 'archive', color: 'og-accent' },
    { label: 'Blog', href: '/blog', icon: 'post-types/post', color: 'blog' },
    { label: 'Quick Reviews', href: '/quick-reviews', icon: 'post-types/quick-review', color: 'quick-review' },
    { label: 'Cool Links', href: '/cool-links', icon: 'post-types/cool-link', color: 'cool-link' },
    { label: 'Photography', href: '/photography', icon: 'post-types/photography', color: 'photography' },
    { label: 'RSS', href: '/rss.xml', icon: 'rss', color: 'og-accent', title: 'Subscribe to my RSS Feed' }
  ]
}} />