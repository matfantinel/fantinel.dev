<script>
	import ProjectsIcon from '$lib/svg/projects.svelte';
	import BlogIcon from '$lib/svg/blog.svelte';
	import ExperienceIcon from '$lib/svg/experience.svelte';
</script>

<section id="hero">
	<h1 class="hello">Hello, I'm Matt!</h1>
	<p class="intro">
    <span class="left">I build fun stuff on the web,</span>
    <span class="right">and sometimes write about it.</span>
  </p>
	<div class="ctas">
		<a id="projects-btn" href="#projects" class="button primary-light">
			<ProjectsIcon />
			Projects
		</a>
		<a id="blog-btn" href="/blog" class="button primary">
			<BlogIcon />
			Blog
		</a>
		<a id="experience-btn" href="#experience" class="button secondary-light">
			<ExperienceIcon />
			Experience
		</a>
	</div>
</section>

<style lang="scss">
  @import '../../scss/breakpoints.scss';

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    gap: 15px;
		position: relative;
    padding: 80px 0;

    @include for-phone-only {
      padding: 40px 0 50px;
    }

    .hello {
      text-align: center;
    }

		.intro {
			font-weight: 500;
			font-size: 1.4rem;
			width: min(100%, 440px);
      display: flex;
      flex-direction: column;

      .left {
				text-align: left;
			}
			.right {
				text-align: right;
			}

      @include for-phone-only {
        display: none;
      }			
		}

		.ctas {
			display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;

      a {
        flex: 0 0 180px;

        &#projects-btn {
            order: 1;
          }
          &#blog-btn {
            order: 2;
          }
          &#experience-btn {
            order: 3;
          }
      }

      @include for-phone-only {
        a {
          flex: 0 0 160px;

          &#projects-btn {
            order: 1;
          }
          &#blog-btn {
            order: 3;
          }
          &#experience-btn {
            order: 2;
          }
        }
      }
      @include for-iphone-se {
        grid-template-columns: 1fr;
      }
		}
	}
</style>
