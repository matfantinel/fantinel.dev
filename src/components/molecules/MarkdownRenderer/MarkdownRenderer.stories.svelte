<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import MarkdownRenderer from '.';

  const { Story } = defineMeta({
    title: 'Molecules/Markdown Renderer',
    component: MarkdownRenderer,
    tags: ['autodocs'],
    argTypes: {
      content: { control: 'text' },
      isInline: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <div class="u-markdown">
    <MarkdownRenderer content={args.content ?? LoremIpsum.mdCode} {...args} />
  </div>
{/snippet}

<Story name="Default" args={{ content: LoremIpsum.mdCode }} />