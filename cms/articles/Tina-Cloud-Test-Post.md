---
title: Tina Cloud Test Post
slug: tina-cloud-test-post
excerpt: This post was created in Tina cloud.
categories:
  - Meta
date: 2024-03-09T22:07:34.326Z
---

Ok, so it was created in the CMS. Gotta see what happens when I save it.

\~Images are not available yet because I didn't set them up. But if this works then I'll set them up later.\~ nvm, it looks like it'll only work on the main branch.

## Problems so far

* Build takes too long
  * \~2mins have been added to the build time because of TinaCMS build;
  * Images still take too long to optimize. I wonder if Svelte Image is faster?
* Not sure if querying the API is possible, because it returns the Markdown content as a bunch of nodes that require a Tina package to render. I'll ask around on GitHub discussions if it's possible to get the raw Markdown text via API.
