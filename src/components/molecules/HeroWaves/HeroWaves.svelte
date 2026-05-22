<script lang="ts">
  import type { BaseProps } from '@utils/types';

  export type HeroWavesProps = BaseProps & {
    height?: number;
  };

  let { class: className, height = 64 }: HeroWavesProps = $props();

  let classList = $derived(['m-hero-waves', className]);
</script>

<div class={classList} style={`height: ${height}px`}>
  <svg viewBox="0 0 1080 {height}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path
      id="wave-1"
      opacity="0.35"
      d="M0 0V24.688C43.011 36.528 93.231 41.8453 142.2 39.6213C205.524 36.7573 264.897 21.856 328.32 19.6213C394.776 17.296 461.106 28.624 524.7 38.4266C587.043 48.0266 649.17 51.696 713.16 45.4026C745.695 42.2026 776.025 35.888 807.165 29.7546C890.541 13.3333 1001.7 -7.62133 1080 27.984V0H0Z"
      fill="var(--t-v6--surface--accent)"
    />
    <path
      id="wave-2"
      opacity="0.65"
      d="M0 0V8.432C11.7 19.6907 24.876 30.3253 42.921 38.4267C89.469 59.344 148.5 59.2 202.122 48.8426C230.157 43.4293 256.203 34.9387 282.825 27.616C319.653 17.4827 359.082 3.08267 400.572 1.12533C433.206 -0.394667 464.382 6.14933 489.312 17.9573C517.905 31.4987 545.4 51.024 582.579 56.8906C618.975 62.6453 655.794 53.3226 689.796 43.9413C723.798 34.56 757.44 23.1413 795.024 20.9813C848.781 17.8613 896.976 33.184 947.034 41.696C974.214 46.3146 1000.13 44.9866 1025.41 37.696C1045.6 31.888 1068.61 23.3333 1080 11.4347V0H0Z"
      fill="var(--t-v6--surface--accent)"
    />
    <path
      id="wave-3"
      d="M0 0V3.00266C134.937 31.4666 282.681 38.0373 428.247 22.704C466.947 18.6293 504.054 11.9733 543.096 8.59199C596.196 3.98933 644.328 15.12 692.1 27.472C745.137 41.184 797.4 50.7946 856.08 48C933.957 44.2666 1011.29 23.6213 1080 2.768V0H0Z"
      fill="var(--t-v6--surface--accent)"
    />
  </svg>
</div>

<style lang="scss">
  .m-hero-waves {
    position: absolute;
    top: 100%;
    width: 100%;

    grid-column: unset;

    svg {
      width: auto;
      height: 100%;
      max-width: unset;
      min-width: 100vw;

      path {
        will-change: transform;
        transform: translate3d(0, 0, 0);
        transform-origin: center top;

        @keyframes wave-1 {
          0%, 100% { transform: scaleY(1); }
          25% { transform: scaleY(1.15); }
          50% { transform: scaleY(0.88); }
          75% { transform: scaleY(1.08); }
        }

        @keyframes wave-2 {
          0%, 100% { transform: scaleY(1); }
          33% { transform: scaleY(0.85); }
          66% { transform: scaleY(1.18); }
        }

        @keyframes wave-3 {
          0%, 100% { transform: scaleY(1); }
          20% { transform: scaleY(1.12); }
          40% { transform: scaleY(0.82); }
          60% { transform: scaleY(1.06); }
          80% { transform: scaleY(0.9); }
        }

        &#wave-1 {
          animation: wave-1 7.75s infinite ease-in-out;
          animation-delay: 0s;
        }

        &#wave-2 {
          animation: wave-2 9.2s infinite ease-in-out;
          animation-delay: -3s;
        }

        &#wave-3 {
          animation: wave-3 6.8s infinite ease-in-out;
          animation-delay: -5.5s;
        }
      }
    }
  }
</style>
