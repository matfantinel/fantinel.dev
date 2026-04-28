<script lang="ts">
  import CloseIcon from '@assets/icons/close.svelte';
  import IconLink from '@components/atoms/IconLink';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    slug,
    children,
    ...props
  }: {
    class?: string;
    slug?: string;
    children?: Snippet;
    onclick?: EventListener;
    [key: string]: any;
  } = $props();

  let classList = $derived(['a-close-button', className]);
</script>

{#snippet closeIconSnippet()}<CloseIcon />{/snippet}
<IconLink class={classList.join(' ')} icon={closeIconSnippet} commandfor={slug} command="close" {...props}>
  Close
</IconLink>
