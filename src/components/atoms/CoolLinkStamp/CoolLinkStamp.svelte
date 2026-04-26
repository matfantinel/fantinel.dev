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
  let randomOpacity = $derived(0.7 + Math.random() * 0.2); // Random between 0.7 and 0.9
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

      border: 2px dashed var(--t-v6--cool-link);
      border-radius: var(--border-radius--small);
      background-color: rgba(var(--t-v6--cool-link--rgb), 0.15);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.12' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
      box-shadow: var(--t-v6--shadow--base);
      backdrop-filter: blur(10px);
      color: var(--t-v6--cool-link);

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
      color: var(--t-v6--cool-link);
      filter: drop-shadow(var(--t-v6--cool-link--glow-tiny));
    }
  }
</style>
