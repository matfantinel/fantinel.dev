<script>
	import { siteBaseUrl } from '$lib/data/meta';

	export let text;
	export let date;
</script>

<div id="main">
	<div
		id="background"
		style:background-image={`url(${siteBaseUrl}/images/opengraph-background.png)`}
	/>
	<h1>
		{text}
	</h1>
	<div id="bottom">
		<div id="list">
			<img
				src={`${siteBaseUrl}/logos/Full Logo.svg`}
				alt="Logo"
				style="width: 285px; height: 50px;"
			/>
			<div id="site-domain">
				<img
					src={`${siteBaseUrl}/images/opengraph-domain-icon.svg`}
					alt="Domain"
					style="width: 24px; height: 24px;"
				/>
				<span>fantinel.dev</span>
			</div>
			<div id="date" style:color={date ? 'inherit' : 'transparent'}>
				{date ?? 'DD Mon YYYY'}
			</div>
		</div>
		<img src={`${siteBaseUrl}/images/opengraph-avatar.png`} alt="My Avatar" id="avatar" />
	</div>
</div>

<style>
	#main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #f4f8fb;
		font-family: Fixel;
	}

	#background {
		background-size: 1200px 630px;
		background-repeat: no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
	}

	h1 {
		padding: 40px;
		font-size: 90px;
		line-height: 1.5;
		z-index: 1;
		text-wrap: balance;
		font-family: Fixel Black;
	}

	#bottom {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	#list {
		display: flex;
		margin: 20px 40px 40px;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		flex: 1;
	}

	#site-domain {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 28px;
		font-weight: 600;
	}

	#date {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 28px;
		font-weight: 600;
	}

	#avatar {
		width: 300px;
		height: 300px;
	}
</style>
