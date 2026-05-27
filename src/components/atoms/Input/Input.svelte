<script lang="ts">
  import type { BaseProps } from '@utils/types';

  export type InputProps = BaseProps & {
    value?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
  };

  let {
    value = $bindable(),
    placeholder,
    required,
    type,
    class: className,
    ...props
  }: InputProps = $props();

  let classList = $derived(['a-input', className]);
</script>

<input class={classList} bind:value placeholder={placeholder ?? ''} {required} {type} {...props} />

<style lang="scss">
  @use '/src/styles/typography';

  .a-input {
    @include typography.b2;

    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius);

    transition: all 0.25s ease;

    width: 100%;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    border: 1px solid var(--t--input--border--empty);
    background: var(--t--input--bg--empty);
    color: var(--t--input--text--value);

    &::placeholder {
      color: var(--t--input--text--placeholder);
    }

    @media (hover: hover) {
      &:hover {
        border-color: var(--t--input--border--hover);
        border-style: solid;
      }
    }

    &:not(:placeholder-shown) {
      border-color: var(--t--input--border--filled);
      background: var(--t--input--bg--filled);
      border-style: solid;
    }

    &:focus,
    &:active {
      border-color: var(--t--input--border--active);
      background: var(--t--input--bg--active);
      border-style: dashed;
    }

    @media (hover: hover) {
      &:hover {
        // Hover background has preference over other styles,
        // so it's declared last
        background: var(--t--input--bg--hover);
      }
    }
  }
</style>
