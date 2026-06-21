<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://townsquare.cauenapier.com/widget.css';
    link.onload = () => {
      const el = document.getElementById('townsquare-root');
      if (el) el.style.display = 'block';
      console.log('TownSquare loaded');
    };
    document.head.appendChild(link);

    // @ts-ignore
    import('https://townsquare.cauenapier.com/townsquare.mjs').then((mod) => {
      mod.mountTownSquare(document.getElementById('townsquare-root'), {
        serverOrigin: 'https://townsquare.cauenapier.com',
        siteKey: 'site_k_9oCjUr9qDV93xm',
        scene: {
          benches: 3,
          benchXs: [0.2, 0.72, 0.64],
          trees: 2,
          treeXs: [0.8, 0.3],
          lamps: 3,
          lampXs: [0.16, 0.68, 0.44],
          birds: 3,
        },
        theme: 'host',
      });
    });
  });
</script>

<div id="townsquare-root" style="display: none;"></div>
