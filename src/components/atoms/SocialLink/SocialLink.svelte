<script lang="ts">
  import IconLink from '@components/atoms/IconLink';
  import type { BaseProps } from '@utils/types';

  export type SocialLinkProps = BaseProps & {
    name: 'Mastodon' | 'GitHub' | 'LinkedIn' | 'Email' | 'RSS';
    url: string;
    label?: string;
  };

  let {
    name,
    url,
    label,
    class: className,
  }: SocialLinkProps = $props();

  const getIconName = (socialName: 'Mastodon' | 'GitHub' | 'LinkedIn' | 'Email' | 'RSS') => {
    switch (socialName) {
      case 'Mastodon':
        return 'socials/mastodon';
      case 'GitHub':
        return 'socials/github';
      case 'LinkedIn':
        return 'socials/linkedin';
      case 'Email':
        return 'socials/email';
      case 'RSS':
        return 'rss';
      default:
        return 'socials/email';
    }
  };
</script>

<div class={['m-social-link', className]}>
  <IconLink
    icon={getIconName(name)}
    href={url}
    target="_blank"
    rel="me noopener"
    title={label}
  >
    {name}
  </IconLink>
</div>