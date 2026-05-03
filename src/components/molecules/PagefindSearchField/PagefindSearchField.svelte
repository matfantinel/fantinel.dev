<script lang="ts">
  import ChevronRight from '@assets/icons/chevron-right.svelte';
  import Field from '../Field/Field.svelte';

  let {
    id,
    value,
    onsubmit,
    class: className,
    ...props
  }: {
    id?: string;
    value?: string;
    onsubmit?: (event: Event) => void;
    class?: string;
    [key: string]: any;
  } = $props();

  let hasValue = $state(value);
  let classList = ['m-pagefind-search-field', className];

  $effect(() => {
    hasValue = value;
  });

  const handleReset = () => {
    value = '';
  };
</script>

<!-- Hide if JavaScript is disabled -->
<noscript style="display: none;">
  <style>
    .m-pagefind-search-field {
      display: none !important;
    }
  </style>
</noscript>

<form
  class={classList}
  class:m-pagefind-search-field--has-value={hasValue}
  action="/search"
  method="get"
  data-astro-reload
  {onsubmit}
  {...props}
>
  <Field
    id="pagefind-search"
    bind:value
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
  <input
    class="m-pagefind-search-field__clear"
    type="reset"
    value="Clear"
    aria-label="Clear search"
    onclick={handleReset}
  />
</form>

<style lang="scss">
  @use '/src/styles/typography';

  .m-pagefind-search-field {
    width: min(280px, 100%);
    position: relative;
    container-type: inline-size;

    :global(.m-field__input) {
      padding-right: min(100px, 33%);

      -webkit-appearance: none;
      appearance: none;

      /* clears the 'X' from Chrome */
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

    &__submit,
    &__clear {
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
      transition: all 0.15s ease;
      padding: var(--spacing-xxs);
      color: var(--t-v6--text--medium);

      &:hover {
        box-shadow: inset var(--t-v6--accent--glow);
        color: var(--t-v6--input--text--value);
      }
    }

    &__clear {
      display: none;
      right: 50px;
    }

    &--has-value {
      .m-pagefind-search-field__clear {
        @container (min-width: 201px) {
          display: flex;
        }
      }
    }
  }
</style>
