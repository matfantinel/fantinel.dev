---
slug: web-images-modern-formats
title: "Smarter, Lighter, Better Images: A Guide to Optimization"
date: 2021-01-30
excerpt: "Learn how to reduce page loading times and bounce rate."
tags: [Front-End, Guide, HTML, CSS, Optimization]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import MarkerHighlight from "$lib/components/style/marker-highlight.svelte";
</script>

Do you know how big the images displayed on your website are? When you open a page, the browser starts downloading a bunch of files in order to display it. Research shows that [images are the most requested asset type](https://httparchive.org/reports/state-of-images) and take up more bandwidth than any other resource. So, making sure they are as small as they can be can greatly improve the load times for your website. (spoiler alert: mine's become 85% faster!)

## More efficient formats

For a long time, JPGs and PNGs have been our standard image formats. However, they are not optimized for the web - their quality is often unnecessarily high and the download size is too big. Over time, many new formats have appeared, but two of them have become quite notable: [WebP](https://en.wikipedia.org/wiki/WebP) and [AVIF](https://www.lambdatest.com/blog/avif-image-format/).

WebP has been introduced in 2010, and has slowly gained adoption since then. Since 2020, [WebP is now supported in all modern browsers](https://caniuse.com/webp). AVIF [was launched in 2020](https://jakearchibald.com/2020/avif-has-landed/), and its adoption has been faster. As of January 2021 it is supported by all Chromium-based browsers, and Firefox will start supporting it on version 86, scheduled to release before March.

_But how do we use those shiny new formats if not all browsers support them?_

With the HTML `<picture>` element, we can make the browsers do the work for us. We can declare multiple sources for the same image, and the browser will try to load them in order. If they do not support a format, they will immediatelly jump to the next one.

So, what we want to do is declare those different sources in the following order:

AVIF -> WebP -> JPG (or PNG)

<CodeBlock lang="html">

```html
<picture>
  <!-- If this type(avif) is supported, use this src -->
  <source
    type="image/avif" 
    srcset="my-image.avif" 
  />
  <!-- Else, if this type(webp) is supported, use this src instead -->
  <source
    type="image/webp"
    srcset="my-image.webp"
  />
  <!-- Else, fall back to jpg -->
  <img 
    src="my-image.jpg" 
    alt="A test image" 
    loading="lazy" 
    decoding="async"
  />
</picture>
```
</CodeBlock>

If you look at the resulting HTML in your website, you can see that the `<img>` element has a `src` defined, but when you hover over it, it shows what is the actual file that's being loaded. If you're on a supported browser, it will have loaded the AVIF file. If you're on Safari, it will have loaded the WebP one. Otherwise, if you're using IE or something (I'm sorry), the original JPG or PNG file will be loaded.


<Image
  path="posts/{slug}"
  filename="generated-html"
  figcaption="The img tag shows the PNG file as source, but hovering the mouse over it reveals that the AVIF file is the one that actually loaded."
  alt="Screenshot of the generated HTML code"
/>

## Load smaller images

You can optimize even further than that. See, in my example, I am loading an image with a width of 1200px, however, the size it's being displayed is only 319px wide. The `srcset` property supports different widths to load, depending on the screen size.

<CodeBlock lang="html">

```html
<picture>
  <!-- Here, we declare the widths our different files have: 380px, 640px and 960px -->
  <source
    type="image/avif" 
    srcset="
      my-image-380w.avif 380w,
      my-image-640w.avif 640w,
      my-image-960w.avif 960w
    "
    sizes="(max-width: 979px) 100vw, 640px"
  />
  <img 
    src="my-image.jpg" 
    alt="A test image" 
    loading="lazy" 
    decoding="async"
  />
</picture>
```
</CodeBlock>

The `srcset` property is smart. As the name implies, it is a set of sources, not just a single one. When we declare multiple file paths and add a width unit besides it, the browser looks at this data and tries to display the smallest possible image.

On the code snippet above, the browser will follow this: <MarkerHighlight>If the size of the displayed image (on the page) is smaller or equal to 380px, it will load the file with 380px of width. Otherwise, it will try to load the next declared path (640px).</MarkerHighlight>

**However,** not all parts of this process are smarty. The browser cannot know what is the final size of the image on the page before it actually loads it. Which is why the `sizes` property exists. Let's see how it works:

The `sizes` property defines what rule the browser will use to get the width it uses to choose the correct file in `srcset`. The default value is `100vw`. That means that, to check what width the image will have, the browser just gets the width of the browser window. If we know the exact size the image will have on load, we can declare it here, or if we don't know the exact size, we can estimate. We can use media queries to help us specify the sizes better as well.

Check out the value on the example: `(max-width: 979px) 100vw, 640px`. What that code does is: if the width of the viewport is equal or smaller than 979px, use 100vw. Else, use 640px.

It is easier to understand if we visualize it like this:

<Image
  path="posts/{slug}"
  filename="sizes"
  figcaption="On mobile, the image width is almost the same as the viewport, so it's okay to use 100vw. On desktop, we usually limit the image width, so 640px was the sweet spot in this particular case."
  alt="Screenshots picturing how the sizes property affects the image loading on both mobile and desktop"
/>

Of course, different websites have different needs and situations. Make sure to adapt the code to your specific need. 

It's also worth noting that most phones use a HiDPI mode. This means that <MarkerHighlight>even though the reported width for the phone above is 375px, the browser will likely use a higher resolution to load the images</MarkerHighlight> (usually 2x), in order to serve a higher quality image.


## Lazy Loading and Async Decoding

You might have noticed the `loading="lazy"` and `decoding="async"` attributes in the code above. Those are relatively new options that are part of an ongoing effort to make the web faster.

`decoding="async"` tells your browser it can try to parallelize loading your image. When your page is loading, it tries to decode both text and images at the same time. On lower-end devices though, decoding heavy images can take a while, and this might block the rendering of the rest of the content. With this option, the browser will try to proceed rendering the rest of the content and render the image later. This can be a great improvement to perceived performance.

`loading="lazy"` is probably the most important of the two. It is an easy way of telling the browser to <MarkerHighlight>only load the images when they get close to appearing in the viewport</MarkerHighlight>. There is a threshold that is defined by the browser that controls how close it needs to be before it gets loaded, so you don't have to worry about them not showing up if the user scrolls fast. <MarkerHighlight>This ensures that the initial load of the website is as lean as it can get, improving perceived performance and also saving you some money on server requests.</MarkerHighlight>

<Image
  path="posts/{slug}"
  filename="first-load-requests"
  figcaption="When the website is initially loaded, it only downloads what's needed: my avatar image and the preview of the first blog post, that will show up after scrolling a bit."
  alt="Screenshot of the image requests made on first load of my website"
/>

<Image
  path="posts/{slug}"
  filename="after-scrolling-requests"
  figcaption="When I scroll down the page, the images are downloaded as they're close to appearing."
  alt="Screenshot of the image requests made after scrolling a bit"
/>

## Results In Practice 

Since I like using my own website and blog as a testbed for new stuff that I learn, I have applied these optimizations to it. The results were incredible!

Note: after doing some tests, I have decided that the benefits of serving differently-sized images on my website were too small to justify the extra effort of handling all these extra images. So, the only optimizations I have really applied were the optimized file formats, lazy loading and async decoding. I also chose PNG as fallback type instead of JPG because some of my images have transparency in them, which JPG does not support.

The following data is taken from the home page of the website, since it has a lot of images:

<Image
  path="posts/{slug}"
  filename="results"
  alt="Screenshot showing the difference in download size before and after the optimizations"
/>

<MarkerHighlight>The total download size decreased by a whopping 85%!!</MarkerHighlight> That's an incredible difference, with no noticeable difference in quality. Your results may vary, as they depend on how much of your website's size is images.

Before the changes, out of 1.6MB total, 92% of it were images, 5% were fonts, 1% was HTML, and the remaining 2% were of JS and other things like the web manifest.

Now, out of 249kB, just 24% of it are images. Fonts now make up 27% of page size, and are likely the target of a future optimization post!

## The Hard Part

The hardest part of this process is converting the images to all necessary formats and sizes. It is a lot of effort to do manually even for a single image, and even worse if you're trying to optimize existing images like I was. 

### Generating the Images

For my needs, I have developed a NodeJS script that uses the [Sharp](https://github.com/lovell/sharp) library to do the magic for me. It accepts as parameters a source and a target folder, input file types (what files it will look for in the source folder), output file types (what types it will convert to), as well as the desired widths.

The script is at the time of writing this currently usable only via command line. I have plans to turn this into a part of the build process of my website, with a [GitHub Action](https://github.com/features/actions), so that I don't have to run it manually. 

So, to check out how to use the script, please [check out its GitHub page](https://github.com/matfantinel/image-transmutation) for up-to-date instructions.

### Using the images

To make this setup work, I had to do some changes on how images were used on my website.

Pre-existing conditions:
* All the images on my website were initially in a folder called "images", with various subfolders;
* The images I wanted to convert were all in either PNG or JPG formats;

Modifications I did:
* I have created a folder called "optimized-images", where all the converted images are saved automatically by my script;
* I have created a component to centralize all image-loading logic. With Jekyll, I just had to create an HTML file in the `_includes` folder, but how you do this might vary depending on what technology you use;
* This component receives as parameters: the relative file path, the filename (without file extension), and the alt text;

<CodeBlock lang="html">

```html
{% assign alt = include.alt %}
{% assign path = include.path %}
{% assign filename = include.filename %}
<!-- Here I build the full path to the image, minus the extension -->
<!-- In case the process of generating the images is automated, you can check here if it's -->
<!-- running locally or not, and swap between /images and /optimized-images accordingly -->
{% assign imageSrc = '/optimized-images/' | append: path | append: '/' | append: filename %}

<picture>
<!-- And here I use that path and add the extensions inside the srcsets only -->
  <source
    srcset="{{ imageSrc }}.avif"
    type="image/avif"
  />
  <source
    srcset="{{ imageSrc }}.webp"
    type="image/webp"
  />
  <img src="{{ imageSrc }}.png" alt="{{ alt }}" loading="lazy" decoding="async">
</picture>
```
</CodeBlock>

And to use this component inside another page:

<CodeBlock lang="liquid">

```liquid
{% include base/smart-image.html 
  path="posts/my-post-url"
  filename="my-image"
  alt="A sample image"
%}
```
</CodeBlock>

My folder structure looks like this: 

<Image
  path="posts/{slug}"
  filename="folder-images"
  alt="Screenshot showing the optimized files in their folder and comparing to the original one"
  figcaption="Llamas are great"
/>

## Wrapping Up

With such amazing results, it's hard not to recommend you to optimize the images in your website ASAP. There sure are more approaches and optimizations that can be done besides the ones presented on this article, as the web world is always changing. But optimizations are a great way of showing respect to your users (as well as gathering more of them). Your site loads more quickly, and it uses less data and resources.

As front-end developers, we must acknowledge that all we write runs on someone else's computer, the user's. So it is important that we respect them and make sure we just use the resources we need to.

I hope you enjoyed reading this! Take care and happy coding!
