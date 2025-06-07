<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Footer from './Footer.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Footer',
    component: Footer,
    tags: ['autodocs'],
    argTypes: {
      
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Footer {...args} />
{/snippet}

<Story name="Default" />