<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import UnderConstructionDisclaimer from './UnderConstructionDisclaimer.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Under Construction Disclaimer',
    component: UnderConstructionDisclaimer,
    tags: ['autodocs'],
    argTypes: {},
    render: template
  });
</script>

{#snippet template(args)}
  <UnderConstructionDisclaimer {...args} />
{/snippet}

<Story 
  name="Default" 
/>