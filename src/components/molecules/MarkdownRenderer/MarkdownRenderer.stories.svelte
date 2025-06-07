<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
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
    render: template
  });
</script>

{#snippet template(args)}
  <div class="u-markdown">
    <MarkdownRenderer content={args.content ?? LoremIpsum.mdCode} {...args} />
  </div>
{/snippet}

<Story name="Default" args={{ content: LoremIpsum.mdCode }} />