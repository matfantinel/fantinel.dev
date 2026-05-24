<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Stack from './Stack.svelte';
  import PolaroidCard from '@components/molecules/PolaroidCard';

  const { Story } = defineMeta({
    title: 'Molecules/Stack',
    component: Stack,
    tags: ['autodocs'],
    argTypes: {},
    render: template
  });
</script>

{#snippet template(args)}
  <div style="height: 420px; width: 420px;">
    <Stack {...args}>
      {@render args.children?.()}
    </Stack>
  </div>
{/snippet}

{#snippet childrenthree()}
  <PolaroidCard title="First Card" image="https://placedog.net/400/400" imageAlt="Cute dog 1" />
  <PolaroidCard title="Second Card" image="https://placedog.net/401/401" imageAlt="Cute dog 2" />
  <PolaroidCard title="Third Card" image="https://placedog.net/402/402" imageAlt="Cute dog 3" />
{/snippet}

{#snippet childrensix()}
  <PolaroidCard title="First Card" image="https://placedog.net/400/400" imageAlt="Cute dog 1" />
  <PolaroidCard title="Second Card" image="https://placedog.net/401/401" imageAlt="Cute dog 2" />
  <PolaroidCard title="Third Card" image="https://placedog.net/402/402" imageAlt="Cute dog 3" />
  <PolaroidCard title="Fourth Card" image="https://placedog.net/403/403" imageAlt="Cute dog 4" />
  <PolaroidCard title="Fifth Card" image="https://placedog.net/404/404" imageAlt="Cute dog 5" />
  <PolaroidCard title="Sixth Card" image="https://placedog.net/405/405" imageAlt="Cute dog 6" />
{/snippet}

<Story name="With PolaroidCards" args={{ itemCount: 3, children: childrenthree }} />
<Story name="With PolaroidCards (6 items)" args={{ itemCount: 6, children: childrensix }} />
