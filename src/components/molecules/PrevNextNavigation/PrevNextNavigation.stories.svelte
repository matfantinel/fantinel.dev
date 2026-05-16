<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import PrevNextNavigation from './PrevNextNavigation.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Prev Next Navigation',
    component: PrevNextNavigation,
    tags: ['autodocs'],
    argTypes: {
      prev: { control: 'object' },
      next: { control: 'object' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PrevNextNavigation {...args} />
{/snippet}

<Story
  name="Both"
  args={{
    next: { label: 'April 2026', url: '#' },
    prev: { label: 'February 2026', url: '#' },
  }}
/>

<Story
  name="Reverse Order"
  args={{
    next: { label: 'April 2026', url: '#' },
    prev: { label: 'February 2026', url: '#' },
    order: 'reverse',
  }}
/>

<Story
  name="Next Only"
  args={{
    next: { label: 'April 2026', url: '#' },
  }}
/>

<Story
  name="Prev Only"
  args={{
    prev: { label: 'February 2026', url: '#' },
  }}
/>
