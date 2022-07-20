<script>
	import PinIcon from '$lib/svg/pin.svelte';
  import CircleIcon from '$lib/svg/circle.svelte';
  import LowAccentHighlight from '$lib/components/style/low-accent-highlight.svelte';
  import { entries } from '$lib/experience';
</script>

<div class="resume-experience">

  {#each entries as entry}
    <div class="experience" class:current={entry.current}>
      <div class="timeline">
        <div class="time">
          {#if entry.current}Current{/if}
          <CircleIcon />
          {entry.timeframe.split(' ')[0]}
        </div>
        <div class="line"></div>
      </div>
      <div class="content">
        <div class="title">
          <div>
            <span class="company-name logitix">
              <LowAccentHighlight id={entry.id}>{entry.title}</LowAccentHighlight>
            </span>
          </div>
          <small>{entry.jobTitle} | <span class="icon"><PinIcon /></span> {entry.location}</small>
        </div>

        <p>{entry.description}</p>
      </div>
    </div>
  {/each}

	<!-- <div class="experience">
		<div class="title">
			<div>
				<span class="company-name logitix">
          <LowAccentHighlight id="logitix">Logitix</LowAccentHighlight>
        </span>
				<span class="location"><span class="icon"><PinIcon /></span> USA, Remote</span>
			</div>
			<small>Software Engineer | 2019 → 2021</small>
		</div>

		<ul>
			<li>
				Working on a Vue front-end project, aiming to solve current pains and create new and better
				processes to manage ticket sales and brokerage in the US;
			</li>
			<li>Building new ways of viewing and interacting with huge amounts of data;</li>
			<li>Automating previously manual processes with Selenium, improving speed and capacity;</li>
		</ul>
	</div>

	<div class="experience">
		<div class="title">
			<div>
				<span class="company-name sige">
          <LowAccentHighlight id="sige">SIGE Cloud</LowAccentHighlight>
        </span>
				<span class="location"><span class="icon"><PinIcon /></span> Brazil</span>
			</div>
			<small>Software Developer | 2017 → 2019</small>
		</div>

		<ul>
			<li>Applying the Microfrontends approach to modernize a legacy product;</li>
			<li>
				Developing a desktop app from scratch for a simplified ERP focused on small companies;
			</li>
			<li>Developing a mobile app that acts as an extension to the company’s main product;</li>
			<li>
				Developing an internal HelpDesk software using Artificial Intelligence to help users before
				they even opened the ticket;
			</li>
		</ul>
	</div>

	<div class="experience">
		<div class="title">
			<div>
				<span class="company-name promob">
          <LowAccentHighlight id="promob">Promob</LowAccentHighlight>
        </span>
				<span class="location"><span class="icon"><PinIcon /></span> Brazil</span>
			</div>
			<small>Software Developer | 2014 → 2017</small>
		</div>

		<ul>
			<li>Maintenance and modernization of the company's services portal;</li>
			<li>Development and maintenance of many APIs used by other development teams;</li>
			<li>
				Refactoring of the company’s internal software structure, according to changes in the
				business model;
			</li>
			<li>Integration with third-party CRM, HelpDesk and ERP softwares;</li>
		</ul>
	</div> -->
</div>

<style lang="scss">
	.resume-experience {
		.experience {
      display: flex;
      gap: 10px;

      .timeline {
        width: 60px;
        margin-bottom: -16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .line {
          border-left: 2px dashed var(--primary-color);
          width: 2px;
          flex: 1;
        }

        .time {
          color: var(--text-light-color);
          width: 24px;
          padding: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          word-wrap: none;
          white-space: nowrap;

          :global(svg) {
            width: 20px;
            height: 20px;
            color: var(--primary-color);
          }
        }

      }

      &.current {
        .time {
          :global(svg) {
            padding: 2px;
            background: var(--card-background-color);
            border: 1px solid var(--primary-color);
            border-radius: 50%;
            fill: var(--primary-color);
          }
        }
      }

      // &:first-child {
      //   .timeline {
      //     .line {
      //       top: 10px;
      //       height: calc(100% + 6px);
      //     }          
      //   }
      // }

      &:not(:last-child) {
        padding-bottom: 16px;
      }

      &:last-child {
        .timeline {
          .line {
            display: none;
          }
        }
      }

      .content {
        flex: 1;
      }

			.title {
				div {
					font-size: 18px;
					display: block;
				}

				.company-name {
					color: var(--text-color);
					font-size: 22px;
					font-family: var(--title-font);
					font-weight: 600;          
				}

				.icon {
					:global(svg) {
						width: 14px;
						height: 14px;
					}
				}

				small {
					font-size: 14px;
					font-weight: 300;
					color: var(--text-light-color);
					fill: var(--text-light-color);
				}
			}

      p {
        margin-top: 10px;
				text-align: justify;
      }
		}
	}
</style>
