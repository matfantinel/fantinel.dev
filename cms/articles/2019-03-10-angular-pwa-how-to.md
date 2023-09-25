---
slug: angular-pwa-how-to
title: How to transform your Angular 6+ app into a PWA
excerpt: Make your Angular app work like a native app on phones and desktop.
coverImage: /posts/angular-pwa-how-to/cover.jpg
coverImageAlt: ""
showImage: true
date: 2019-03-10
updated: null
hidden: false
tags: []
categories:
  - Angular
  - Front-End
  - Dev
type: Article
showToc: true
---

Recently, I've converted my Angular 6 app into a PWA, allowing it to work offline and work like a native app on phones and desktop.

Although there are many tutorials out there about turning Angular apps into PWAs, I've decided to write one simply because I faced some issues that were a bit hard to solve, so if you end up having them you don't lose as much time as I did!

> !!! info
> This tutorial assumes you are using Angular CLI. Possible issues are listed at the end of the tutorial.

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

```shell
npm i http-server -g
```

Then, compile your app in production mode:

```shell
ng build --prod
```

And finally, start the web server:

```shell
http-server -p 8080 -c-1 dist/<project-name>
```

Your app should be up and running on `http://localhost:8080/` (or whichever port you chose). How do you know it's a PWA? There are a few ways:

### Check if the service worker is being registered

![Screenshot of Chromium's Service Workers UI](/posts/angular-pwa-how-to/Service-Workers.jpg 'On dev console > Application > Service Workers, there should be a registered service worker for your app.')

### Use Chrome's Audits feature to validate it as a PWA

![Screenshot of Chromium's Audits tab, displaying options on how to test your page as different devices and for different metrics. The options "mobile" and "Progressive Web App" are selected.](/posts/angular-pwa-how-to/Audits.jpg 'On dev console > Audits, test it for Progressive Web Apps.')

![Screenshot of a list of passed audits, with two highlighted: "User can be prompted to install the Web App" and "Registers a service worker"](/posts/angular-pwa-how-to/Passed-Audits.jpg 'If everything went well, you should see the highlighted results on the \'Passed audits\' section.')

You may see some errors regarding the app not running over HTTPS. Don't worry, that's only because it's running locally.

## Step 5. Install it!

On Chrome/Edge, you may also see the option to install the app appear in the URL bar:

![Screenshot of a browser window, showing an "Install app?" prompt on the navigation bar.](/posts/angular-pwa-how-to/install-prompt.jpg)

After this, the app should already open on a separate window, and show up on your OS's installed apps list!

![Screenshot of the dock of the operating system, showing the PWA icon besides other apps', as if it were a "real" app.](/posts/angular-pwa-how-to/dock-icon.jpg)

## Issues Encountered

Even though the proccess is quite straight-forward, I still faced some issues when running it in my app. They were because of Angular tools versions, and I probably had these issues because I'm still running an Angular 6 app (and Angular 7 is out as of now).

### The `ng add @angular/pwa` command doesn't create relevant files

This was a [reported bug](https://github.com/angular/angular-cli/issues/11914) on the CLI. I had a bugged version (6.0.8) installed on my app. I updated it by running:

```shell
npm uninstall @angular/cli --save
npm install @angular/cli@latest --save
```


It updated itself to version 7.1.4 and worked flawlessly.

_Notice: this is related to the local cli version, the one displayed on your `package.json` file, not the global one installed in your machine._

### Failed to register a ServiceWorker: A bad HTTP response code (404) was received when fetching the script.

This error shows up on the browser console after opening the app running on http-server. It happens because, when running `ng build --prod`, Angular isn't sending the service worker's files along with the ones from the app. You can confirm this by searching for the `ngsw-worker.js` file on the `/dist` folder of your app. If it's not there, then you have this issue.

This one took me the longest to find out. Another bug related to outdated versions of Angular tools. Simply changing `@angular-devkit/build-angular` version in devDependencies to `~0.10.0` solved it.

## Wrapping Up

I hope you had success on setting up your PWA! Remember that, when published, it will only work if you serve your app through HTTPS.

Thanks for reading!