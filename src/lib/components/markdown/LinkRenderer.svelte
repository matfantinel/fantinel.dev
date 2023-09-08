<script lang="ts">
	export let text: string;
	export let href: string;

	const target = href.startsWith('#') ? '_self' : '_blank';
</script>

<a {href} {target} rel="noopener noreferrer">{text}</a>
