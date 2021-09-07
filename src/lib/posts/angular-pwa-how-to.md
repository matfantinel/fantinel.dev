---
slug: angular-pwa-how-to
title: How to transform your Angular 6+ app into a PWA
date: 2019-03-10
excerpt: "Make your Angular app work like a native app on phones and desktop."
tags: [Angular, PWA, Guide, Front-End, JavaScript]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
</script>

Recently, I've converted my Angular 6 app into a PWA, allowing it to work offline and work like a native app on phones and desktop.

Although there are many tutorials out there about turning Angular apps into PWAs, I've decided to write one simply because I faced some issues that were a bit hard to solve, so if you end up having them you don't lose as much time as I did!

<Callout type="info">
This tutorial assumes you are using Angular CLI. Possible issues are listed at the end of the tutorial.
</Callout>

## Step 1. Installing the Angular PWA dependencies

This is the easiest part. Run `ng add @angular/pwa` in the root of your project (the folder where `package.json` is. The CLI will automagically add `@angular/pwa` and `@angular/service-worker` as dependencies in your package.json file, and add some placeholder icons in your `assets` folder.

Besides that, it will create a file named `ngsw-config.json` in your root folder, as well as a `manifest.json` in your /src folder, and reference both in `index.html` and `app.module.ts`. These files are important as you'll be using them to configure your PWA later.

## Step 2. Setting up your manifest.json

The `manifest.json` file is the one that tells the browser/OS about your app. You can set the full and short names, theme color, icons, and more. [You can find more about its settings here.](https://developers.google.com/web/fundamentals/web-app-manifest/)

Don't forget to update the auto-generated icons on `/assets/icons` folder! These are necessary so that your app icon shows up for devices of all DPI settings.

## Step 3. Setting up ngsw-config.json

This file is the one that can configure how your PWA works. You can set up different installation behaviors, as well as handle cache updates. [The Angular documentation has got all options covered here.](https://angular.io/guide/service-worker-config)

## Step 4. Test it out!

If you want to test out your app's new PWA capabilities locally, `ng serve` won't help you. Instead, you can run a web server in your machine easily by installing the `http-server` package from npm:

<CodeBlock lang="shell">

```shell
npm i http-server -g
```

</CodeBlock>

Then, compile your app in production mode:

<CodeBlock lang="shell">

```shell
ng build --prod
```

</CodeBlock>

And finally, start the web server:

<CodeBlock lang="shell">

```shell
http-server -p 8080 -c-1 dist/<project-name>
```
</CodeBlock>

Your app should be up and running on `http://localhost:8080/` (or whichever port you chose). How do you know it's a PWA? There are a few ways:

### Check if the service worker is being registered

<Image
  path="posts/{slug}"
  filename="Service-Workers-1"
  figcaption="On dev console > Application > Service Workers, there should be a registered service worker for your app."
  alt="Registered Service Worker"
/>

### Use Chrome's Audits feature to validate it as a PWA

<Image
  path="posts/{slug}"
  filename="Audits"
  figcaption="On dev console > Audits, test it for Progressive Web Apps."
  alt="Audits"
/>

<Image
  path="posts/{slug}"
  filename="Passed-Audits"
  figcaption="If everything went alright, you should see the highlighted results on the 'Passed audits' section."
  alt="Audits passed"
/>

You may see some errors regarding the app not running over HTTPS. Don't worry, that's only because it's running locally.

## Step 5. Install it!

On Chrome, you may also see the option to install the app appear in the URL bar:

<Image
  path="posts/{slug}"
  filename="Clipboard_2019-10-27-18-09-45"
  alt="Chrome prompts you to install PWA"
/>

After this, the app should already open on a separate window, and show up on your OS's installed apps list!

<Image
  path="posts/{slug}"
  filename="Clipboard_2019-10-27-18-11-28"
  figcaption="Notice the PWA's own icon on my OS' dock! Success!"
  alt="Installed PWA on OS' dock"
/>

## Issues Encountered

Even though the proccess is quite straight-forward, I still faced some issues when running it in my app. They were because of Angular tools versions, and I probably had these issues because I'm still running an Angular 6 app (and Angular 7 is out as of now).

### The `ng add @angular/pwa` command doesn't create relevant files

This was a [reported bug](https://github.com/angular/angular-cli/issues/11914) on the CLI. I had a bugged version (6.0.8) installed on my app. I updated it by running
<CodeBlock lang="shell">

```shell
npm uninstall @angular/cli --save
npm install @angular/cli@latest --save
```
</CodeBlock>

It updated itself to version 7.1.4 and worked flawlessly.

_Notice: this is related to the local cli version, the one displayed on your `package.json` file, not the global one installed in your machine._

### Failed to register a ServiceWorker: A bad HTTP response code (404) was received when fetching the script.

This error shows up on the browser console after opening the app running on http-server. It happens because, when running `ng build --prod`, Angular isn't sending the service worker's files along with the ones from the app. You can confirm this by searching for the `ngsw-worker.js` file on the `/dist` folder of your app. If it's not there, then you have this issue.

This one took me the longest to find out. Another bug related to outdated versions of Angular tools. Simply changing `@angular-devkit/build-angular` version in devDependencies to `~0.10.0` solved it.

## Finalizing

I hope you had success on setting up your PWA! Remember that, when published, it will only work if you serve your app through HTTPS.

Thanks for reading!