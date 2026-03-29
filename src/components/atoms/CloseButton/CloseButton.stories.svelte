<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import CloseButton from './CloseButton.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Close Button',
    component: CloseButton,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CloseButton {...args} />
{/snippet}

<Story name="Default" />