<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';

    import TypewriterEffect from './TypewriterEffect.svelte';

    const { Story } = defineMeta({
        title: 'Atoms/Typewriter Effect',
        component: TypewriterEffect,
        tags: ['autodocs'],
        argTypes: {
            script: { control: 'object' },
            paused: { control: 'boolean' },
            class: { control: false },
        },
        render: template
    });
</script>

{#snippet template(args)}
    <TypewriterEffect
        script={args.script ?? [
            { text: 'Ao verme que primeiro roeu as frias carnes ' },
            { text: 'do meu cadáver, dedico como saudosa lembrança ' },
            { text: 'estas memórias póstumas.' }
        ]}
        {...args}
    />
{/snippet}

<Story
    name="Default"
    args={{}}
/>

<Story
  name="With Typos"
  args={{
    script: [
      { text: 'Ao verme que primeiro roeu as ', typo: 'fraias cranes', fix: 'frias carnes ' },
      { text: 'do meu cadáver, dedico como saudosa ', typo: 'lembrranaç', fix: 'lembrança ' },
      { text: 'estas memórias póstumas.' }
    ]
  }}
/>