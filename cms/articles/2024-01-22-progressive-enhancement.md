---
slug: progressive-enhancement
title: Progressive Enhancement (and why it matters)
excerpt: Progressive Enhancement isn't just another web jargon; it's a guiding principle shaping modern web development.
coverImage: ""
coverImageAlt: ""
showImage: false
socialImage: /images/posts/progressive-enhancement/cover.png
date: 2024-01-23T01:50:25.950Z
updated: null
showToc: true
hidden: false
tags: []
categories:
  - Front-End
  - Dev
type: Article
---

I’ve mentioned Progressive Enhancement on this blog [once before](/blog-development-sveltekit), when explaining how my blog was built and how Svelte has that concept as one of its main appeals. Since then, it’s something that has stuck with me on everything I’ve built, and as such has shaped the way I work both on personal projects and professionally as well.

This article talks about Progressive Enhancement focusing mainly on websites and web apps, but it’s a concept that may carry over to other areas of development (client-side, at least), though the specifics might differ.

## What is Progressive Enhancement?

If you really think about it, Progressive Enhancement is all about accessibility. It’s about making sure people of all kinds and with all kinds of devices and connections are able to access your software in at least some capacity.

Just like you can’t expect all users to have perfect eyesight and motor skills, you can’t expect them to have the latest hardware and software, or to have perfect network connections to load everything as intended. Of course that the experience of someone whose spotty 3G connection wasn’t able to load your JS files to be as good as someone in a fast stable Wi-Fi, but what if both could use your website/app either way?

Sounds hard, right? But it really isn’t.

## Why and when it matters

When talking about Progressive Enhancement, there’s three main reasons a user may be facing a non-ideal version of your website:

1. The JavaScript files couldn’t be downloaded;
2. The CSS couldn’t be downloaded;
3. The user’s browser/device doesn’t support a feature your code uses;

For number 3, this can be dealt with with some clever feature-checking (more on this below) and using websites like [[caniuse.com](http://caniuse.com)](https://caniuse.com) before using newer features.

As for 1 and 2, there are numerous reasons it can happen. I like to refer to [this website](https://www.kryogenix.org/code/browser/everyonehasjs.html) whenever I want to reference why someone might not have JavaScript loaded (and the same reasons apply for CSS), but to summarize:
- A faulty connection may make the JS/CSS file requests fail, even though the page itself loaded;
- A lot of corporate firewalls and ISPs block domains, which might affect requests, especially 3rd-party files your code might depend on;
- The user might have disabled JavaScript (a lot of people do);
- Browser extensions (especially adblockers) might block your scripts from running;

It’s hard to know exactly how many people this affects, and the number will greatly vary depending on who your audience is. [A 2013 study by the UK Government](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/) showed that 1 in 93 people won’t get your JavaScript code running correctly. 11 years later, while in general connections have gotten faster and more stable, users have also become more likely to use ad-blockers or similar tools. So I’d wager the rate hasn’t changed much.

## How to Progressively Enhance Your Website

I’m gonna be honest: Progressive Enhancement is easy, as long as you’re building something new. There’s no quick way of going back to old JS-dependent features and make them work without it, as it will require a refactor. Beyond that, while Progressive Enhancement is a always good thing to keep in mind when developing, a fully working website with JS disabled might not be achievable if you have an app that uses JS to build its entire UI - a SPA (Single Page Application).

With that out of the way, these are my main tips for building websites that get progressively better the more resources the user has:

### Start with the basics

Instead of building a fully-featured UI and then stripping it down, we're doing the opposite: start with the bare minimum. It helps to disable JS for your website (can be done in the browser’s DevTools), so you’re 100% sure everything will work without it. It doesn’t need to be pretty or smooth, it just needs to function. Once that’s done, you can re-enable JavaScript and start adding the charming bits.

There’s not much you can do to prepare for a case where your CSS didn’t load, but you can mitigate one of the main issues when that happens: **add height/width to your images and SVGs.** That way, they won’t be absurdly big and won’t break the layout as much. And, if you want to style your images with more complex rules, you can add the styles in CSS and they'll overwrite the height/width attributes. For example:

```html
<img src="example.jpg" width="500" height="500" />
```

```css
~filename styles.css
/* These will only be applied if 
the CSS file loads successfully */
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

And, if you want your images to be scale responsively when your CSS actually loads, just overwrite the height/width there! Fun fact: adding height/width properties to the `img` element also helps many frameworks load correctly-sized images to make them more lightweight.

### Think *inside* the box 📦

There’s a lot of talk about thinking outside the box when developing - and indeed it’s one of the best skills a developer can have! But often the inside of the box is really useful too. Whatever you're thinking of building, there’s probably an HTML element that behaves similarly. Why not expand on that instead of just adding more events to a div?

- For hyperlinks, use `<a>` (please);
- For accordions, use [the <details> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details);
- Need to send data to a server? Just use a `<form>`! No need for onClicks or onSubmits;
- Any element that has a toggleable state - for example, a hamburger menu or even a modal dialog - can be controlled by a checkbox instead. Yes, really! Check out the mobile hamburger menu of this website;
- In fact, add [MDN’s list of HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) to your bookmarks. Use divs only as a last resort. Chances are, using a proper HTML element is going to make your code simpler, more readable and more accessible.

### Use feature queries

In the past few years, CSS has been getting a ton of new features, making web development easier in general. Things like [container queries](/container-queries), [parent selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) (:has), and many more.

However, even when all browsers adopt the new features quickly, users still might keep using older versions of a browser for a while. But it the feature you want to use has been available for a bit, you can use feature queries to check if a feature is available or not. I’ve briefly mentioned this in my [conditional hover styles post](/css-hover-media-query), but to sum it up, you can use the `@supports` keyword to check if a property is available or not. Take this example of a feature check for container queries:

```css
@supports (container-type: inline-size) {
	/* container queries styles */
}

@supports not (container-type: inline-size) {
	/* fallback styles */
}
```

And what if the feature isn’t supported, do I need to write my CSS rules twice? No, not really. I mean, it’s your choice how much effort you want to have in supporting the older browsers in this case, but I’d recommend you to at least do something that’s good enough. In the example above (common for creating responsive elements), the older browser could be served some media queries that might not be as pixel-perfect or smooth, but still good enough to not serve a broken experience.

## Wrapping Up

I hope this article has been at least a bit enlightening as to how important and easy it can be to start adopting Progressive Enhancement. I feel like as web frameworks got more advanced and decoupled from the basic web development experience, we also started to forget using what the platform gives us, and began reinventing wheels, often in less accessible and less performant ways.

That was a response to a stagnant web platform, more than a decade ago. But that time is past, and the web platform has been progressing greatly in the past few years. By consequence, there has been a change in web frameworks that seem to be adopting more of the native web and depending less on client-side JavaScript. That can be seen in newer frameworks like Svelte and Solid when compared to older ones like React and Angular. But most of all it can be seen in meta-frameworks like Astro or NextJS, that are trying to make the JS-dependent frameworks all produce markup in the server and serving the user a complete page even with JavaScript disabled.

Web development is changing again (has it ever stopped?), and this time it’s hard to see a downside.