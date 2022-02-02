---
slug: plausible-ethical-analytics
title: Ethical Analytics are Plausible, at Last
date: 2022-02-01
excerpt: "Web Analytics is such a morally ambiguous area that I’ve avoided it for years, but now I can finally do it with peace of mind."
tags: [Analytics, Privacy, SEO]
---

<script>
  import Image from "$lib/components/base/image.svelte";
  import MarkerHighlight from "$lib/components/style/marker-highlight.svelte";
  import CodeBlock from "$lib/components/blog/code-block.svelte";
</script>

Analytics have become intrinsic to software development in the past decade. On the marketing side, analytics allow us to measure the success of marketing campaigns, optimize the wording, measure ad results, or simply keep track of the growth of the audience. On the development side, it allows to more easily detect points of failure, bad patterns or UX hiccups.

These benefits however, usually come at a price: <MarkerHighlight>in-depth analytics tend to store way too much information about the user</MarkerHighlight>, and the user is often unaware of how much is being collected. It's a decision the user doesn't really make; we make it for them. _(Yes, I know, legally the user often accepts cookies or terms of service... but the reality is that almost nobody reads or understands that.)_

On platforms like Google Analytics, there is a lot of information we can see, however none of them personally identifies the user. That's good, right? Well, not really: Google can personally identify (and does through its Ads business) them, and by using Google Analytics or similar products on your site, you're feeding them your user's information for a really low price - otherwise, why would these analytics be free?

Luckily, there are ways to get most of the needed metrics without compromising anybody's privacy, and even get a better experience in the end.

## Ethical Analytics

Recently increasing concerns about online privacy have sprouted a lot of ethical analytics services, that aim to collect only necessary, anonymous data. Services like [Matomo](https://matomo.org/) and [Fathom](https://usefathom.com/) provide an experience that is simple and to-the-point, and I've heard nothing but praise about both services. For myself though, I've picked [Plausible Analytics](https://plausible.io/), which I use on this website and in some of my side projects.

It's important to point out, though, that none of those are free. Since they don't collect personal data and don't monetize it, they must charge for their service. The prices are pretty low though, and unless it's a hobby project you have no intention of monetizing, that cost will be absorbed really quickly and the gains will make it worth it.

### Plausible

Plausible is a small company from Europe that makes Plausible Analytics, a privacy-friendly alternative to Google Analytics. The reasons I've picked Plausible instead of others are that:

* It's open source;
* It can be self-hosted in case you already have your own server;
* It's intuitive: a quick glance through the dashboard and you're already able to understand everything that's in there. [Check out mine](https://plausible.io/fantinel.dev);
* It's sustainable: their business model allows them to grow organically and [the project is already profitable](https://plausible.io/blog/bootstrapping-saas) without any kind of external funding (and [they have no plans of accepting it](https://twitter.com/PlausibleHQ/status/1282678251148763137));
* They offer [ways of bypassing adblockers](https://plausible.io/docs/proxy/introduction);
* It's simply a great product.

<Image
  path="posts/{slug}"
  filename="dashboard"
  alt="Screenshot of the dashboard of my personal website on Plausible Analytics."
  figcaption="Clicking on some data blocks allow you to filter data - so you can still understand how your users behave differently depending on a number of factors."
/>

#### Custom Goals

The data that Plausible collects by default should be enough for most use cases. However, there is still some information that is not gathered that you might want to have. For cases like that, Plausible offers the [Custom Event Goals API](https://plausible.io/docs/custom-event-goals).

With a simple function call, you can send data to the Plausible API and track some behaviors or extra information. For example, if you want to track the percentage of your users that click on "Sign up", you can fire a custom event for that. These are also filterable in the dashboard, which means you can compare where most of the users that sign up come from.

In my case, I wanted to know the percentage of users that use light/dark mode in their browser or system. There is [an open Feature Request to add this functionality](https://github.com/plausible/analytics/discussions/622) to Plausible that has received some interest, but while that isn't implemented, I built my own detection using the Custom Events API:

<CodeBlock lang="javascript">

```javascript
  // Use Plausible to track the % of people that have a dark/light mode preference
  if (plausible) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      plausible('Dark Mode Enabled');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      plausible('Light Mode Enabled');
    } else {
      plausible('No Dark/Light Preference');
    }
  }
```
</CodeBlock>

_**Note:** tracking Custom Events without user interaction like this breaks the "Bounce Rate" metric. By firing an event, Plausible interprets that the user has interacted with your site, and therefore the Bounce Rate goes to zero. If the Bounce Rate metric is important to you, this might not be a good idea._

## Wrapping Up

I apologize if this post felt like an ad. It is not. Web Analytics is such a morally ambiguous area that I've avoided it for years, and now I can finally grab some metrics with a peace of mind. Regardless of what service you choose and prefer, having privacy-friendly alternatives is good for everyone. With Plausible being one of my favorite pieces of software at the moment, I felt it was right to write a bit about it and spread the word.

Thanks for reading!