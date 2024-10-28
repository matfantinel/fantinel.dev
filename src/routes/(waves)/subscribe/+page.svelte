<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import SubscribeCard from '$lib/components/molecules/SubscribeCard.svelte';
	import SubscribeNewsletterCard from '$lib/components/molecules/SubscribeNewsletterCard.svelte';
	import { siteBaseUrl, title } from '$lib/data/meta';
	import RssIcon from '$lib/icons/rss.svelte';
	import MastodonIcon from '$lib/icons/socials/mastodon.svelte';
</script>

<svelte:head>
	<title>Subscribe to {title}</title>
	<meta property="og:title" content="Subscribe to {title}" />
	<meta property="og:image" content="{siteBaseUrl}/images/subscribe.png" />
</svelte:head>

<div class="container subscribe-wrapper">
	<h1>Subscribe to my content</h1>

	<p>To subscribe and get notified whenever I post something new, there's a few options:</p>

	<div class="grid">
		<SubscribeCard title="Subscribe to RSS">
			<RssIcon slot="icon" />

			<div class="card-content">
				<a
					href="https://pluralistic.net/2024/10/16/keep-it-really-simple-stupid/#read-receipts-are-you-kidding-me-seriously-fuck-that-noise"
					target="_blank">You really should use a RSS reader.</a
				> It's the best way to subscribe to content from people you like and stay in control of what,
				when and how you read.
			</div>

			<Button
				additionalClass="button"
				href="/rss.xml"
				target="_blank"
				rel="noopener noreferrer"
				slot="button"
			>
				<RssIcon slot="icon" />
				Subscribe to RSS Feed
			</Button>
		</SubscribeCard>

		<SubscribeCard title="Follow me on Mastodon">
			<MastodonIcon slot="icon" />

			<div class="card-content">
				Whether you are on Mastodon or another part of the Fediverse, you can follow my Mastodon
				account, where I post stuff that's really different from what I usually post here. A lot of
				it is in Portuguese, by the way.
			</div>

			<Button
				additionalClass="button"
				href="https://hachyderm.io/@fantinel"
				target="_blank"
				rel="me noreferrer"
				slot="button"
				color="secondary"
			>
				<MastodonIcon slot="icon" />
				Follow on Mastodon
			</Button>
		</SubscribeCard>

		<SubscribeNewsletterCard />
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.subscribe-wrapper {
		position: relative;
		display: flex;
		gap: 10px;
		flex-direction: column;
		align-items: center;
		padding-block: 40px;
	}

	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
		margin-block: 40px;

		@include for-phone-only {
			grid-template-columns: 1fr;
		}

		// If last-child is odd, make it full width
		> :global(*:nth-child(odd):last-child) {
			grid-column: 1 / -1;
		}
	}
</style>
