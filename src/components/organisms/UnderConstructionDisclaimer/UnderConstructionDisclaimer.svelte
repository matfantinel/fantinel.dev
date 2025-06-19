<script lang="ts">
  import ConstructionIcon from '@assets/icons/construction.svelte';

  let {
    class: className,
  }: {
    class?: string;
  } = $props();
</script>

<div class={['o-under-construction-disclaimer', 'u-container', className]}>
  <div class="o-under-construction-disclaimer__container">
    <div class="o-under-construction-disclaimer__content">
      <h2 class="o-under-construction-disclaimer__heading">Under Construction!</h2>
      <div class="o-under-construction-disclaimer__body u-markdown">
        <p>Things might look a little wonky or keep changing - that’s because this site is still under construction. I’m probably tinkering with something <em>right now</em>.</p>

        <p>You're still welcome to look around, though!</p>
      </div>
    </div>
    <div class="o-under-construction-disclaimer__symbol">
      <ConstructionIcon size="120px" />
    </div>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-under-construction-disclaimer {
    container-type: inline-size;

    &__container {
      display: grid;
      grid-template-columns: 1fr 254px;
      align-items: center;
      gap: var(--spacing-lg) var(--spacing-xl);

      padding: var(--spacing-lg) var(--spacing-xl);
      background-color: var(--theme--background-card-color);
      border-radius: var(--border-radius);
      box-shadow: var(--theme--shadow-card);
      border: 1px dashed var(--color--yellow);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    &__heading {
      @include typography.gradient-yellowish;
    }

    &__body {
      @include typography.b2;
      gap: var(--spacing-sm);
      text-align: left;
    }

    &__symbol {
      font-size: 124px;
      display: grid;
      place-items: center;
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        &__container {
          padding: var(--spacing-lg);
          grid-template-columns: 1fr;
        }
        &__symbol {
          grid-row: 1;
        }
      }
    }
  }
</style>
