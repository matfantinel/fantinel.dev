---
slug: microfrontends
title: "Micro Frontends: Solving the Legacy JavaScript Problem"
date: 2019-03-17
excerpt: "Finally a way to modernize that legacy project you keep complaining about!"
tags: [Front-End, JavaScript, Guide]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
  import MarkerHighlight from "$lib/components/style/marker-highlight.svelte";
</script>


It's a running joke in the development community that if a JS programmer goes into a coma for 6 months, he will need to learn everything again by the time he wakes up. This is a consequence of JavaScript's open, decentralized nature. It's both a blessing and a curse.

All the time there are new frameworks and libraries meant to make it easier to develop in JS, at least for a specific use. Sometimes they are effectively better, sometimes they just bring a new workflow, and as a developer it can be quite fun to learn them and explore new paradigms.

However, in the "enterprise world", reality is different. We build big, complex applications that usually rely on a framework's properties to work the way they do. Recent frameworks like React, Vue and Angular offer an easy way to break an application in smaller, more independent chunks that can be maintained separately, but they still rely on the main framework's version.

Front-end development is becoming more and more like back-end development, with more complex architectures. Naturally, the concept of microservices was brought over and is being called Micro Frontends.

## What do Micro Frontends consist of?

First, we must define what monolithic frontends are. You probably work on one of them, since they are basically every web app that is made with a specific framework and version, and only works by itself without resorting to redirects and iframes. Hence the monolith-derived name.

Micro Frontends, however, can be made of several pieces of different technologies - all in a "central" app that puts the puzzle pieces together.

Since frameworks like React and Angular are already very popular, the concept of componentizing our apps is well known, and it's basically what Micro Frontends consist of. It uses the Custom Elements API, a web standard that is being implemented by all major browsers (with polyfills for older ones!), to provide a common ground between different components written in Angular, React, Vue, or even good old pure JS!

To do that, they work in a similar way modern frameworks do, with an Input/Output pattern and a very simple way to import them into the parent's HTML. We'll see more about this later.

## How does that solve the legacy problem?

You've probably already worked on a big app that was made years ago, and used "ancient" technology. If you haven't, lucky you! But in many enterprise environments, working with JQuery, KnockoutJS, AngularJS (v1.x) or even older JS technologies is the norm. While usually there is willingness to update the tech stack in order to gain more productivity and performance, it is usually not feasible to update an entire behemoth all at once. Add the fact that companies and their products must move fast with features and changes, and the chance to update is close to zero.

One alternative is to create a second app with a new technology and make the change in multiple steps, with routes handling which app is to be shown. This however, has many issues:

* You have to duplicate many things, like fixed menus, authentication handling, and all the base architecture. Even worse than duplicating is **maintaining** both of them afterwards;
* The user experience will be severely harmed when your app redirects to a different one frequently;
* When the new technology you use becomes obsolete, you'll have to deal with the problem all over again.

Other alternative is to use iframes, which brings a lot of problems since communication between both pages is not very straightforward and the experience feels clunky. Not very good.

However, when using Micro Frontends, you are able to:

* Migrate technologies in small steps:
* Communication between both technologies is easy;
* The user does not notice the use of two different stacks - they all merge seamlessly in the same experience;
* There is no need to maintain more than one version of a component;
* Encourages good use of components and code reuse.

At my job, we had our main application written in AngularJS, and since it was a pretty huge application, migrating to a newer stack was just not feasible. We then had a project that included a complete overhaul of the design of the application, we felt it was a good time to use newer technologies.

Since we had a side project written in Angular 6 and most of us had knowledge of this framework, we decided to write new components for our main app in Angular 7. While the plan was to update the entire app, rewriting it entirely and publishing all at once would bring a lot of problems.

We then decided to use the Micro Frontends approach, rewriting our pages/components one by one and releasing it in "packages". We did that by creating Custom Elements in Angular 7 and integrating them with the older AngularJS app. Since we would be modernizing entire pages at once, there wouldn't be many changes on the older app. The tried-and-tested older app was still responsible for managing routes and authentication, and would just display our newer components as they were built. _This proved to be a successful approach that allowed us to both modernize our tech stack, minimize user impact, we kept delivering value to our customers and, since the project was broken in smaller pieces, we had flexibility to tackle other projects in between._

## How do they work in practice?

For this article, I am going to create a custom element with Angular 7 and use it in a simple html file. I've created a sample app on GitHub. [You can check the full code here.](https://github.com/matfantinel/custom-elements-sample)

### Creating the Custom Element

First, we create a new Angular 7 app:

<CodeBlock lang="shell">

```shell
ng new angular-elements-sample --prefix custom
```
</CodeBlock>

The CLI will ask you for some settings, you can choose whatever you like. Since we're just using Custom Components in this example, I chose not to apply Angular routing.

Then, we need to add the Angular package that brings Custom Elements support:

<CodeBlock lang="shell">

```shell
ng add @angular/elements
```
</CodeBlock>

Now, on tsconfig.json file, change target to "es2015".

