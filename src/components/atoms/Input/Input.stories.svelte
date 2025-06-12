<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Input from './Input.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
      value: { control: 'text' },
      placeholder: { control: 'text' },
      required: { control: 'boolean' },
      type: { control: 'select', options: ['text', 'email', 'password', 'search'] },
      name: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Input {...args} />
{/snippet}

<Story name="Default" />

<Story name="Placeholder" args={{ placeholder: 'Placeholder' }} />

<Story name="Value" args={{ value: 'Value' }} />

<Story name="Search" args={{ type: 'search', placeholder: 'Search for something...' }} />