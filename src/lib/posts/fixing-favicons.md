---
slug: fixing-favicons
title: How to fix your Favicons
date: 2021-01-06
excerpt: "Favicons suck. Luckily, there are ways to make them suck less."
tags: [Front-End, Guide, Favicon]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
</script>

Favicons kinda suck. They should be a simple icon that identifies your webpage on a bunch of scenarios, i.e. the icon displayed on the tab besides your website's title, or the icon on the mobile browser's bookmarks screen, or the icon on the phone's home screen.

Unfortunately, different browsers, OSs, and implementations throughout the years have ended up with many different files and meta tags, that we as developers need to handle otherwise we end up with missing or pixelated icons.

## Easy Mode

I recently met my new best friend, [Real Favicon Generator](https://realfavicongenerator.net/). It took all these pains I just wrote about and just made it a breeze to handle. Best of all, it's customizable!

You just have to add in your existing favicon image (for best results, a SVG or high-quality PNG are recommended). From then on, the generator will display previews and allow customization of each category of favicon it will generate:

<Image
  path="posts/{slug}"
  filename="favicon-generator-customization"
  alt="Screenshot of Real Favicon Generator's customization"
  figcaption="The customization options allow you to set different icons depending on device and OS, and even generate icons with background colors if needed."
/>

At the bottom, you can even set up ways of avoiding caching issues, compression, and scaling algorithms (!). After all that, it will generate them all as set, give you a zip with all the files, and the HTML code to paste on your `<head>`. You can check the result on this very website (fantinel.dev). The favicon should look fantastic on every device/browser combination.

## Manual Mode

So, there are 5 types of favicons that we need to add, if we want to support every current browser:

### 1. Desktop browsers
<ul>
  <li>`favicon.ico`, for IE and any other legacy browsers. Optional if you don't want to support it;</li>
  <li>`favicon-16x16.png`, the classic one that displays on the tabs;</li>
  <li>`favicon-32x32.png`, used on Safari for macOS.</li>
</ul>

### 2. Android browsers
<ul>
  <li>`android-chrome-192x192.png`, shown on the tab card and when added to home screen;</li>
  <li>`android-chrome-512x512.png`, shown on the splash screen for when the website is installed to the phone. Optional if it's not a PWA;</li>
</ul>

### 3. iOS Safari, and some Android browsers like Samsung Internet
<ul>
  <li>`apple-touch-icon.png`, a 180x180 file displayed when the website is added to home screen;</li>
</ul>

### 4. Windows 8/10 start menu (optional)
<ul>
  <li>`mstile-150x150.png`, only used when your website is added to the start menu as a tile on Windows 8/10, and when not declared, defaults to `apple-touch-icon.png` instead.</li>
</ul>

### 5. macOS Safari Pinned Tabs (optional)
<ul>
  <li>`safari-pinned-tab.svg` is used when users pin a tab on Safari for macOS. Basically, you declare a monochrome SVG and a theme color. Safari does the rest.</li>
</ul>

<Image
  path="posts/{slug}"
  filename="safari-pinned-tabs-demo"
  alt="Demo of Safari pinned tabs favicon behavior"
  figcaption="How Safari pinned tab favicon works, screenshot of realfavicongenerator.net"
/>

With those files, you should be good to go on every single browser, by adding this to your `<head>`:

<CodeBlock lang="html">

```html
<head>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
  <link rel="shortcut icon" href="/favicon.ico">
</head>
```
</CodeBlock>

## Single SVG Favicon

Something that's starting to become a thing is having a single SVG favicon. Theoretically, SVGs are infinitely scalable, and should look good on all sizes. Unfortunately, browser support is not there yet.

[Can I Use](https://caniuse.com/link-icon-svg) reports that, currently (January 2021), only recent versions of Firefox and Chromium-based browsers support this feature. This means that Safari, non-Chromium Edge, IE, and some mobile browsers do not support it. Therefore, unless you want your favicon to just not appear in those browsers, you'd still have to use other file formats as well. The downside of this approach is that all favicons would look the same, and you won't be able to customize and have differently-shaped icons for mobile devices, for example.

<CodeBlock lang="html">

```html
<head>
  <link rel="icon" href="favicon.svg">
</head>
```
</CodeBlock>

## Wrapping Up

Favicons suck. Luckily, there are people working to make it suck less. With the approach presented on this article, your website should be able to display its best favicon on all browsers for years to come.