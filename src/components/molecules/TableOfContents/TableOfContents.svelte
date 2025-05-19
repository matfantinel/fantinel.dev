<script lang="ts">
  import { onMount } from 'svelte';

  let {
    headings,
    class: className,
  }: {
    headings: {
      slug: string;
      text: string;
      depth: number;
    }[];
    class?: string;
  } = $props();

  onMount(() => {
    const items = Array.from(document.querySelectorAll('.m-table-of-contents__item'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target);
            const slug = entry.target.id;
            items.forEach(item => {
              const isActive = item.getAttribute('data-slug') === slug;
              item.classList.toggle('m-table-of-contents__item--active', isActive);
            });
          }
        });
      }, {
        rootMargin: '-50%'
      }
    );

    // Observe each heading
    headings.forEach((heading) => {
      const el = document.getElementById(heading.slug);
      console.log(el);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<div class={['m-table-of-contents', className]}>
  <div class="m-table-of-contents__heading">Table of Contents</div>
  <ol class="m-table-of-contents__list">
    {#each headings as heading}
      <li class={['m-table-of-contents__item', `m-table-of-contents__item--level-${heading.depth}`]} data-slug={heading.slug}>
        <a class="m-table-of-contents__link" href={`#${heading.slug}`}>
          {heading.text}
        </a>
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .m-table-of-contents {
    background-color: var(--theme--background-card-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-sm);
    box-shadow: var(--theme--shadow-card);

    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    &__heading {
      @include typography.b1;
      color: var(--theme--text-accent-color);
    }

    &__list {
      list-style: none;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxs);
    }

    &__item {
      @include typography.b2;
      color: var(--theme--text-base-color);
      transition: scale 0.15s ease;

      margin: 0;

      &--level-3 {
        margin-left: var(--spacing-sm);
      }
      &--level-4 {
        margin-left: calc(var(--spacing-sm) * 2);
      }

      &--active {
        color: var(--theme--color-links);
        scale: 1.05;
      }
    }

    &__link {
      text-decoration-color: transparent;
      color: inherit;
      transition: color 0.2s ease-in-out;
    }
  }
</style>
