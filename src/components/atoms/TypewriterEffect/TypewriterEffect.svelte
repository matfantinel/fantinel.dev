<script lang="ts">
  import type { BaseProps } from '@utils/types';
  import {onMount} from "svelte";

  export type TypewriterEffectProps = BaseProps & {
      script: {
          text: string,
          typo?: string,
          fix?: string
      }[];
      typeSpeed?: number;
      typoPause?: number;
      backspaceSpeed?: number;
      startDelay?: number;
      paused?: boolean;
  };

  let {
      script,
      typeSpeed = 40,
      typoPause = 300,
      backspaceSpeed = 30,
      startDelay = 150,
      paused = false,
      class: className,
      ...props
  }: TypewriterEffectProps = $props();

  let isTyping = $state(false);

  const fullScript = $derived(script.map(scriptLine => {
    return scriptLine.text + (scriptLine.fix ?? '')
  }).join(''));

  const hasTypos = $derived(script.some(scriptLine => scriptLine.typo));

  let el: HTMLElement;

  function typeChar(char: string) {
      return new Promise<void>(resolve => {
         setTimeout(() => {
             el.textContent += char;
             resolve();
         }, typeSpeed);
      });
  }

  async function typeWord(word: string) {
      for (const char of word) await typeChar(char);
  }

  function backspace() {
      return new Promise<void>(resolve => {
          setTimeout(() => {
              el.textContent = el.textContent.slice(0, -1);
              resolve();
          }, backspaceSpeed);
      });
  }

  export async function startTyping() {
      if (isTyping) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      isTyping = true;
      for (const step of script) {
          if (step.text) await typeWord(step.text);

          if (step.typo) {
              await typeWord(step.typo);
              await new Promise(r => setTimeout(r, typoPause));
              for (let i = 0; i < step.typo.length; i++) {
                  await backspace();
              }
              await typeWord(step.fix);
          }
      }
      isTyping = false;
  }

  onMount(() => {
     if (!paused) {
         setTimeout(startTyping, startDelay ?? 0);
     }
  });

  $effect(() => {
      if (!paused) {
          setTimeout(startTyping, startDelay ?? 0);
      }
  });

  let classList = $derived([
    'a-typewriter-effect',
    hasTypos ? 'a-typewriter-effect--has-typos' : '',
    className,
  ]);
</script>

<div class={classList} {...props}>
    <div class="a-typewriter-effect__accessible" class:is-typing={isTyping}>{fullScript}</div>
    <div class="a-typewriter-effect__content-wrapper">
        <div class="a-typewriter-effect__content" bind:this={el} aria-hidden="true"></div>
        <span class="a-typewriter-effect__cursor" class:is-typing={isTyping}></span>
    </div>
    <noscript>
        <style>
            .a-typewriter-effect__accessible {opacity: 1 !important;}
        </style>
    </noscript>
</div>

<style lang="scss">
  .a-typewriter-effect {
    display: grid;

    &__accessible {
      transition: .15s ease;
      opacity: 0.4;

      @media (prefers-reduced-motion: reduce) {
        opacity: 1;
      }
    }

    &__accessible,
    &__content-wrapper {
      grid-area: 1/1;
    }

    &__content {
      display: inline;
    }

    &__cursor {
      display: inline-block;
      animation: cursor-blink 1s step-end infinite;

      margin-left: -3px;
      width: 3px;
      height: 1em;
      background: currentColor;

      @keyframes cursor-blink {
        50% { opacity: 0; }
      }

      &.is-typing {
        animation: none;
        opacity: 1;
      }
    }

    &--has-typos {
      // If there's typos, keeping the accessible in the bg looks kinda bad
      .a-typewriter-effect {
        &__accessible {
          &.is-typing {
            opacity: 0;
          }
        }
      }
    }
  }
</style>
