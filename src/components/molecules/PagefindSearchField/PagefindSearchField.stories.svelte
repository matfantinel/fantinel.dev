<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import PagefindSearchField from './PagefindSearchField.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Pagefind Search Field',
    component: PagefindSearchField,
    tags: ['autodocs'],
    argTypes: {
      value: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <div style="container-type:inline-size;width: 100%;">
  <PagefindSearchField
    {...args}
  />
  </div>
{/snippet}

<Story
  name="Default"
  args={{}}
/>

<Story
  name="With Value"
  args={{
    value: 'svelte',
  }}
/>

