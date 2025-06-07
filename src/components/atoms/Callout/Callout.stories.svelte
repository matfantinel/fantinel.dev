<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import Callout from './Callout.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Callout',
    component: Callout,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' },
      type: { control: 'select', options: ['info', 'warning', 'success'] },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Callout {...args} />
{/snippet}

<Story name="Default" args={{ text: LoremIpsum.paragraph }} />

<Story name="Info" args={{ type: 'info', text: LoremIpsum.paragraph }} />
<Story name="Warning" args={{ type: 'warning', text: LoremIpsum.paragraph }} />
<Story name="Success" args={{ type: 'success', text: LoremIpsum.paragraph }} />