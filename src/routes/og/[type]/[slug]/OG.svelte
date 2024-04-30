<script>
	import { siteBaseUrl } from '$lib/data/meta';

	export let text;
	export let date;
</script>

<div
	style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; background-color: #f4f8fb; font-family: Fixel;"
>
	<div
		style="background-image: url(http://localhost:5173/images/opengraph-background.png); background-size: 1200px 630px; background-repeat: no-repeat; position: absolute; width: 100%; height: 100%;"
	/>
	<h1
		style="padding: 40px; font-size: 90px; line-height: 1.5; z-index: 1; text-wrap: balance; font-family: Fixel Black;"
	>
		{text}
	</h1>
	<div
		style="display: flex; align-items: flex-end; justify-content: space-between; position: absolute; width: 100%; bottom: 0; left: 0; z-index: 2;"
	>
		<div
			style="display: flex; margin: 20px 40px 40px; align-items: center; justify-content: space-between; gap: 40px; flex: 1;"
		>
			<img
				src="http://localhost:5173/logos/Full Logo.svg"
				alt="Logo"
				style="width: 285px; height: 50px;"
			/>
			<div
				style="display: flex; align-items: center; gap: 12px; font-size: 28px; font-weight: 600;"
			>
				<img
					src="http://localhost:5173/images/opengraph-domain-icon.svg"
					alt="Domain"
					style="width: 24px; height: 24px;"
				/>
				<span>fantinel.dev</span>
			</div>
			<div
				style="display: flex; align-items: center; gap: 12px; font-size: 28px; font-weight: 600;"
			>
				{date}
			</div>
		</div>
		<img
			src="http://localhost:5173/images/opengraph-avatar.png"
			alt="My Avatar"
			style="width: 300px; height: 300px;"
		/>
	</div>
</div>
