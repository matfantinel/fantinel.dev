---
slug: fixing-favicons
title: How to fix your Favicons
excerpt: Favicons suck. Luckily, there are ways to make them suck less.
coverImage: /images/posts/fixing-favicons/cover.jpg
coverImageAlt: ""
showImage: true
date: 2021-01-06
updated: null
hidden: false
tags: []
categories:
  - Dev
  - Front-End
type: Article
showToc: true
---

Favicons kinda suck. They should be a simple icon that identifies your webpage on a bunch of scenarios, i.e. the icon displayed on the tab besides your website's title, or the icon on the mobile browser's bookmarks screen, or the icon on the phone's home screen.

Unfortunately, different browsers, OSs, and implementations throughout the years have ended up with many different files and meta tags, that we as developers need to handle otherwise we end up with missing or pixelated icons.

## Easy Mode

I recently met my new best friend, [Real Favicon Generator](https://realfavicongenerator.net/). It took all these pains I just wrote about and just made it a breeze to handle. Best of all, it's customizable!

You just have to add in your existing favicon image (for best results, a SVG or high-quality PNG is recommended). From then on, the generator will display previews and allow customization of each category of favicon it will generate:

![Screenshot of Real Favicon Generator's customization](/images/posts/fixing-favicons/favicon-generator-customization.jpg 'The customization options allow you to set different icons depending on device and OS, and even generate icons with background colors if needed.')

At the bottom, you can even set up ways of avoiding caching issues, compression, and scaling algorithms (!). After all that, it will generate them all as set, give you a zip with all the files, and the HTML code to paste on your `<head>`. You can check the result on this very website (fantinel.dev). The favicon should look fantastic on every device/browser combination.

## Manual Mode

So, there are 5 types of favicons that we need to add, if we want to support every current browser:

### 1. Desktop browsers

- `favicon.ico`, for IE and any other legacy browsers. Optional if you don't want to support it;
- `favicon-16x16.png`, the classic one that's displayed on the tabs;
- `favicon-32x32.png`, used on Safari for macOS.

### 2. Android browsers

- `android-chrome-192x192.png`, shown on the tab card and when added to home screen;
- `android-chrome-512x512.png`, shown on the splash screen for when the website is installed to the phone. Optional if it's not a PWA;

### 3. iOS Safari, and some Android browsers like Samsung Internet

- `apple-touch-icon.png`, a 180x180 file displayed when the website is added to home screen;

### 4. Windows 8/10 start menu (optional)

- `mstile-150x150.png`, only used when your website is added to the start menu as a tile on Windows 8/10, and when not declared, defaults to `apple-touch-icon.png` instead.

### 5. macOS Safari Pinned Tabs (optional)

- `safari-pinned-tab.svg` is used when users pin a tab on Safari for macOS. Basically, you declare a monochrome SVG and a theme color. Safari does the rest.

![Demo of Safari pinned tabs favicon behavior](/images/posts/fixing-favicons/safari-pinned-tabs-demo.jpg)

With those files, you should be good to go on every single browser, by adding this to your `<head>`:

```html
<head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
	<link rel="shortcut icon" href="/favicon.ico" />
</head>
```

## Single SVG Favicon

Something that's starting to become a thing is having a single SVG favicon. Theoretically, SVGs are infinitely scalable, and should look good on all sizes. Unfortunately, browser support is not there yet.

[Can I Use](https://caniuse.com/link-icon-svg) reports that, currently (January 2021), only recent versions of Firefox and Chromium-based browsers support this feature. This means that Safari, non-Chromium Edge, IE, and some mobile browsers do not support it. Therefore, unless you want your favicon to just not appear in those browsers, you'd still have to use other file formats as well. The downside of this approach is that all favicons would look the same, and you won't be able to customize and have differently-shaped icons for mobile devices, for example.

```html
<head>
	<link rel="icon" href="favicon.svg" />
</head>
```

## Wrapping Up

Favicons suck. Luckily, there are people working to make it suck less. With the approach presented on this article, your website should be able to display its best favicon on all browsers for years to come.