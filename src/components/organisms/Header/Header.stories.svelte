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
  ]
}} />