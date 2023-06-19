---
title: Who Runs Our Code
slug: who-runs-our-code
excerpt: 'In a world with tons of business requirements, conversion metrics, and a
  stampede of new technologies, front-end development can easily become
  oblivious of one thing: where our code runs.'
date: 2023-02-10T00:32:31.054Z
tags:
  - Ramble
  - Front-End
categories:
  - Tech
---

<script context="module">
  import Callout from "$lib/components/molecules/Callout.svelte";
  import MarkerHighlight from "$lib/components/molecules/MarkerHighlight.svelte";

  import { getSrcsetFromImport } from "$lib/utils/functions";
  import CoverImage from './cover.jpg?width=1600&format=avif;webp;png;jpg&meta&imagetools';

  metadata.coverImage = getSrcsetFromImport(CoverImage);
</script>

In a world with tons of business requirements, conversion metrics, and a stampede of new technologies, front-end development can easily become oblivious of one thing: where our code runs.

<Callout type="info">
  When I say front-end developer, I don't just mean those who work on the web. I mean everyone who writes code that runs directly on a user's machine - be it a website, a mobile app, a desktop program, or even an IoT driver.
</Callout>

Software development is hard. And not just because of coding itself (which might be the easiest part sometimes), but mostly because in the end, developing commercial software is a great balancing act. We need to balance time, quality, features and expectations all the time.

In an ideal situation, we should have all the time we need to make sure all our components are bug-free, testable, accessible, generic, performant and intuitive. The main problem is, developers are often the only ones who read the code, and therefore the only ones in a company that care about more than 2 of the items above.

Still, it’s valid to take a shot every once in a while and try to push for higher standards. <MarkerHighlight>In a way you’re borrowing the user’s machine to run your code</MarkerHighlight>, and if you care about your user you wanna make sure that code is the best it could be.
