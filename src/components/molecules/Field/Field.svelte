<script lang="ts">
  import Input from '@components/atoms/Input';
  import SearchIcon from '@assets/icons/search.svelte';
  import type { BaseProps } from '@utils/types';

  export type FieldProps = BaseProps & {
    id?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    name?: string;
  };

  let {
    id,
    label,
    value = $bindable(),
    placeholder,
    required,
    type,
    name,
    class: className,
    ...props
  }: FieldProps = $props();

  let classList = $derived(['m-field', type === 'search' ? 'm-field--search' : '', className]);

  const generateRandomId = () => `input-${Math.random().toString(36).substring(2, 10)}`;
  let inputId = $derived(id ?? generateRandomId());
</script>

<fieldset class={classList}>
  {#if label}
    <label for={inputId}>{label}</label>
  {/if}
  <div class="m-field__input-container">
    {#if type === 'search'}
      <SearchIcon class="m-field__search-icon" size="20px" />
    {/if}
    <Input
      id={inputId}
      class="m-field__input"
      bind:value={value}
      placeholder={placeholder ?? ''}
      {required}
      {type}
      {name}
      {...props}
    />
  </div>
</fieldset>

<style lang="scss">
  @use '/src/styles/typography';

  .m-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);

    border: unset;
    padding: 0;

    label {
      @include typography.b2;
      color: var(--t--text--base);
    }

    &__input-container {
      position: relative;
    }

    :global(.m-field__search-icon) {
      position: absolute;
      top: 50%;
      left: var(--spacing-sm);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 1;
    }

    &--search {
      :global(.m-field__input) {
        padding-left: var(--spacing-xl);
      }
    }
  }
</style>
