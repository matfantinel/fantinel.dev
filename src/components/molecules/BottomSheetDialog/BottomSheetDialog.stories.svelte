<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import BottomSheetDialog from './BottomSheetDialog.svelte';
  import Button from '@components/atoms/Button';

  const { Story } = defineMeta({
    title: 'Molecules/Bottom Sheet Dialog',
    component: BottomSheetDialog,
    tags: ['autodocs'],
    argTypes: {
      slug: { control: 'text' },
      image: { control: 'text' },
      imageAlt: { control: 'text' },
      additionalImages: { control: 'object' },
      photoDate: { control: 'date' },
      content: { control: 'text' },
      class: { control: false },
    },
    render: template,
  });
</script>

{#snippet template(args)}
  <div style="display: flex; flex-direction: column; gap: var(--spacing-md); align-items: center;">
    <Button commandfor={args.slug || 'story-dialog'} command="show-modal">Open Dialog</Button>
    <BottomSheetDialog {...args} slug={args.slug || 'story-dialog'}>
      <div>Dialog content</div>
    </BottomSheetDialog>
  </div>
{/snippet}

<Story name="Default" />
