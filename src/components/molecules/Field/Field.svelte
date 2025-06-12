<script lang="ts">
  import Input from '@components/atoms/Input';
  import SearchIcon from '@assets/icons/search.svelte';

  let {
    id,
    label,
    value,
    placeholder,
    required,
    type,
    name,
    class: className,
    ...props
  }: {
    id?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    name?: string;
    class?: string;
    [key: string]: any;
  } = $props();

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
      {value}
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
      color: var(--theme--text-base-color);
    }

    &__input-container {
      position: relative;
    }

    :global(.m-field__search-icon) {
      position: absolute;
      top: 50%;
      left: var(--spacing-sm);
      transform: translateY(-50%);
    }

    &--search {
      :global(.m-field__input) {
        padding-left: var(--spacing-xl);
      }
    }
  }
</style>
