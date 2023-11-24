---
slug: css-isolation-property
title: CSS's "isolation" property is pretty cool
excerpt: I had never heard about it before, but it's a pretty clean way of solving z-index related issues.
coverImage: ""
coverImageAlt: ""
showImage: false
socialImage: ""
date: 2023-11-24T13:15:59.085Z
updated: null
showToc: false
hidden: false
tags: []
categories:
  - Reading Recs
  - Front-End
type: Article
---

> `isolation` is a special property whose sole and unique purpose is to create a new stacking context on the element it is applied to, with no other side-effects. 😄
>
> - Francesco Vetere, in [The CSS property you didn't know you needed](https://dev.to/francescovetere/the-css-property-you-didnt-know-you-needed-3fk0)

You learn something new everyday! Today, I learned about CSS's [isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation) property. I learned it through [this Francesco Vetere post](https://dev.to/francescovetere/the-css-property-you-didnt-know-you-needed-3fk0), which I highly recommend you to read, as he explains it way better than I do.

Basically, `isolation: isolate` is a very simple way of creating a stacking context in CSS. Stacking context is basically a "reset" of how `z-index` works, so you can manage indexes in a smaller scope. 

Francesco gives a perfect example of a card element with a decorative element in its background. To make that element appear below the text, you'd naturally add `z-index: -1;`, but that means the element would show below the card as well! By creating a new stacking context on the card, you can safely manage `z-index` without worrying about any child element appearing below/outside its parent.