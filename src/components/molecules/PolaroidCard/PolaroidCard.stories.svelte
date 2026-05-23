<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import PolaroidCard from './PolaroidCard.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Polaroid Card',
    component: PolaroidCard,
    tags: ['autodocs'],
    argTypes: {},
    render: template,
  });
</script>

{#snippet template(args)}
  <div style="height: 420px;">
    <PolaroidCard title="Cute dog" image="https://placedog.net/400/400" imageAlt="Cute dog" {...args} />
  </div>
{/snippet}

<Story name="Default" />

<Story name="With back details" args={{ content: LoremIpsum.sentence, photoDate: new Date() }} />
