---
layout: post
title: "Exploring the Front-End: Modern Frameworks - Part I"
images-path: /posts/1991-12-21-modern-frameworks-pt1
image: /images/posts/1991-12-21-modern-frameworks-pt1/cover.jpg
tags: [Front-End, Modern Frameworks, JavaScript]
hidden: true
---

There are a lot of JS frameworks and libraries out there. Recently, however, there are 3 that have got a lot of attention and are the most used. Angular, React and Vue are amazing tools for development, and this is the first post in a series that aims to compare all three when developing a sample application.

You've probably already seen lots of posts out there comparing two or more frameworks, trying to find out which one is better. Truth is, they're all robust tools that do a lot of things well, and some do better in certain things than others. The goal of this series is not to find out which one is the best, but rather which one fits more your style or situation.

I do a lot of work with Angular - it's the framework I am most comfortable with. I really like it! I am used to its behavior and quirks, I'm in love with TypeScript and I feel very productive with it, so this series is also going to be a personal journey. While I know the basics of React and Vue, this will be my first time really diving in their concepts and applying them in the "real world". I hope this can be a learning experience for you too!

## Overview

Angular, React and Vue are JavaScript frameworks that center around a reusable component-based architecture. They aim to make developing web apps a better, simpler and more organized experience, specially when dealing with big apps.

### Component-based?

Often, a web page is made of several parts that repeat themselves. You can have a global menu that appears on every page, or a form validator that you have to copy and paste everywhere. For some time they were a nightmare - any change on the behavior would require you to change code in every single place that code appeared in. That was both time consuming and error-prone.
Enter reusable components. Their idea is that you just have to write them once, and maintain them in a single place. This also makes the code more testable, consistent, and cleaner. With your <form-validator> component created, you can just import it everywhere it needs to be used, saving you hundreds of lines of code.
    
Reusable components have not been just invented though, mind you. This concept has been around for a while, and was even present in ASP.NET WebForms for example. What changed is that front-end frameworks have now been built around them, and made their use easier and more straightforward.
    
I will not give an in-depth explanation on reusable components as that is not the purpose of this series, but if this concept is new to you, I highly recommend [this article](https://medium.com/@dan.shapiro1210/understanding-component-based-architecture-3ff48ec0c238){:target="_blank"}.

## Angular

Angular (or commonly called Angular 2+) is an open source web framework, and is leaded by Google. It's important to note here that Angular and AngularJS are **NOT** the same thing, even though Angular was developed to replace AngularJS (which is why it started at v2). They are not very similar nor compatible with each other. Yes, Google is not really good at naming stuff.

With that out of the way, we can get to the basics. Angular is, unlike the other two, based on TypeScript and not pure JavaScript (although it is possible to use it with either one). It was launched in 2014 (2.0), and is currently at version 7.

Its base concepts rely heavily on TypeScript. It contains declarative templates, dependency injection, and integrates a lot of best practices into the framework itself. This all means that **Angular is much more opinionated than React and Vue**, which can be good or bad depending on who's using it.

It has an official CLI that makes it really easy to start projects, generate components, services, interfaces, and add dependencies. It also configures webpack, polyfills, and build options automatically. It is a great tool for beginners, and overall fits most projects. You can argue that it may add some unnecessary dependencies, not be optimized for every use case and/or not do things the way you prefer. That's perfectly fine, as the CLI is supposed to be a helping tool, and not the only way to do things. You can also customize the configs and remove dependencies anytime later.

## React

React is probably the biggest of the three regarding popularity. [On the latest StackOverflow's Developer Survey](https://insights.stackoverflow.com/survey/2019){:target="_blank"}, React is the second most-used web framework (just behind jQuery), the most loved of them all and the one most people are interested in learning.

It came out in 2013, and is mostly maintained by Facebook, but it's open source. Besides being used in web apps, there's also React Native, which is basically a framework that turns your React JS code and components into native Android/iOS code. This series will not get into it, but it's a nice piece of technology and worth taking a look at.

React prides itself on how modular it can make your application be. It makes it very easy to create multiple smaller components and reuse them everywhere. It uses a file extension called JSX to declare its components, which is kind of a mix between JavaScript and HTML.

In older versions, managing states was a hard job, so usually people would use React together with Redux. Now, React has implemented its Hooks API to try to handle state better natively. There's still a lot of discussion over which one is better, but Redux is still the most popular alternative, so I'll try to use that approach in a later post.
    
    
## Vue

Vue is the latest of the three to get its place in the spotlight. It was launched in 2014, but its popularity has grown a lot in the last few years. It shares some similarities with AngularJS, since the creator's purpose was to "just extract the part that he really liked about AngularJS and build something really lightweight".

One of the biggest differences between Vue and Angular/React is that it is designed around an "incrementally adoptable ecosystem". This means that you can use Vue on your existing web app with little friction, and can increasingly implement it. This happens because Vue doesn't use any "magic" like JSX or TypeScript by default, instead relying on pure HTML, CSS and JS. This means it is incredibly lightweight, with only 20kb when minified and compressed.

## What to expect

I'll dive in all three of the frameworks and build the same small project with them. I know we are only able to fully know the framework when we use it in a real, big project. But unfortunately time is a finite resource and I'll try my best to build a small app that features the most common elements, so we can get a good idea of how the framework works.

Vue is actually the one I'm the most excited to try out. I have no experience with it and want to know how it is to work with it on a "real" project. Angular is what I use daily, so I'll start with that one. React is also a new experience to me, even though I've used it before. I hope my journey can be of use for you too!