<script>
	import { title } from '$lib/meta';
</script>

<svelte:head>
  <script type="module" src="https://cdn.jsdelivr.net/gh/matfantinel/resume@master/output/resume/resume.esm.js"></script>
  <script nomodule="" src="https://cdn.jsdelivr.net/gh/matfantinel/resume@master/output/resume/resume.js"></script>

	<title>Resume - {title}</title>
	<meta property="og:title" content="Resume - {title}" />
	<meta name="twitter:title" content="Resume - {title}" />
</svelte:head>

<div class="resume-wrapper">
	<mf-resume show-download-link="true" />
</div>

<style lang="scss">
	.resume-wrapper {
		padding: 20px 0 40px;
		min-height: 80vh;

    :global(mf-resume) {
      visibility: visible;
    }
	}
</style>
