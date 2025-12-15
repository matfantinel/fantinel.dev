<script lang="ts">
  let {
    class: className,
    opacity = 0.5,
    forceGray = false,
    invertWaveColors = false,
  }: { class?: string; opacity?: number; forceGray?: boolean; invertWaveColors?: boolean } = $props();

  let classList = $derived(['footer-waves', forceGray ? 'footer-waves--force-gray' : '', className]);

  let fills = $derived(invertWaveColors ? [
    'var(--theme--color-footer--wave-4)',
    'var(--theme--color-footer--wave-3)',
    'var(--theme--color-footer--wave-2)',
    'var(--theme--color-footer--wave-1)',
  ] : [
    'var(--theme--color-footer--wave-1)',
    'var(--theme--color-footer--wave-2)',
    'var(--theme--color-footer--wave-3)',
    'var(--theme--color-footer--wave-4)',
  ]);
</script>

<svg
  class={classList}
  width="1505"
  height="399"
  viewBox="0 0 1505 399"
  fill="none"
  preserveAspectRatio="xMidYMin slice"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_285_1956)">
    <g {opacity}>
      <path
        class="footer-wave-1"
        d="M0 104.217C128.267 104.217 247.983 0 376.25 0C504.517 0 624.232 104.217 752.499 104.217C880.766 104.217 1000.48 0 1128.75 0C1257.02 0 1376.73 104.217 1505 104.217V358.971H0V104.217Z"
        fill={fills[0]}
      />
      <path
        class="footer-wave-2"
        d="M0 121.587C128.267 121.587 247.983 17.3695 376.25 17.3695C504.517 17.3695 624.232 121.587 752.499 121.587C880.766 121.587 1000.48 17.3695 1128.75 17.3695C1257.02 17.3695 1376.73 121.587 1505 121.587V376.34H0V121.587Z"
        fill={fills[1]}
      />
      <path
        class="footer-wave-3"
        d="M0 133.166C128.267 133.166 247.983 28.9491 376.25 28.9491C504.517 28.9491 624.232 133.166 752.499 133.166C880.766 133.166 1000.48 28.9491 1128.75 28.9491C1257.02 28.9491 1376.73 133.166 1505 133.166V387.92H0V133.166Z"
        fill={fills[2]}
      />
      <path
        class="footer-wave-4"
        d="M0.000976562 144.747C128.268 144.747 247.984 40.5292 376.251 40.5292C504.518 40.5292 624.233 144.747 752.5 144.747C880.767 144.747 1000.48 40.5292 1128.75 40.5292C1257.02 40.5292 1376.73 144.747 1505 144.747V399.5H0.000976562V144.747Z"
        fill={fills[3]}
      />
    </g>
  </g>
  <defs>
    <clipPath id="clip0_285_1956">
      <rect width="1505" height="399.5" fill="white" />
    </clipPath>
  </defs>
</svg>

<style lang="scss">
  svg {
    path {
      will-change: transform;
      transform: translate3d(0, 0, 0);

      &:nth-child(1) {
        animation: floating 7.75s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &:nth-child(2) {
        animation: floating 8.5s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &:nth-child(3) {
        animation: floating 7.5s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &:nth-child(4) {
        animation: floating 6.5s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }
    }
  }
</style>
