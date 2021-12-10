---
slug: 2021-year-in-review
title: 2021 In Review
date: 2021-12-09
excerpt: "Another year, another yearly review post. 2021 felt like pretty much 2020 part II for a lot of people, me included."
tags: [Meta]
---

<script>
  import Image from "$lib/components/base/image.svelte";
  import MarkerHighlight from "$lib/components/style/marker-highlight.svelte";
  import SparklingHighlight from "$lib/components/style/sparkling-highlight.svelte";
</script>

Another year, another yearly review post. 2021 felt like pretty much 2020 part II for a lot of people, me included. The ongoing pandemic still affected our lives, and even though most people in my country are now vaccinated (including me), the danger still exists and preventive measures are still necessary. But it's nice to be able to start doing things and going places we haven't been able to for a while. I personally think this situation is still going to drag on for a while, but we'll adapt to it with time.

## Mental Health

[Last year](/2020-year-in-review), I wrote a bit about doomscrolling, and how it started affecting me until I decided to avoid this behavior. I tried to keep avoiding it this year, and I think I succeeded. I'm not blind to what's going on - I still know <SparklingHighlight>the world is a dumpster fire</SparklingHighlight> at the moment and in many ways it was even worse than 2020 - but I think I was successful in not dwelling on the bad news and the daily absurdities going on.

That doesn't mean my mental health didn't take a hit though. The year started with the loss of a person I held dear - a victim of the inexcusable vaccination delays and genocidal actions of our leaders - and I felt like I lost a bit of control over my work-life-balance for a portion of the year.

This year I also started therapy though, which I feel is a good way to deal with the growing anxiety from the past few years. I've been able to know more about myself and how my brain works, so I can focus on what I found out to improve my life, one day at a time.

## Work Life

Early this year I changed jobs, and started working as a contractor. This has given me more freedom to make my own hours and allowed me to work with a more diverse set of people. It took me a while to use this freedom the right way, though. For a few months I felt like my work-life balance was off, and I felt like my energy was being drained fast. Luckily I was able to notice the early signs of a burnout and took a step back to avoid it. I am now working on my 2nd project as a contractor and I feel that getting the work hours under control allowed me to do my work better, since my mind gets the time to rest.

## Learning and Comparing

Most of the learning I did this year was on my day job, and not personal projects. Last year, I worked a lot with Angular and Vue 2. This year, I worked with Vue 3, React and PHP (😩), and on my personal time I started to practice my Svelte skills. That's a lot of frameworks!

Although every project is different, working with components makes you solve similar problems all the time. And after having worked with basically all mainstream frameworks for a bit, I feel like I can see pros and cons to each of them:

### Angular

* **Pros:** it's very opinionated, which means there are always recommended ways of doing something. This makes the code consistent, and using TypeScript by default makes it much easier to maintain big projects. I like the template syntax and the separation between HTML, CSS and TS. I also can definitely see why it's a choice in many enterprise environments: the majority of Angular projects I've seen have similar structure, which makes devs productive really quickly after being hired.

* **Cons:** it's very opinionated, which means it's not as flexible as other options. The focus on clear separation of concerns and TypeScript can also be a burden for smaller apps. Sometimes you want to make a quick prototype or just build something simpler, and it's easy to find Angular overkill.

### Vue

* **Pros:** I really like the premise of Vue being "incrementally adoptable". This makes Vue really simple on the surface and hides many of its complexities. The template syntax is similar to Angular and it's easy to keep concerns separated if you want to.

* **Cons:** In my personal experience I felt like the Composition API, introduced in Vue 3, goes against my favorite things in Vue previously. Instead of being an extension to HTML/JS, it makes you completely rethink how to build the components, and I feel like it makes things more complicated than they should be. Also, the ecosystem around it (plugins, components, etc) took a big hit with the transition from v2 to v3, because it had many breaking changes.

### React

My experience with React has not been as extensive as the other ones here, so I think I'm still not past the point of "initial impressions". Still, here are my thoughts:

* **Pros:** Super flexible, and with a ginormous ecosystem to back it up. You can write a React app in so many ways and there's always an open-source plugin or component for what you want to do. The existence of NextJS makes using React a better experience.

* **Cons:** Ok, I really don't like JSX. I usually like to keep concerns separated and using JS to build the HTML like this is not my cup of tea. I find it hard to understand at a glance, and feel like it overrides the default web stack too much. Unlike the other frameworks, when I use React I feel like I'm developing a React app instead of a web app. Also, in contrast to Angular, the flexibility of React makes it so that React projects can be so different from one another you'd have a difficult time adapting, even though they use the same framework (this is mitigated by meta-frameworks like NextJS, which are very opinionated, thankfully).

### Svelte

I have a clear favorite here, but I feel that Svelte hits the sweet spot in many ways.

* **Pros:** I like the template syntax (not as clean as Vue's or Angular's, but similar enough), the clear separation of concerns, and how it likes to stay out of your way. Most of all though, I love how Svelte makes me just feel like I'm building a "vanilla" web page, but with added goodies. <MarkerHighlight>It extends the web instead of replacing it.</MarkerHighlight>

