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
      size: { control: 'text' },
      theme: { control: 'radio', options: ['greenish', 'pinkish', 'rainbow'], defaultValue: 'greenish' },
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
    src: 'https://placedog.net/100/100',
    alt: 'Doggy Dogginton',
    size: '50px',
  }}
/>

<Story
  name="Multiple Images"
  args={{
    src: 'https://placedog.net/100/100',
    extraImages: ['https://placedog.net/200/200', 'https://placedog.net/300/300'],
    alt: 'Doggy Dogginton',
    size: '100px',
  }}
/>