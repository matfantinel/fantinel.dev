<script lang="ts">
  import LinkIcon from '@icons/link.svelte';
  import { copyToClipboard } from '@svelte-put/copy';

  let {
    anchor,
    title
  } : {
    anchor: string;
    title: string;
  } = $props();

  function onclick(event: MouseEvent) {
    event.preventDefault();
    const fullUrl = `${window.location.origin}${window.location.pathname}#${anchor}`;
    copyToClipboard(fullUrl);
  }

</script>

<a
  class="a-anchor-link-indicator"
  href={`#${anchor}`}
  title={title}
  aria-label={title}
  {onclick}
>
  <LinkIcon size="20px" />
</a>

<style lang="scss">
  .a-anchor-link-indicator {
    display: inline-block;
		text-decoration: none;
		margin-left: var(--spacing-xs);
		height: 20px;
		width: 20px; 
  }
</style>