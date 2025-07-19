<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import QuickReviewTypeTag from './QuickReviewTypeTag.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Quick Review Type Tag',
    component: QuickReviewTypeTag,
    tags: ['autodocs'],
    argTypes: {
      type: {
        control: { type: 'select' },
        options: ['Movie', 'TVShow', 'Game', 'Album'],
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
<Story name="TV Show" args={{ type: 'TVShow' }} />
<Story name="Game" args={{ type: 'Game' }} />
<Story name="Album" args={{ type: 'Album' }} />