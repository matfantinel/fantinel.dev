<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import ThemeToggle from './ThemeToggle.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Theme Toggle',
    component: ThemeToggle,
    tags: ['autodocs'],
    argTypes: {
      
    },
    render: template
  });
</script>

{#snippet template(args)}
  <ThemeToggle {...args} />
{/snippet}

<Story name="Default" />