<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import CloseButton from './CloseButton.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Close Button',
    component: CloseButton,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'This just uses the IconLink but has the close icon and "command" attributes built-in.'
        }
      }
    },
    argTypes: {
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CloseButton {...args} />
{/snippet}

<Story name="Default" />