---
slug: what-are-pwas-and-why-should-i-care-about-them
title: What are PWAs and why should I care about them?
date: 2019-03-12
excerpt: "We see a lot of talk about PWAs, but the concept is not that easy to understand."
tags: [Front-End, PWA, JavaScript]
---

<script>
  import Image from "$lib/components/base/image.svelte";
</script>

Progressive Web Apps are not new, but they are becoming more and more popular everyday. Big companies like Facebook, Twitter and Google have been using them for a while, and while they're often designed for mobile, recent pushes from Microsoft and Chrome are making them a good option even for desktop.

[I've covered how you can turn your Angular 6+ app into a PWA here](/angular-pwa-how-to). Now, let's see why you should do that.

## What is a PWA?

Native apps, the ones that are designed to work specifically on Mobile/Desktop OSs, usually have some useful features, like access to the device's functionalities like camera, GPS, sending notifications, working offline, and so on. They also are able to utilize the device's full screen (on mobile), show up on the home screen, and are usually pretty fast to load.Web apps though, need to be accessed by a browser. This takes away some screen real estate, since the browser's UI is also shown. They cannot work offline, can only show up on the home screen as a shortcut to the browser, and usually take longer to load, since its assets need to be loaded from the web.

PWAs, or Progressive Web Apps, are basically websites that have the ability to deliver a native app-like experience, by sending notifications, offering a snappier and more responsive experience, working offline, etc. This is achieved with the use of modern Web APIs, and a little thing called **Service Worker**.

_Please keep in mind that hybrid apps developed with Ionic, Cordova, or similar frameworks **are not PWAs**, since they are installed like a real app and have full access to the device._

### Service Worker?

A Service Worker is like a client-side proxy, written in Javascript, that powers offline functionality, push notifications, caching, updating, and more.

They can, for instance, listen for any http requests and handle them nicely, like retrieving cached data if there's no internet connection. To avoid problems with updates, since it caches content more aggressively, it can be configured to update itself everytime it sees there is a new version online. This avoids problems with users using older versions of our web apps (and therefore gets rid of native apps' biggest nuisance).

This all may sound complicated, which is why there are many "recipes" of Service Workers around the web. They are still JavaScript files, so it's not hard to adapt and improve them at your own pace.

You probably have already found some of them in the wild. In Chrome for Android, opening a certain website might trigger this panel at the bottom of the screen:

<Image
  path="posts/{slug}"
  filename="Android-Install-Prompt"
  figcaption="'Add Notepad to the home screen'"
  alt="PWA Install Prompt on Android"
/>

And on Desktop, this option shows up in the URL bar:

<Image
  path="posts/{slug}"
  filename="Clipboard_2019-10-27-18-09-45"
  alt="Chrome prompts you to install PWA"
/>

With this, your app is able to be displayed on your phone or PC's app list just like any other app. Cool!

_Keep in mind that for now only a few Chromium-based browsers offer this functionality on Android. Firefox, sadly, is not allowed by Google to create WebAPKs (how these are called). Thanks, free market!_ 🙄

## That's nice and all... But how would my app benefit from it?

Let's get one thing out of the way first - **PWAs are not a replacement for native apps**. They have more limitations, and overall offer worse performance than a native app written in Java/Swift. Their purpose is to offer a better user experience for web apps that are used often by users. If you have a complex web app, and do not have the time/resources or simply don't think it's worth it to create a native counterpart, PWAs are for you. I will compare PWAs to hybrid apps, like the ones built on Ionic.

The first main advantage is that the entry barrier is lower. Research shows that [the majority of mobile users in the US download an average of 0 apps monthly](https://techcrunch.com/2017/08/25/majority-of-u-s-consumers-still-download-zero-apps-per-month-says-comscore/). That's zero. None. That may be because searching for an app in the app store may be a bit counterintuitive depending on the situation. Let's imagine that you have an hybrid app on the app store. Your new user probably found out about your app/service on its website, so they're already in the browser:

1. Logs in to your app on the browser;
2. You detect that they're using a mobile phone, so you can show them a banner to download your app on the store;
3. They open the app store;
4. They try to download your app. Or, they might give up because they're on their limited data plan, and avoids downloading apps on it.
5. They can either return to the web app on the browser, with all the disavantadges mentioned before, or use your hybrid app.

If the user has installed your app, cool! However, you must still keep one thing in mind: your app updates independently from your web app, and the updates will take longer. Some users might even disable autoupdates altogether. Depending on how your app works, you might suffer from users using outdated versions of the code, which might result in issues for them and for you.

Now let's imagine the same flow, but with a PWA:

1. Logs in to your app on the browser;
2. A panel shows up on the bottom of their screen: "Hey, add this to your home screen!";
3. The app is installed into the user's phone and can now be accessed from the app list, with better screen estate, better performance (because of caching), and easier to open;
4. Your app is always on-par with the web version.

Another worthy thing to mention is that you don't have to go through the hassle of publishing an app on the app store!

## There are advantages even if the user doesn't install your web app

So far I've covered how your app would benefit from users being able to install the app directly from the browser. But still, a lot of the PWA benefits still apply even if they don't.

Even when opened in a browser, a PWA can still offer:

* Better speed after first load, due to the more aggressive cacheing of the static content;
* Less jankiness and more responsiveness overall, since the content will be loaded from the user's device instead of downloaded dynamically;
* Won't be affected by variations in the user's connection.

## How can I convince my boss to let me work on this?


Well, every boss is different. But [Google provides some neat statistics that may help you in your endeavor](http://https//developers.google.com/web/progressive-web-apps/):

* Push notifications increase user engagement by up to 4 times;
* Some use cases report that the increase in conversions after transitioning to a PWA was of 104%!

## As with all things, don't overdo it

This article covered the concept and advantages of PWAs, but keep in mind that they are not for every use case. **Use it for web apps that users will find themselves coming back to frequently**. There's no point in doing it for your company's website or static websites. It's also worth remembering that **PWAs do not replace native apps, they are just a lower-effort alternative for web apps without native counterparts**.

It's also worth mentioning that the advantages cited in this article are, as of March 2019, **fully supported only by Google Chrome/Chromium**. Google's been pushing PWAs hardly lately and other companies still have some catching up to do. iOS 11.3 saw the addition of basic PWA capabilities on Safari, but some features still do not work. Firefox for Android also supports some PWA capabilities, but does not prompt the user the same way Chrome does (because Google won't allow it, may I add).

Thanks for reading!