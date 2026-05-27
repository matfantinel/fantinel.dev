<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import AnchorLinkIndicator from './AnchorLinkIndicator.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Anchor Link Indicator',
    component: AnchorLinkIndicator,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'An anchor link with an icon, usually displayed alongside a heading. Clicking it copies the anchor URL to the clipboard.'
        }
      }
    },
    argTypes: {
      anchor: { control: 'text' },
      title: { control: 'text' },
    },
    args: {
      anchor: 'example',
      title: 'Copy to clipboard'
    },
    render: template,
  });
</script>

{#snippet template(args)}
  <AnchorLinkIndicator {...args} />
{/snippet}

<Story name="Default" />