<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';

  let {
    prev,
    next,
    order = 'regular',
    class: className,
  }: {
    prev?: { label: string; url: string };
    next?: { label: string; url: string };
    order?: 'regular' | 'reverse';
    class?: string;
  } = $props();
</script>

<nav class={['m-prev-next-navigation', order === 'reverse' ? 'm-prev-next-navigation--reverse' : '', className]}>
  <div class="m-prev-next-navigation__prev">
    {#if prev}
      <ArrowLink href={prev.url} arrowPosition={order === 'regular' ? 'left' : 'right'}>{prev.label}</ArrowLink>
    {/if}
  </div>

  <div class="m-prev-next-navigation__next">
    {#if next}
      <ArrowLink href={next.url} arrowPosition={order === 'regular' ? 'right' : 'left'}>{next.label}</ArrowLink>
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
      // flex: 1;
      display: flex;
    }

    &__next {
      justify-content: flex-end;
      :global(.a-arrow-link) {
        text-align: right;
      }
    }

    &--reverse {
      flex-direction: row-reverse;

      .m-prev-next-navigation {
        &__prev {
          display: flex;
          justify-content: flex-end;
          :global(.a-arrow-link) {
            text-align: right;
          }
        }

        &__next {
          justify-content: flex-start;
          :global(.a-arrow-link) {
            text-align: left;
          }
        }
      }
    }
  }
</style>
