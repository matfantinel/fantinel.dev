<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { animatedDetails } from 'svelte-animated-details';
  import { isInViewport } from '@utils/functions';

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

  let currentHeading = $state<string | undefined>(undefined);  

  onMount(() => {
    const items = Array.from(document.querySelectorAll('.m-table-of-contents__item'));
    const footer = document.querySelector('.o-footer') as HTMLElement;
    const toc = document.querySelector('.m-table-of-contents') as HTMLElement;

    const headingsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.id;
            items.forEach((item) => {
              const isActive = item.getAttribute('data-slug') === slug;
              item.classList.toggle('m-table-of-contents__item--active', isActive);
              currentHeading = headings.find((heading) => heading.slug === slug)?.text;
            });
          }
        });
      }
    );

    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let isStuck = entry.intersectionRatio < 1 && entry.intersectionRect.top < 10;
          const toc = document.querySelector('.m-table-of-contents');

          const previousStatus = toc?.classList.contains('m-table-of-contents--off-screen');
          toc?.classList.toggle('m-table-of-contents--off-screen', isStuck);

          const mobileToc = document.querySelector('.m-table-of-contents__accordion') as HTMLDetailsElement;
          // If it's not stuck and it was stuck before, close the mobile toc
          if (!isStuck && previousStatus) {
            mobileToc.open = false;
          }
        });
      },
      {
        threshold: [1],
      }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If footer is in the viewport, let's remove the off-screen class from toc
            toc?.classList.remove('m-table-of-contents--off-screen');
          } else {
            if (!isInViewport(toc)) {
              toc?.classList.add('m-table-of-contents--off-screen');
            }
          }
        });
      }
    );
    
    if (toc) {
      // If JS is enabled, remove the off-screen class so we can toggle it intelligently
      toc.classList.remove('m-table-of-contents--off-screen');
    }

    setTimeout(() => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.slug);
        if (el) headingsObserver.observe(el);
      });
      
      if (toc) {
        tocObserver.observe(toc);
      }
      if (footer && toc) {
        footerObserver.observe(footer);
      }
    }, 500);

    return () => {
      headingsObserver.disconnect();
      tocObserver.disconnect();
      footerObserver.disconnect();
    };
  });
</script>

<div class={['m-table-of-contents', 'm-table-of-contents--off-screen', className]}>
  <div class="m-table-of-contents__main">
    <div class="m-table-of-contents__heading">Table of Contents</div>
    <ol class="m-table-of-contents__list">
      {#each headings as heading}
        <li
          class={['m-table-of-contents__item', `m-table-of-contents__item--level-${heading.depth}`]}
          data-slug={heading.slug}
        >
          <a class="m-table-of-contents__link" href={`#${heading.slug}`}>
            {heading.text}
          </a>
        </li>
      {/each}
    </ol>
  </div>

  <details class="m-table-of-contents__accordion" aria-hidden="true" use:animatedDetails={{ duration: 250 }}>
    <summary class="m-table-of-contents__accordion-header">
      <div class="m-table-of-contents__heading">Table of Contents</div>
      {#key currentHeading}
        <div class={['m-table-of-contents__current', currentHeading ? 'm-table-of-contents__current--active' : '']} in:fade>{currentHeading ?? 'Tap to open'}</div>
      {/key}
    </summary>
    <ol class="m-table-of-contents__list">
      {#each headings as heading}
        <li
          class={['m-table-of-contents__item', `m-table-of-contents__item--level-${heading.depth}`]}
          data-slug={heading.slug}
        >
          <a class="m-table-of-contents__link" href={`#${heading.slug}`}>
            {heading.text}
          </a>
        </li>
      {/each}
    </ol>
  </details>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-table-of-contents {
    background: var(--theme--background-accent-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius--small);

    @include breakpoints.for-tablet-portrait-up {
      overflow: hidden;
      background-color: var(--theme--background-card-color);
      border-radius: var(--border-radius);
      padding: var(--spacing-sm);
      box-shadow: var(--theme--shadow-card);
    }

    &__main {
      display: flex;
      flex-direction: column;
    }

    &__heading {
      @include typography.b1;
      color: var(--theme--text-accent-color);
    }    

    &__list {
      list-style: none;
      margin: 0;
      margin-top: var(--spacing-sm);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxs);
      padding-bottom: var(--spacing-sm);
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
        @include breakpoints.for-tablet-portrait-up {
          color: var(--theme--color-links);
          scale: 1.05;
        }
      }
    }

    &__link {
      text-decoration-color: transparent;
      color: inherit;
      transition: color 0.2s ease-in-out;
    }

    &__accordion {
      display: flex;
      flex-direction: column;

      position: fixed;
      bottom: var(--spacing-sm);
      left: 50%;
      width: min(80%, 400px);
      z-index: 9;
      overflow: hidden;
      transition: all 0.25s ease;
      opacity: 0;
      translate: -50% 200%;      

      background-color: rgba(var(--theme--background-card-color-rgb), 0.8);
      backdrop-filter: blur(10px);
      border-radius: var(--border-radius);
      padding: var(--spacing-xxs) var(--spacing-sm);
      box-shadow: var(--theme--shadow-card-high);

      &:-webkit-details-marker {
        display: none;
      }

      .m-table-of-contents {
        &__item {
          &--active {
            color: var(--theme--color-links);
            scale: 1.05;
          }
        }
      }

      &[open] {
        .m-table-of-contents {
          &__accordion-header {
            &:after {
              scale: -1;
            }
          }
        }
      }
    }

    &--off-screen {
      .m-table-of-contents {
        &__accordion {
          @include breakpoints.for-phone-only {
            translate: -50% 0;
            opacity: 1;
          }
        }
      }
    }

    &__accordion-header {
      list-style: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 40px;

      position: relative;

      &:after {
        // Let's build our own custom accordion marker
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        right: 0;
        top: 50%;
        translate: 0 -50%;

        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--theme--text-base-color);
      }

      .m-table-of-contents {
        &__heading {
          @include typography.b2;
        }
      }
    }

    &__current {
      @include typography.b3;
      color: var(--theme--text-accent-color);

      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &--active {
        color: var(--theme--color-accent);
      }
    }

    &__accordion[open] {
      .m-table-of-contents {
        &__accordion-header {
          &:after {
            scale: -1;
          }
        }
      }
    }
  }
</style>
