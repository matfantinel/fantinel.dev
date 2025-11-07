<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import CoolLinkStamp from './CoolLinkStamp.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Cool Link Badge',
    component: CoolLinkStamp,
    tags: ['autodocs'],
    argTypes: {
      date: { control: 'text' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CoolLinkStamp {...args}></CoolLinkStamp>
{/snippet}

<Story name="Default" args={{ date: '2025-01-01' }} />
<Story name="No Date" args={{}} />