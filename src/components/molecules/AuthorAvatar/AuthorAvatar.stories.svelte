<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import AuthorAvatar from './AuthorAvatar.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Author Avatar',
    component: AuthorAvatar,
    tags: ['autodocs'],
    argTypes: {
      src: { control: 'text' },
      alt: { control: 'text' },
      size: { control: 'radio', options: ['large', 'medium', 'small', 'tiny'] },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <AuthorAvatar {...args} />
{/snippet}

<Story
  name="Default"
  args={{
    src: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Avatar1&backgroundColor=transparent',
    alt: 'Avatar 1',
    size: '50px',
  }}
/>

<Story
  name="Multiple Images"
  args={{
    src: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Avatar1&backgroundColor=transparent',
    extraImages: ['https://api.dicebear.com/9.x/avataaars/svg?seed=Avatar2&backgroundColor=transparent', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Avatar3&backgroundColor=transparent'],
    alt: 'Avatar 1',
    size: '100px',
  }}
/>