<CodeBlock lang="json">

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "target": "es2015",
    ...
  }
}
```
</CodeBlock>

Then, create a new component in your app:

<CodeBlock lang="shell">

```shell
ng g component button
```
</CodeBlock>

On this component, we should set its encapsulation to ShadowDom. This means that its styles will be limited to itself, and styles from the parent application won't apply to the child component, or vice-versa. Also, we'll be declaring an Input() property, that the element will receive from the parent, and a CustomEvent, a way to communicate events with other applications/components in the same page.

Below is the full component Typescript code:

<CodeBlock lang="typescript" filename="button.component.ts">

```typescript
import { Component, OnInit, ViewEncapsulation, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ButtonComponent implements OnInit {

  @Input() label = 'Default Label';
  private clicksCount: number = 0;

  htmlElement: HTMLElement;

  constructor(public hostElement: ElementRef) {
    this.htmlElement = (this.hostElement.nativeElement as HTMLElement);
  }

  ngOnInit() {
  } 

  handleClick = () => {
    this.clicksCount++;
    let action = new CustomEvent('action', {
      detail: {
        clicksCount: this.clicksCount
      }
    });
    this.htmlElement.dispatchEvent(action);
  }

}
```
</CodeBlock>

The HTML template is very simple:

<CodeBlock lang="html">

```html
<button (click)="handleClick()">{{ label }}</button>
```
</CodeBlock>

Then, we must declare our Custom Element in our app.module.ts file:

<CodeBlock lang="typescript" filename="app.module.ts">

```typescript
@NgModule({
  declarations: [
    ...
    ButtonComponent,
  ],
  entryComponents: [
    ButtonComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    //Declares our component's Custom Element
    //Then defines it in the DOM so it can be used in other projects
    const buttonElement = createCustomElement(ButtonComponent, { injector: this.injector });
    customElements.define('custom-button', buttonElement);
  }
}
```
</CodeBlock>

To make it easier to use our component in another app, we can use some script magic to concat all the .js files produced by `ng build --prod` into a single properly-named file. To do that, I created the following script in package.json's script session:

<CodeBlock lang="json" filename="package.json">

```json
"package": "ng build --prod && cat ./dist/runtime.js ./dist/polyfills.js ./dist/scripts.js ./dist/main.js > CustomElementsSample.js"
```
</CodeBlock>

If you're on a Windows system, you won't have access to cat. In that case install `jscat` from npm and change the cat command to jscat.

For that to work though, we need to disable output hashing on the angular.json file. This makes sure that the generated file names are always the same. Just change `"outputHashing": "all"` to `"outputHashing": "none"`.

Now we have a single js file that contains our custom element, and we can use it in our sample legacy app!

### Using the Custom Element

Check this sample html file:

<CodeBlock lang="html">

```html
<html>
    <head>
        <meta charset="UTF-8">
        <title>This is a legacy app that uses Angular 7 custom elements</title>
        <script src="../angular-elements-sample/CustomElementsSample.js"></script>

        <style>
            button {
                background-color: red;
                color: white;
            }
        </style>
    </head>
    <body>
        <custom-button label="Legacy app label"></custom-button>
        <span id="counter"></span><span> clicks!</span>

        <script>
            const button = document.querySelector('custom-button');
            button.addEventListener('action', event => {
                document.getElementById('counter').innerHTML = event.detail.clicksCount;
            });
        </script>
    </body>
</html>
```
</CodeBlock>

You can see that we are successfully being able to listen for events, pass the label parameter, and that the button style from the html does not apply to the component. Success!

## Caveats

As with all things, there are some disadvantages in this approach:

### Browser Support

<Image
  path="posts/{slug}"
  filename="Browser-Support"
  alt="Browser support table"
  figcaption="You can check this information on the <a href='https://caniuse.com/custom-elementsv1' target='_blank'>Can I Use</a> website."
/>

As of March 2019, only Firefox, Chrome and Chromium-based browsers fully support custom elements, while Safari implements them only partially. However, [there's a polyfill available](https://github.com/webcomponents/custom-elements) to bring support to older browsers.

### JS Bundle size

Since you're running components using other frameworks, you'll still have to load them on the user's side. If your app uses AngularJS, Angular, JQuery and React in different components, you'll have to load all their runtimes before the app is fully functional. In this case, your better option is to minimize the bundle as much as possible, and use [Service Workers and PWA capabilities](/what-are-pwas-and-why-should-i-care-about-them) to improve caching on your app.

### Communication between components is not as good as within the same framework

This should not be much of an issue unless you break a page into too many components with different technologies. Even then, communication with other components is very doable, just not as good as it would be between Angular-Angular or React-React components.

## Wrapping up

Micro Frontends are a consequence of the complexicity that front-end has developed in the last few years. It is very good to see technology move forward, and we may get lost amidst so much change, so it is good to know that we don't have to be afraid to not migrate our apps to the latest and greatest. They bring us the advantages of newer frameworks while minimizing the disadvantages.

Thanks for reading!