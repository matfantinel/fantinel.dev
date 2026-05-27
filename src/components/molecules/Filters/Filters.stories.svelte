<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { FilterGroup } from '@schemas/filter';

  import Filters from './Filters.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Filters',
    component: Filters,
    tags: ['autodocs'],
    argTypes: {
      heading: { control: 'text' },
      filterGroups: { control: 'object' },
      class: { control: false },
    },
    render: template
  });

  const basicFilterGroups: FilterGroup[] = [
    {
      label: 'Filter by category:',
      tags: [
        { name: 'Web Development', url: '/blog/category/web-development', count: 12 },
        { name: 'Design', url: '/blog/category/design', count: 8, active: true },
        { name: 'JavaScript', url: '/blog/category/javascript', count: 15 },
        { name: 'CSS', url: '/blog/category/css', count: 10 },
      ],
    },
    {
      label: 'Filter by date:',
      tags: [
        { name: 'January 2026', url: '/blog/date/2026-01', count: 5 },
        { name: 'December 2025', url: '/blog/date/2025-12', count: 8 },
        { name: 'November 2025', url: '/blog/date/2025-11', count: 6 },
      ],
    },
  ];

  const nestedFilterGroups: FilterGroup[] = [
    {
      label: 'Filter by category:',
      tags: [
        { name: 'Web Development', url: '/blog/category/web-development', count: 12 },
        { name: 'Design', url: '/blog/category/design', count: 8 },
      ],
    },
    {
      label: 'Filter by date:',
      groups: [
        {
          label: '2026',
          tags: [
            { name: 'February', url: '/blog/date/2026-02', count: 3 },
            { name: 'January', url: '/blog/date/2026-01', count: 5, active: true },
          ],
        },
        {
          label: '2025',
          tags: [
            { name: 'December', url: '/blog/date/2025-12', count: 8 },
            { name: 'November', url: '/blog/date/2025-11', count: 6 },
            { name: 'October', url: '/blog/date/2025-10', count: 4 },
          ],
        },
      ],
    },
  ];

  const singleGroup: FilterGroup[] = [
    {
      label: 'Filter by category:',
      tags: [
        { name: 'Web Development', url: '/blog/category/web-development', count: 12 },
        { name: 'Design', url: '/blog/category/design', count: 8, active: true },
        { name: 'JavaScript', url: '/blog/category/javascript', count: 15 },
      ],
    },
  ];
</script>

{#snippet template(args)}
  <Filters {...args} />
{/snippet}

<Story name="Basic" args={{ filterGroups: basicFilterGroups }} />

<Story name="With Heading" args={{ heading: 'Filter Posts', filterGroups: basicFilterGroups }} />

<Story name="Nested Groups" args={{ heading: 'Filter Posts', filterGroups: nestedFilterGroups }} />

<Story name="Nested Groups, Collapsed" args={{ heading: 'Filter Posts', filterGroups: nestedFilterGroups, collapseInnerGroups: true }} />

<Story name="Single Group" args={{ filterGroups: singleGroup }} />
