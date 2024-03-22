---
tags: []
type: Article
title: Conditional Hover Styles in CSS
slug: css-hover-media-query
excerpt: >-
  Have you ever crafted a nice hover effect for an element in your website, then
  opened it on mobile and saw that effect erroneously appear when that element
  is tapped on?
coverImage: /images/posts/css-hover-media-query/cover.jpg
coverImageAlt: Laptop and phone side by side
showImage: true
socialImage: /images/posts/css-hover-media-query/social.png
hidden: false
categories:
  - Front-End
  - Dev
date: 2023-02-12T00:00:00.000Z
updated: 1970-01-01T00:00:00.000Z
---

Have you ever crafted a nice hover effect for an element in your website, then opened it on mobile and saw that effect erroneously appear when that element is tapped on? That’d be nice perhaps, if it weren’t for the fact that the effect just… stays there.

That happens because touch-based browsers apply the hover effect to an element when it’s tapped on regardless of hover capabilities and keep that effect active until you tap something else. Why do they do this? My guess is backwards compatibility, as many websites built with a mouse cursor in mind can hide important information behind a hover action, like for example displaying a tooltip.

Luckily, if you want to avoid having the hover effect applied when it shouldn’t be (and instead using `:focus` and `:active` selectors properly), there’s a CSS media query to help with that:

```css
@media (hover: hover) {
	.my-component {
		/* Styles here */
	}
}
```

If you wanna do the opposite (add styles only to devices that do not support hover), you can use `hover: none` instead:

```css
@media (hover: none) {
	.my-component {
		/* Styles here */
	}
}
```

And there you go! This is a nice thing to keep in mind whether you build mobile-first or desktop-first, as adding that media query to hover styles at the same time you're developing the styles themselves will avoid any unintended effects.
