---
layout: post
title: "Angular - Exploring the Front-End: Modern Frameworks - Part II"
images-path: /posts/1991-12-21-modern-frameworks-pt2
image: /images/posts/1991-12-21-modern-frameworks-pt2/cover.jpg
tags: [Front-End, Modern Frameworks, JavaScript, Angular]
hidden: true
---

Angular is, in a way, the oldest of the three frameworks. AngularJS (or Angular 1.x) was released back in 2010, and was a pretty big deal. It brought new concepts and was for some time considered "the king of modern JS frameworks". Then React came and brought new concepts, a component-based approach and took the throne for itself.

Google, the main maintainer behind AngularJS, then made a very controversial decision - to rebuild the framework from the ground up, and change the way it works completely. Thus, Angular (or Angular 2+) was born. The naming doesn't help at all differentiating them: AngularJS is one thing, and Angular (without the "JS") is another. The first one is the one we're gonna talk about here!

### This is the second post of a series that aims to dive in the three most popular front-end frameworks, exploring their concepts and building the same sample application with each one, trying to find out their pros and cons. [You can read the introductory post here]({{site.baseUrl}}/modern-frameworks-pt1/).


## Base Concepts
Before the code, let's see some of the concepts behind Angular. I'm doing my best to sum them up in a way that's not tiring to read, but still easy to understand. You can always delve deeper into them by reading [the official Angular docs](https://angular.io/docs){:target="_blank"}.

* It uses [TypeScript](https://www.typescriptlang.org){:target="_blank"} instead of regular JavaScript. It is a language maintained by Microsoft that provides static typing, interfaces, and overall provides a better experience for developers, specially in more complex apps (I'm a big fan!). While opting out of TypeScript is possible, it is not very encouraged;
* The framework itself is very modular, which means a lot of functionality is split between multiple packages and needs to be imported separately. This can be a bit of a nuisance while developing, but is actually good to reduce bundle size and improve loading performance in the end product;
* There's a heavy use of dependency injection;

Basically, Angular consists of three types of classes (there are more, but these three are the main pillars). They are:

### Modules
https://angular.io/guide/architecture#modules

### Components
https://angular.io/guide/architecture#components

### Services
https://angular.io/guide/architecture#services-and-dependency-injection