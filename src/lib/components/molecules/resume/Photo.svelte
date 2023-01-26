<picture class="resume-photo">
	<source srcset="/images/resume-avatar-dark.png" media="(prefers-color-scheme: dark)" />
	<img height="200px" src="/images/resume-avatar.png" alt="Matheus Fantinel's Avatar" />
</picture>

<style lang="scss">
	.resume-photo {
		img {
			border-radius: 50%;
			max-width: 100%;
			max-height: 200px;
			box-sizing: border-box;
			@media (prefers-color-scheme: dark) {
				border: 3px solid var(--color--primary-shade);
			}
		}
	}
</style>
