---
slug: automating-social-media-preview-images-satori
title: Automating Social Media Preview Images
excerpt: Social media preview images are very useful if you want to attract people to your website. They're sometimes a pain to create, though. Let's automate it!
coverImage: ""
coverImageAlt: ""
showImage: false
socialImage: ""
date: 2024-05-05T22:15:42.302Z
showToc: true
hidden: false
tags: []
categories:
  - Front-End
  - Svelte
  - Dev
type: Article
---

![Image with my website's visual identity and the title of this blog post written on it](https://fantinel.dev/opengraph?text=This%20image%20was%20generated%20automatically!)

Social media preview images (or open graph images, or og images) are very useful if you want to attract people to your website. Displaying that neat blog post featured image on the link preview might be the difference between someone scrolling past your link or clicking on it. Plus, it looks neat.

Problem is, not all blog posts have an image. Maybe it's just a quick thought, or something so abstract you just can't figure out a good image to put in there. Your blog layout is fine if you don't add an image, but what happens when that link is shared? Maybe nothing will show up and people will miss it? Or maybe the more generic fall-back image of your website will show up in there. And how will people mindlessly scrolling on social media know what your link is about?

Luckily for us lazy people, there's a way of automating them!

## Generating images from HTML using Satori

This is kind of an old problem that has had a few solutions in the past, but none of them were really great. Depending on how long you've been coding, you might have used packages like `html2png` or something similar, and if you did, you probably remember it never really worked well and had plenty of limitations.

Enter [Satori](https://github.com/vercel/satori). It's a library developed by Vercel that actually converts HTML and CSS to SVG. SVGs are way easier to convert to images than HTML, so that's why they decided to go down this route. They then provide their own solution for converting to a PNG, but honestly, that's not a big deal and you can roll your own quite easily (I did!).

## Why not just screenshot a page? Some sites do that!

If you're searching for this topic, you've probably found [some articles](https://www.zachleat.com/web/automatic-opengraph/) talking about a method of generating these images by creating a page on your website that looks the way you want, and then using a serverless function to spin up an instance of Chromium, load your site, and take a screenshot of it.

That approach makes a lot of sense - I even used it briefly! - but it has three main problems:

1. It's **slow!** Spinning up Chromium on a server, waiting for the page to load, taking the screenshot and downloading it are a lot of considerably large steps. 
2. It's **inefficient!** Spinning up an entire browser just to grab a screenshot sounds really wasteful. If you're in a paid plan, it's expensive too.
3. It **probably won't  work.** Which might actually be the #1 reason not to use it. ==Most of those articles were written years ago==, when the headless version of Chromium that's used on those serverless functions was smaller. Nowadays, ==it takes up more than 50MB==, which is the maximum limit of serverless functions! There are technically still [some ways of working around that limit](https://www.stefanjudis.com/blog/how-to-use-headless-chrome-in-serverless-functions/), but those break often and are not guaranteed to work in the long run. Chromium is likely to keep growing.

So, with that out of the way, we can now talk about how Satori works.

## The more efficient, albeit slightly limited way

[In their announcement blog post](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images), Vercel explains that they built Satori to counter the problems of the previous approach. In order to avoid running into the same speed and inefficiency problems, they wanted to avoid using any browser engine. So, they use the same layout engine as React Native, which, while not a complete CSS implementation, still has good parity in results for most cases.

The nice thing about that is that it's lightweight and reliable. The bad things is that it has some caveats:

- It only supports a subset of CSS. So, no Grid support, for example. But considering you're using this for generating preview images and not really something complex, it's a fair tradeoff. [Their GitHub page](https://github.com/vercel/satori?tab=readme-ov-file#css) details what it does and does not support;
- It expects JSX syntax for elements. If you're working on a project that doesn't use it, that'd require another dependency and a build step. Additionally, you can also pass JS objects that have `type`, `props.children` and `props.style`. It's good for not needing another dependency, but it's *really* hard to read. Or you can use [satori-html](https://github.com/natemoo-re/satori-html), a package that translates HTML and CSS into JSX so you can just write good ol' web code.

## Where to run it

In case it's not yet clear, you need to have some sort of backend in order to run this. That way, you can make your backend return an image file instead of a page or something else.

Luckily, a bunch of frameworks include that nowadays. SvelteKit, Next JS, Astro, and others, all allow you to create some endpoints inside your web app. And, if you host things on platforms like Vercel or Netlify, you can probably have all that working for free (or included in the plan you already have).

On SvelteKit, you can just create a route with a server file (`+server.js`). On Next JS, you can add a new route to the `/api` folder. Other frameworks may vary, but it shouldn't be that hard!

If you have a static site or something else and can't run it, I haven't really done much research into how it can be done. But I believe you can still use the free tier of [Vercel Functions](https://vercel.com/docs/functions/quickstart), for example, to get that working.

## My implementation

> [!info] 
> In order to set it up on my site, I followed [this post from Geoff Rich](https://geoffrich.net/posts/svelte-social-image/) that goes deep into how things work and how to build things. I'm not gonna try to rewrite his post because there's really no need - his is already amazing, so if you're looking into a tutorial, definitely follow his instead of mine.

Since I use SvelteKit, I created a new `/opengraph` route with a `+server.js` file that does the magic. It receives some params via query string (like the text of the image) and then returns back the generated image.

Since I don't use JSX and didn't wanna add that to my project, I used [satori-html](https://github.com/natemoo-re/satori-html) to convert HTML and CSS to it. Additionally, I used [resvg-js](https://github.com/yisibl/resvg-js) to convert the SVG that Satori generates into a PNG. 

To make things even nicer, I moved the HTML and CSS code into a Svelte component, added the `text` variable, and then imported that on the server file. In the end, the code goes through this entire flow: Svelte -> HTML -> SVG -> PNG! It looks roughly like this:

```javascript
~filename +server.js

const componentResult = component.render();  
const htmlString = satoriHtml(componentResult.html);  
const svg = await satori(htmlString, satoriConfig);  
const image = new Resvg(svg, resvgConfig).render();  
return new Response(image.asPng(), {  
	headers: {  
		'content-type': 'image/png'  
	}  
};
```

After that, I can just make my `og:image` meta tag point to that endpoint:

```svelte
<meta property="og:image" content={`https://fantinel.dev/opengraph?text={encodeURIComponent(post.title)}`} />
```

And... that's it! All my posts that don't have an explicitly set cover image will now have at least a good looking related image that shows up on social media.