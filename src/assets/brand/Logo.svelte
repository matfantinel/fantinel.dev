<script lang="ts">
  let {
    size = '100%',
    color = 'default',
    class: className,
  }: { size?: string; color?: 'default' | 'inverted'; class?: string } = $props();

  const logoColor1 = color === 'default' ? 'var(--theme--color--logo-1)' : 'var(--theme--color--logo-1-inverted)';
  const logoColor2 = color === 'default' ? 'var(--theme--color--logo-2)' : 'var(--theme--color--logo-2-inverted)';
</script>

<div class={['logo', className]}>
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M46.4742 60.9505C50.099 62.457 54.1746 62.4639 57.8045 60.9697C61.4345 59.4754 64.3213 56.6023 65.83 52.9825L79.9872 19.0141C76.3624 17.5075 72.2868 17.5006 68.6569 18.9949C65.027 20.4891 62.1402 23.3622 60.6316 26.9821L46.4742 60.9505Z"
      fill={logoColor2}
    />
    <path
      d="M23.063 60.9512C26.6878 62.4579 30.7634 62.4648 34.3933 60.9705C38.0233 59.4763 40.9101 56.6032 42.4187 52.9833L56.5759 19.0149C52.9511 17.5083 48.8755 17.5013 45.2457 18.9956C41.6158 20.4899 38.729 23.3629 37.2203 26.9828L23.063 60.9512Z"
      fill={logoColor2}
    />
    <path
      d="M2.65905 54.5325C3.44399 52.6507 4.08573 50.718 4.70448 48.78C5.00857 47.7949 5.51189 46.8826 6.18328 46.0997C6.85467 45.3167 7.67983 44.6798 8.60769 44.2281C9.53556 43.7765 10.5464 43.52 11.5776 43.4742C12.6087 43.4285 13.6384 43.5945 14.6027 43.9622C15.5669 44.33 16.4455 44.8913 17.1837 45.6118C17.922 46.3322 18.5043 47.1962 18.8947 48.1505C19.2849 49.1048 19.4751 50.1289 19.4531 51.1594C19.4311 52.19 19.1975 53.2051 18.7668 54.1418C18.4783 54.7941 18.0996 55.4026 17.6419 55.9497C15.6788 58.6255 12.8718 60.5645 9.67196 61.4545C6.47216 62.3446 3.06557 62.1342 0 60.857L2.65905 54.5325Z"
      fill={logoColor1}
    />
    <path
      d="M30.3838 25.4644C29.5989 27.3462 28.9572 29.279 28.3384 31.217C28.0344 32.2021 27.531 33.1142 26.8596 33.8972C26.1882 34.6802 25.363 35.3172 24.4352 35.7688C23.5073 36.2204 22.4965 36.477 21.4653 36.5228C20.4341 36.5685 19.4045 36.4024 18.4402 36.0348C17.476 35.667 16.5974 35.1056 15.8592 34.3852C15.121 33.6648 14.5386 32.8006 14.1484 31.8464C13.758 30.8921 13.5678 29.8681 13.5898 28.8374C13.6118 27.8069 13.8454 26.7918 14.2761 25.855C14.5646 25.2029 14.9433 24.5944 15.4012 24.0473C17.3641 21.3714 20.1712 19.4325 23.3709 18.5424C26.5708 17.6524 29.9773 17.8628 33.0429 19.1398L30.3838 25.4644Z"
      fill={logoColor1}
    />
  </svg>
</div>

<style lang="scss">
  .logo {
    position: relative;
    isolation: isolate;

    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        var(--color--pink),
        var(--color--mauve),
        var(--color--red),
        var(--color--maroon),
        var(--color--peach),
        var(--color--yellow),
        var(--color--green),
        var(--color--teal),
        var(--color--sky),
        var(--color--sapphire),
        var(--color--blue),
        var(--color--lavender)
      );

      filter: blur(20px);
      transition: all 0.25s ease-out;
      opacity: 0.4;
      scale: 0.8;
      will-change: transform, opacity;
      transform: rotate(0deg) translate3d(0, 0, 0);

      @media (prefers-reduced-motion: no-preference) {
        animation: rotate 4s linear infinite;
      }
    }

    @media (hover: hover) {
      &:hover {
        filter: drop-shadow(var(--theme--shadow-card));

        &:before {
          opacity: 0.7;
          scale: 1;
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    to {
      transform: rotate(360deg) translate3d(0, 0, 0);
    }
  }
</style>
