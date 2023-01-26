<ul class="resume-skills">
	<li>
		Front-end
		<div class="tags-container">
			<span class="tag">React</span>
			<span class="tag">Svelte</span>
			<span class="tag">Angular</span>
			<span class="tag">Vue</span>
			<span class="tag">NextJS</span>
			<span class="tag">TypeScript</span>
			<span class="tag">Ionic</span>
			<span class="tag">Electron</span>
			<span class="tag">PWAs</span>
		</div>
	</li>
	<li>
		Other
		<div class="tags-container">
			<span class="tag secondary">Agile</span>
			<span class="tag secondary">NodeJS</span>
			<span class="tag secondary">.NET</span>
			<span class="tag secondary">Linux</span>
			<span class="tag secondary">MongoDB</span>
			<span class="tag secondary">SQL</span>
		</div>
	</li>
</ul>

<style lang="scss">
	.resume-skills {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.tags-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 2px 0 5px;
	}

	.tag {
		background-color: var(--color--primary-tint);
		border: 1px solid var(--color--primary);
		color: var(--color--primary);
		border-radius: 0.25em;
		display: inline-block;
		font-size: 0.75em;
		line-height: 2em;
		margin: 0.125em;
		padding: 0 0.5em;
		text-decoration: none;
		white-space: nowrap;

		&.secondary {
			background-color: var(--color--secondary-tint);
			border: 1px solid var(--color--secondary);
			color: var(--color--secondary);
		}
	}
</style>
