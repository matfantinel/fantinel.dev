<script>
	import Card from '../base/card.svelte';
	import Section from '../layout/section.svelte';
	import ProjectsGrid from '$lib/components/layout/projects-grid.svelte';
	import ThreeByThreeGrid from '$lib/components/layout/3x3-grid.svelte';
	import OneByOneGrid from '$lib/components/layout/1x1-grid.svelte';
	import ExternalLinkIcon from '$lib/svg/external-link.svelte';
	import Github from '$lib/svg/socials/github.svelte';
	import Blobs from '../layout/blobs.svelte';
	import Image from '../base/image.svelte';
	import Tag from '../base/tag.svelte';
</script>

<section id="projects">
	<Section
		align="top"
		title="Projects"
		description="I like to build some small projects when learning. Technologies are varied and so are their purposes. Most of them are open source!"
	>
		<OneByOneGrid>
			<ProjectsGrid>
				<Card>
					<div slot="image">
						<Image path="projects" filename="personal-website" alt="Personal Website" />
					</div>
					<div slot="content">
						<div class="title">
							Personal Website
							<div class="links">
								<a
									class="text-secondary"
									href="https://github.com/matfantinel/matfantinel.github.io"
									target="_blank"
									rel="noopener"
									title="Open project on GitHub"
								>
									<Github />
								</a>
							</div>
						</div>
						<div class="text">
							The website you’re seeing right now. Designed to be pretty, simple, and lightweight.

							<a
								class="project-post-button button secondary-light transparent"
								href="/blog-development-sveltekit"
							>
								Read blog post
							</a>
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							<Tag>Svelte</Tag>
							<Tag color="secondary">Open Source</Tag>
						</div>
					</div>
				</Card>

				<Card>
					<div slot="image">
						<Image path="projects" filename="pocket-companion" alt="Pocket Companion" />
					</div>
					<div slot="content">
						<div class="title">
							Pocket Companion
							<div class="links">
								<a
									class="text-secondary"
									href="https://github.com/matfantinel/acnh-pocket-companion"
									target="_blank"
									rel="noopener"
									title="Open project on GitHub"
								>
									<Github />
								</a>

								<a
									class="text-secondary"
									href="https://pocketcompanion.fantinel.dev/"
									target="_blank"
									rel="noopener"
									title="Open site"
								>
									<ExternalLinkIcon />
								</a>
							</div>
						</div>
						<div class="text">
							A companion app for Animal Crossing New Horizons. Manage your island, tasks and
							Critterpedia with this handy web app.

							<a
								class="project-post-button button secondary-light transparent"
								href="/ionic-animal-crossing-companion"
							>
								Read blog post
							</a>
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							<Tag>Angular</Tag>
							<Tag>Ionic</Tag>
							<Tag color="secondary">Open Source</Tag>
						</div>
					</div>
				</Card>

				<Card>
					<div slot="image">
						<Image path="projects" filename="gestek" alt="Gestek" />
					</div>
					<div slot="content">
						<div class="title">
							Gestek
							<div class="links">
								<a
									class="text-secondary"
									href="https://gestek.com.br/"
									target="_blank"
									rel="noopener"
									title="Open site"
								>
									<ExternalLinkIcon />
								</a>
							</div>
						</div>
						<div class="text">
							A web app for managing Beauty Clinics, supporting the entire day-to-day operation,
							with built-in CRM, ERP and beauty-clinic specific features. I worked on this project
							as the lead front-end developer for over a year.
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							<Tag>Angular</Tag>
							<Tag>PWA</Tag>
						</div>
					</div>
				</Card>
			</ProjectsGrid>

			<ThreeByThreeGrid>
				<Card>
					<div slot="image">
						<Image path="projects" filename="moneta" alt="Moneta" />
					</div>
					<div slot="content">
						<div class="title">
							Moneta
							<div class="links">
								<a
									class="text-secondary"
									href="https://github.com/matfantinel/moneta"
									target="_blank"
									rel="noopener"
									title="Open project on GitHub"
								>
									<Github />
								</a>

								<a
									class="text-secondary"
									href="https://appcenter.elementary.io/com.github.matfantinel.moneta/"
									target="_blank"
									rel="noopener"
									title="Open site"
								>
									<ExternalLinkIcon />
								</a>
							</div>
						</div>
						<div class="text">
							A desktop applet that displays currency rates and updates during the day. Built for
							elementary OS.
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							<Tag>Vala</Tag>
							<Tag>GTK</Tag>
							<Tag>Desktop</Tag>
							<Tag color="secondary">Open Source</Tag>
						</div>
					</div>
				</Card>

				<Card>
					<div slot="image">
						<Image path="projects" filename="reminduck" alt="Reminduck" />
					</div>
					<div slot="content">
						<div class="title">
							Reminduck
							<div class="links">
								<a
									class="text-secondary"
									href="https://github.com/matfantinel/reminduck"
									target="_blank"
									rel="noopener"
									title="Open project on GitHub"
								>
									<Github />
								</a>

								<a
									class="text-secondary"
									href="https://appcenter.elementary.io/com.github.matfantinel.reminduck/"
									target="_blank"
									rel="noopener"
									title="Open site"
								>
									<ExternalLinkIcon />
								</a>
							</div>
						</div>
						<div class="text">
							A simple reminder app for elementary OS, and my first experience writing native
							desktop apps.
						</div>
					</div>
					<div slot="footer">
						<div class="tags">
							<Tag>Vala</Tag>
							<Tag>GTK</Tag>
							<Tag>Desktop</Tag>
							<Tag color="secondary">Open Source</Tag>
						</div>
					</div>
				</Card>
			</ThreeByThreeGrid>
		</OneByOneGrid>
	</Section>
	<Blobs maxTop={5} minLeft={50} />
</section>

<style lang="scss">
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.links {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 15px;
			a {
				width: 30px;
				height: 30px;
				padding: 3px;

				&:hover {
					color: var(--primary-color);
					fill: var(--primary-color);
				}
			}
		}
	}

	.project-post-button {
		width: fit-content;
		margin: 10px auto 0;
		font-weight: 500;
	}
</style>
