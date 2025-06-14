<script lang="ts">
  import Field from '../Field/Field.svelte';

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

  let classList = ['m-pagefind-search-field', expandable ? 'm-pagefind-search-field--expandable' : '', className];
</script>

<!-- Hide if JavaScript is disabled -->
<noscript style="display: none;">
  <style>
    .m-pagefind-search-field {
      display: none !important;
    }
  </style>
</noscript>

<form class={classList} action="/search" method="get">
  <Field
    id="pagefind-search"
    {value}
    placeholder="Search"
    required
    type="search"
    name="search"
    aria-label="Type anything to search the site"
    class={className}
    {...props}
  />
</form>

<style lang="scss">
  @use '/src/styles/breakpoints';
  
  .m-pagefind-search-field {
    @include breakpoints.for-tablet-portrait-up {
      &--expandable {
        width: 54px;
        transition: all 0.2s cubic-bezier(0.3, 0.8, 0.4, 1);

        &:focus-within {
          width: 180px;

          :global(.m-field__input) {
            padding-left: var(--spacing-xl);
          }
        }

        :global(.m-field__input) {
          padding-inline: var(--spacing-md);
        }
      }
    }
  }
</style>