* The fact that it is a compiler frees it from the need for a Virtual DOM, which then makes the code you need to write much simpler. No need for _useState_, _useEffect_, or keeping track of two-way binding to maintain state between components - you just have to set the variables and Svelte does the rest. I just think about my logic, not about how the framework works.

* Its official meta-framework, SvelteKit, also has great defaults. It works by using native HTML tags instead of trying to emulate them. Instead of a `<Link>`, just use `<a>`. Instead of using JS to post data, just use a `<form>`. This makes the app leaner, more accessible, and work with JS disabled by default.

* **Cons:** Svelte is relatively new, and therefore its ecosystem is still lacking. I've had trouble properly integrating a SvelteKit project with Storybook or Jest, for example, since Kit is still in Beta. There are also many components that don't have a Svelte version yet, and while some of them have a "Vanilla JS" option that usually works, it's still not as seamless as it could be.

## Personal Projects

I didn't work on many personal projects this year, as I was already learning a lot on my day job. I did, however, <MarkerHighlight>completely rewrite my website!</MarkerHighlight>

I really liked the previous one, but I wanted to change some things about it and use something more flexible than Jekyll. So I completely redesigned it using Figma - while retaining some design elements from before - and rewrote it with SvelteKit. [I wrote a blog post talking more about the experience](https://fantinel.dev/blog-development-sveltekit/), which also became my most-read post of all time. Nice!

Speaking of blog posts, <SparklingHighlight>I doubled the amount of posts published compared to last year!</SparklingHighlight> Which means I wrote.... **4** (excluding this one). I wanted to write more, but compared to the 2 posts from last year, it's still an improvement, _right_?

## Fun

Not everything is code and gloom - I also do some fun things every once in a while.

### TV and Movies

* **Ted Lasso** is the TV equivalent of a hug. I’ve never seen a show that can balance comedy, wholesomeness and an enthralling story and characters so well. It touches on delicate subjects in a way that still makes you feel good, and yet is capable of sending the intended message. Honestly can’t find anything I dislike about it.

* **Better Call Saul** was surprisingly good. I initially dismissed it as being just a spin-off of a popular show, but it slowly evolved into a tightly-woven drama that keeps me at the edge of my seat. The stakes are lower here than they are in Breaking Bad, but I feel like I care more about the characters on this one.

### Games

* **The Last of Us** was surprisingly surprising for me. I am 8 years late to the party here, but I didn't have a PlayStation since the PS1, and not only I hadn't played this game, I never felt like doing so. I usually favor creative gameplay instead of a complex story, but finally gave it a go this year. Wow. It was an amazing experience from start to finish, though I admit it felt more like a more immersive movie than a game. That being said, I don't think any movie can match the immersion that a game with a good story can provide.

* **No Man’s Sky** is a mix of exploration and existential crisis. There are a lot of things to do (though not all of them have much depth), but the main gameplay loop of exploring planets and seamlessly traversing between them is addictive. Plus, the main story was surprisingly good, with a lot of amazing quotes from the Travellers in that universe. A bit of existential crisis was the icing on the cake.

<Image
  path="posts/{slug}"
  filename="no-mans-sky"
  alt="Screenshot of a character in No Man's Sky saying: 'Existence is beautiful, if you let it be. Life is not a question. There does not need to be an answer.'"
/>

* **Metroid Dread** was a lot of fun! I never liked games of this genre (Metroidvania) until I played Hollow Knight, last year. I felt like finally giving Metroid a chance since it was the first main entry in 19 years and the reviews were stellar. I was not disappointed. I feel like it doesn't match Hollow Knight in its worldbuilding and ambientation, but the gameplay in Metroid Dread felt much more fluid, making almost everything in it a joy.

* **Dungeons & Dragons** has continued to be one of the highlights of my weeks. My party still played online this year, but it was a lot of fun. We finally finished the Curse of Strahd campaign after 502 days. The finale was so epic we decided to have it illustrated by the amazing [Guilherme Holz](https://www.gholz.art/).

<Image
  path="posts/{slug}"
  filename="dnd"
  alt="Illustration of a Dungeons and Dragons party dealing the killing blow to the vampire Strahd"
  figcaption="It was kind of poetic to have a bolt of holy light (in the form of a spear) be the end of one who brought so much darkness to the land. From left to right: Ylanis, Alesteir (me), Aliana and Garreth. The guy getting stabbed is Strahd, the big bad evil guy."
/>

## What to Expect in 2022

First of all, <SparklingHighlight>I'm getting married! 💍</SparklingHighlight> The love of my life and I are finally making it official. 

Later in the year I'm also temporarily moving to Italy for a few months with my (soon-to-be) wife. It's going to be some sort of test drive - we'll return to Brazil before the year ends and then decide if living abroad is something we want or not.

As for this blog, I hope to again write more than I did this year. I have a few ideas in the oven, but have been struggling to write them down. Hopefully the big life changes are the inspiration I need.

I also have some ideas for some personal projects that may or may not see the light of day. Let's see how it goes.

## Wrapping Up

2021 was overall a weird year, but I feel 2022 is going to have more going on. I wish you happy holidays and that you have a memorable 2022. See you then!