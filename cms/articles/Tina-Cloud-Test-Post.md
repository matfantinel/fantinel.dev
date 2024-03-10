---
title: Tina Cloud Test Post
slug: tina-cloud-test-post
excerpt: This post was created in Tina cloud.
categories:
  - Meta
date: 2024-03-09T22:07:34.326Z
---

Ok, so it was created in the CMS. Gotta see what happens when I save it.

If I understood correctly, ==images will only work on the main branch==.

## Problems so far

* Build takes too long
  * \~2mins have been added to the build time because of TinaCMS build;
  * Images still take too long to optimize. I wonder if Svelte Image is faster?
* Not sure if querying the API is possible, because it returns the Markdown content as a bunch of nodes that require a Tina package to render. I'll ask around on GitHub discussions if it's possible to get the raw Markdown text via API.

> \[!warning] 🤔\
> On second thought, do I really want to use the API? I believe handling the files directly is closer to the philosophy I want to follow. Plus, it allows doing static goodiness like Pagesearch, and I won’t be tied to Tina and Tina Cloud at all. Tina will remain as an utility only.
