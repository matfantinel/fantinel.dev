<script lang="ts">
  import IconLink from '@components/atoms/IconLink';
  import Mastodon from '@assets/icons/socials/mastodon.svelte';
  import GitHub from '@assets/icons/socials/github.svelte';
  import LinkedIn from '@assets/icons/socials/linkedin.svelte';
  import Email from '@assets/icons/socials/email.svelte';
  import Rss from '@assets/icons/rss.svelte';

  let {
    name,
    url,
    label,
    class: className,
  }: {
    name: string;
    url: string;
    label?: string;
    class?: string;
  } = $props();

  const getIconSnippet = (socialName: string) => {
    switch (socialName) {
      case 'Mastodon':
        return mastodonIconSnippet;
      case 'GitHub':
        return githubIconSnippet;
      case 'LinkedIn':
        return linkedinIconSnippet;
      case 'Email':
        return emailIconSnippet;
      case 'RSS':
        return rssIconSnippet;
      default:
        return emailIconSnippet;
    }
  };
</script>

{#snippet mastodonIconSnippet()}<Mastodon />{/snippet}
{#snippet githubIconSnippet()}<GitHub />{/snippet}
{#snippet linkedinIconSnippet()}<LinkedIn />{/snippet}
{#snippet emailIconSnippet()}<Email />{/snippet}
{#snippet rssIconSnippet()}<Rss />{/snippet}

<div class={['m-social-link', className]}>
  <IconLink
    icon={getIconSnippet(name)}
    href={url}
    target="_blank"
    rel="me noopener noreferrer"
    title={label}
  >
    {name}
  </IconLink>
</div>