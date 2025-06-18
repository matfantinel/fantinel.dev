<script lang="ts">
  import { onMount } from 'svelte';
  import Field from '../Field/Field.svelte';
  import ChevronRight from '@assets/icons/chevron-right.svelte';

  let {
    id,
    value,
    expandable,
    class: className,
    ...props
  }: {
    id?: string;
    value?: string;
    expandable?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();

  let isExpandable = $state(expandable && !value);
  let classList = ['m-pagefind-search-field', className];

  $effect(() => {
    isExpandable = expandable && !value;
  });
</script>

<!-- Hide if JavaScript is disabled -->
<noscript style="display: none;">
  <style>
    .m-pagefind-search-field {
      display: none !important;
    }
  </style>
</noscript>

<form class={classList} class:m-pagefind-search-field--expandable={isExpandable} action="/search" method="get">
  <Field
    id="pagefind-search"
    bind:value={value}
    placeholder="Search"
    required
    type="search"
    name="search"
    aria-label="Type anything to search the site"
    class={className}
    {...props}
  />

  <button class="m-pagefind-search-field__submit" type="submit" aria-label="Submit search">
    Go<ChevronRight size="16px" />
  </button>
</form>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-pagefind-search-field {
    width: 220px;
    position: relative;

    @include breakpoints.for-tablet-portrait-up {
      &--expandable {
        width: 54px;
        transition: all 0.2s cubic-bezier(0.3, 0.8, 0.4, 1);

        &:focus-within {
          width: 220px;

          :global(.m-field__input) {
            padding-left: var(--spacing-xl);
            padding-right: var(--spacing-xl);
          }

          .m-pagefind-search-field__submit {
            display: flex;
          }
        }

        &:not(:focus-within) {
          :global(.m-field__input) {
            padding-left: var(--spacing-md);
            padding-right: var(--spacing-md);
            --theme--color-input-empty-border: transparent;
          }
        }

        .m-pagefind-search-field__submit {
          display: none;
        }
      }
    }

    :global(.m-field__input) {
      padding-right: var(--spacing-xl);
    }

    &__submit {
      @include typography.icon-label;
      background: transparent;
      border: none;
      cursor: pointer;
      
      position: absolute;
      top: 50%;
      right: 5px;
      translate: 0 -50%;

      display: flex;
      align-items: center;
      gap: var(--spacing-xxs);

      border-radius: var(--border-radius--small);
      transition: all .15s ease;
      padding: var(--spacing-xxs);
      color: var(--theme--text-accent-color);

      &:hover {
        background: var(--theme--color-input-hover-background);        
      }
    }
  }
</style>
