<script>
  export let id;
</script>
<div class="wrapper" {id}>
	<slot />
</div>

<style lang="scss">
  :root {
    --bg-color: var(--primary-light-color);
  }
	.wrapper {
		position: relative;
		display: inline-block;
    z-index: 1;

    &::before {
      content: '';
      width: calc(100% + 4px);
      background: var(--bg-color);
      height: 10px;
      position: absolute;
      bottom: 4px;
      left: -2px;
      z-index: -1;
    }
	}
</style>
