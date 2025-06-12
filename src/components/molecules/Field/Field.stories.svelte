<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Field from './Field.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Field',
    component: Field,
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text' },
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
  <Field {...args} />
{/snippet}

<Story name="Default" args={{ label: 'Label' }} />

<Story name="Placeholder" args={{ label: 'Label', placeholder: 'Placeholder' }} />

<Story name="Value" args={{ label: 'Label', value: 'Value' }} />

<Story name="Search" args={{ label: 'Label', type: 'search', placeholder: 'Search for something...' }} />