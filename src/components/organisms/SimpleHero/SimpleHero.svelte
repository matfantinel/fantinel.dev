<script lang="ts">
  let {
    title,
    body,
    children,
    class: className,
  }: {
    title: string;
    body?: string;
    children?: any;
    class?: string;
  } = $props();
</script>

<div class={['o-simple-hero', className]}>
  <div class="o-simple-hero__container u-container-small">
    <div class="o-simple-hero__content">
      <h1 class="o-simple-hero__title">
        {title}
      </h1>

      {#if body}
        <p class="o-simple-hero__body">
          {body}
        </p>
      {/if}

      {#if children}
        {@render children()}
      {/if}
    </div> 
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-simple-hero {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);

      padding-block: var(--spacing-xxl);

      @include breakpoints.for-phone-only {
        padding-block: var(--spacing-xl);
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      max-width: 620px;
    }

    &__title {
      @include typography.h1;
      color: var(--theme--color-accent);
      text-align: center;
      text-wrap: balance;
      animation: var(--theme--glowing-text-animation);
    }

    &__body {
      @include typography.b1;
      text-align: center;
    }
  }  
</style>
