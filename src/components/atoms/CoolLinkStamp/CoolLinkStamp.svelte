<script lang="ts">
  import CoolIcon from '@assets/icons/cool.svelte';
  import dateformat from 'dateformat';

  let {
    date,
    class: className,
  }: {
    date?: string;
    class?: string;
  } = $props();

  let classList = $derived(['a-cool-link-stamp', className]);
  let randomOpacity = $derived(0.8 + Math.random() * 0.2); // Random between 0.8 and 1.0
</script>

<div class={classList} style="opacity: {randomOpacity}">
  <div class="a-cool-link-stamp__main">
    <div class="a-cool-link-stamp__icon">
      <CoolIcon size="36px" />
    </div>
    <span class="a-cool-link-stamp__text">Cool Link</span>
  </div>
  {#if date}
    <span class="a-cool-link-stamp__date">{dateformat(date, 'yyyy-mm-dd', true)}</span>
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .a-cool-link-stamp {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    width: 110px;

    &__main {
      display: flex;
      gap: var(--spacing-xxs);
      padding: var(--spacing-xs);

      border: 2px dashed var(--color--blue);
      border-radius: var(--border-radius--small);
      background-color: rgba(var(--color--blue-rgb), 0.15);
      box-shadow: var(--theme--shadow-card);
      backdrop-filter: blur(10px);
      color: var(--color--blue);

      width: 100%;
    }

    &__icon {
      flex: 1;
    }

    &__text {
      font-family: var(--font--mono);
      font-size: 18px;
      line-height: 1;
      font-weight: 800;
      text-align: center;

      flex: 1;
    }

    &__date {
      font-family: var(--font--mono);
      font-size: 12px;
      line-height: 1;
      font-weight: 600;
      text-align: center;
      color: var(--color--blue);
      filter: drop-shadow(0px 0px 3px rgba(var(--color--blue-rgb), 0.4));
    }
  }
</style>
