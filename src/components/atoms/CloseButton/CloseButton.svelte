<script lang="ts">
  import CloseIcon from '@assets/icons/close.svelte';
  import IconLink from '@components/atoms/IconLink';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type CloseButtonProps = BaseProps & {
    slug?: string;
    onclick?: EventListener;
  };

  let {
    class: className,
    slug,
    children,
    ...props
  }: CloseButtonProps & { children?: Snippet } = $props();

  let classList = $derived(['a-close-button', className]);
</script>

{#snippet closeIconSnippet()}<CloseIcon />{/snippet}
<IconLink class={classList.join(' ')} icon={closeIconSnippet} commandfor={slug} command="close" {...props}>
  Close
</IconLink>
