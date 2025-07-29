<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { QuickReviewType } from '@schemas/quick-review-types';

  import QuickReviewTypeTag from './QuickReviewTypeTag.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Quick Review Type Tag',
    component: QuickReviewTypeTag,
    tags: ['autodocs'],
    argTypes: {
      type: {
        control: { type: 'select' },
        options: Object.values(QuickReviewType),
      },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <QuickReviewTypeTag {...args}>{args.children ?? 'Tag'}</QuickReviewTypeTag>
{/snippet}

<Story name="Movie" args={{ type: 'Movie' }} />
<Story name="TV Show" args={{ type: 'TV Show' }} />
<Story name="Game" args={{ type: 'Game' }} />
<Story name="Album" args={{ type: 'Album' }} />