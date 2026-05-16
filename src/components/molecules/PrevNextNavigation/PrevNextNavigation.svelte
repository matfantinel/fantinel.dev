<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';

  let {
    prev,
    next,
    class: className,
  }: {
    prev?: { label: string; url: string };
    next?: { label: string; url: string };
    class?: string;
  } = $props();
</script>

<nav class={['m-prev-next-navigation', className]}>
  <div class="m-prev-next-navigation__prev">
    {#if prev}
      <ArrowLink href={prev.url} arrowPosition="left">{prev.label}</ArrowLink>
    {/if}
  </div>
  <div class="m-prev-next-navigation__next">
    {#if next}
      <ArrowLink href={next.url} arrowPosition="right">{next.label}</ArrowLink>
    {/if}
  </div>
</nav>

<style lang="scss">
  .m-prev-next-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--spacing-md);

    &__prev,
    &__next {
      flex: 1;
    }

    &__next {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
