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

<Story name="Default" />