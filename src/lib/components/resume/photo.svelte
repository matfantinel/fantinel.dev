<picture class="resume-photo">
	<source srcset="/images/resume-avatar-dark.png" media="(prefers-color-scheme: dark)" />
	<img src="/images/resume-avatar.png" alt="Matheus Fantinel's Avatar" />
</picture>

<style lang="scss">
	.resume-photo {
		img {
			border-radius: 50%;
			// box-shadow: 0px 4px 10px 8px rgb(0 0 0 / 10%);
			max-width: 100%;
			max-height: 200px;
			box-sizing: border-box;
			@media (prefers-color-scheme: dark) {
				border: 3px solid var(--primary-light-color);
			}
		}
	}
</style>
