<script lang="ts">
  let {
    value,
    placeholder,
    required,
    type,
    class: className,
    ...props
  }: {
    value?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let classList = $derived(['a-input', className]);
</script>

<input
  class={classList}
  value={value}
  placeholder={placeholder ?? ''}
  required={required}
  type={type}
  {...props}
/>

<style lang="scss">
  @use '/src/styles/typography';

  .a-input {
    @include typography.b2;
    background-color: transparent;
    border-radius: var(--border-radius);
    padding: var(--spacing-xs) var(--spacing-md);
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    background-origin: border-box;
    background-repeat: no-repeat;

    background-color: var(--theme--color-input-empty-background);
    border: 1px solid var(--theme--color-input-empty-border);
    color: var(--theme--color-input-value);
    accent-color: var(--theme--color-accent);

    transition: all .15s ease;
    
    &::placeholder {
      color: var(--theme--color-input-placeholder);
    }

    &:focus,
    &:active,
    &:not(:placeholder-shown) {
      border-color: var(--theme--color-input-filled-border);
      background-color: var(--theme--color-input-filled-background);
    }

    @media(hover: hover) {
      &:hover {
        border-color: var(--theme--color-input-hover-border);
        background-color: var(--theme--color-input-hover-background);
      }
    }    
  }
</style>
