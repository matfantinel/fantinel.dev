---
slug: css-scroll-snapping
title: CSS Scroll Snapping - Improve Scrolling without JS
date: 2020-08-03
excerpt: "Learn how to snap scrolling positions with CSS only."
tags: [Front-End, CSS, Guide]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
</script>


CSS is evolving constantly and the past few years have brought us amazing stuff. It is getting easier to make smooth and complete experiences without having to use JavaScript at all. Case in point: Scroll Snapping.

It is an easy way to guarantee that users will scroll to the correct portion of your page or of a container. Picture a landing page that is easily swipable/scrollable between sections, or swipable cards. Take in mind how Android's Recent Apps screen works, for example:

![Android's Recent Apps screen has scroll mapping between app cards](/images/posts/{slug}/android-scroll-snapping.gif)

You can see that Android never allows the end of a scroll to be in a place between cards. There's a certain threshold that determines that the scroll will snap into the nearest card and put it in the center. All that while still keeping scrolling momentum, allowing you to go from one edge of the list to another in a single scroll if you want to.

Until recently, you'd have to resort to JavaScript code to make a similar behavior on the web. But now, all you need is CSS, which makes things more performant, consistent and reliable! Browser support is already pretty good, with all major browser engines already supporting it fully. Check out browser support on [caniuse.com](https://caniuse.com/#feat=css-snappoints).

I've recently added scroll snapping to my own website. You can check it out on the "Work Experience" section in the [Home page](https://fantinel.dev). It's specially great on mobile!

## How?

There are two main CSS properties that make the magic happen, one for the parent element, and one for its children.

<CodeBlock lang="css">

```css
.parent {
  scroll-snap-type: y mandatory;
}
.child {
  scroll-snap-align: start;
}
```
</CodeBlock>

### scroll-snap-type

This property tells the browser that the parent element uses scroll snapping. We are given some options on how snapping must work. `y` indicates that the scroll happens vertically, while `x` means horizontally. We can also pass the `mandatory` and `proximity` options. 

We use `mandatory` to tell that the browser _must_ snap to a snap point when the user stops scrolling. This means that if the next snap point becomes visible on the screen and scrolling stops, the browser will automatically snap to the next one. In the other end, with `proximity`, things are less strict. The browser will only snap to the next snap point if scrolling gets past a certain threshold. Both values are useful, their use will depend on the situation you're applying it to.

<iframe height="500" style="width: 100%;" scrolling="no" title="scroll-snap-type: Mandatory vs Proximity" src="https://codepen.io/matfantinel/embed/preview/LYNPdpE?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/matfantinel/pen/LYNPdpE">
  scroll-snap-type: Mandatory vs Proximity</a> by Matheus Fantinel (<a href="https://codepen.io/matfantinel">@matfantinel</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### scroll-snap-align

This is a property you add to the children that specifies where the snap points will be in the element. Which means that, whenever the browser automatically snaps the scroll to the element, it will either go to the left/top edge (`start`), center (`center`), or right/bottom edge (`end`) of the element. This property pretty much only makes a difference if the children are bigger than the parent's display size.


### scroll-padding and scroll-margin

To make things even better, we can use the `scroll-padding` (for parent) and `scroll-margin` (for children) properties. They add some space before/after the elements that are only considered when scrolling. The best way to implement them is by trying it out after you build your scroll snapping goodiness.

You can check the documentation over on [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) for more info.

## Wrapping Up

Scroll snapping is a sign that the web is maturing. For years we've been bloating websites with a lot of JavaScript for very simple visual tasks, and now CSS is slowly evolving to take some space back. It's an important evolution because Web technologies are being used to build every kind of application, and its native feature set needs to be good enough to compete with native or native-ish counterparts like Flutter, Swift, or Kotlin.

Thanks for reading!