<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Pagination from './Pagination.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
      totalPages: { control: 'number' },
      currentPage: { control: 'number' },
      baseUrl: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Pagination
    totalPages={args.totalPages}
    currentPage={args.currentPage}
    baseUrl={args.baseUrl || '/blog'}
    {...args}
  />
{/snippet}

<Story
  name="First Page"
  args={{
    totalPages: 10,
    currentPage: 1,
    baseUrl: '/blog',
  }}
/>

<Story
  name="Middle Page"
  args={{
    totalPages: 10,
    currentPage: 5,
    baseUrl: '/blog',
  }}
/>

<Story
  name="Last Page"
  args={{
    totalPages: 10,
    currentPage: 10,
    baseUrl: '/blog',
  }}
/>

<Story
  name="Few Pages"
  args={{
    totalPages: 3,
    currentPage: 2,
    baseUrl: '/blog',
  }}
/>
