---
slug: web-workers
title: Web Workers - Bringing Multithreading to the Front-End
date: 2019-08-14
excerpt: "Improve your client-side performance by breaking heavy operations into multiple threads - backend style."
tags: [Front-End, Guide, JavaScript]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
</script>


In times of complex, feature-filled front-ends, we often get reports of freezes, frame drops, or overall slugginess in our apps. This is due to JavaScript's default behavior - a single thread is responsible for the interface, animations, and whatever CPU-intensive logic or I/O your app is doing.

This is because when JavaScript was created, back in 1995, it was never meant to be such a capable language, powering complex systems and heavy loads.

Usually, the best idea is to perform CPU-intensive work on the back-end, usually with a more performant language. This makes the experience similar to everyone, as it won't require much power from the user's machine. However, there are cases where we need to do this on the front-end, such as (but not limited to):

* Heavy filtering of data;
* Conversions (like printing data to a PDF);
* Deserializing huge and complex objects or arrays;
* Complex calculations, like 3D objects for example.

All of these heavy operations would cause the main thread - responsible for drawing your interface quickly and playing your animations smoothly - to not be that smooth.

This is where our star of the day comes in - Web Workers.

## What do these Web Workers do?

Imagine you are the boss (main thread). You call one of your employees (a worker) and tell them to do a specific task (a function). Then they go back to their own room (another thread) to do what you asked. In the meantime, you can do whatever you want, and as soon as your employee finishes the task, it comes back to you with the result. Now, in real life things aren't that simple, but you get the main idea, right? 

Let's make something clear: Web Workers are an universal JavaScript feature, not limited to any specific framework. [It even works on IE10+](https://caniuse.com/#search=Worker)!!! Pretty much the only requirement is that the worker logic stays in a different js file (worker.js, for example).

## Let's try it out

[Mozilla Developer Network (MDN)](https://github.com/mdn/simple-web-worker) has a great, simple example of how to use them. I'll explain it below:

First of all, on our main.js file, we need to create our Worker object, passing our Worker file as a parameter:

<CodeBlock filename="main.js" lang="javascript">

```javascript
if (window.Worker) { //just to make sure our browser supports it
	const myWorker = new Worker("worker.js");
}
```
</CodeBlock>

The main thread is able to communicate with workers using the `postMessage` and `onMessage` functions.

Let's make our worker multiply two numbers for us!

<CodeBlock filename="main.js" lang="javascript">

```javascript
// we pass an array with all the parameters we want
myWorker.postMessage([123, 456]);
```
</CodeBlock>

And then listen to a message sent back from our worker:

<CodeBlock filename="main.js" lang="javascript">

```javascript
myWorker.onmessage = function(e) {
    result.textContent = e.data;
}
```
</CodeBlock>

We are now successfully passing and receiving data to/from our worker. Now, for the worker.js file:

<CodeBlock filename="worker.js" lang="javascript">

```javascript
onmessage = function(e) {
  let result = e.data[0] * e.data[1];
  postMessage(result);
}
```
</CodeBlock>

Very simple, right? The multiplication was done in a different thread, and therefore did not interfere with our main thread. Keep in mind though, that **setting up a Worker, starting another thread and passing parameters still take up minor resources from the main thread**. For simple examples like this, performance will likely be worse than before. **Web Workers are made for heavy tasks, so don't just use them everywhere**.

## Just a last little thing...

When trying it out locally, you may find that your code... does not work. Neither Chrome nor Firefox allow running worker files from a local file system. This means that you have to be running your website in some sort of HTTP server in order for it to work.

If you have Python installed (most Linux or MacOS systems already do), just run: `python -m SimpleHTTPServer 8000` and you're good to go. You can access your files through localhost:8000.

If you don't, you can also use [this Chrome extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) or any other method you prefer.

Thanks for reading!