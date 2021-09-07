---
slug: 2019-year-in-review
title: Cool things I did and learned in 2019
date: 2019-12-29
excerpt: "A quick look back at 2019 and what I learned during this year."
tags: [Meta, Open Source]
---

<script>
  import MarkerHighlight from "$lib/components/style/marker-highlight.svelte";
</script>


Another year went by - Year 6 of my software development journey! I wanted to write this blog post to sum up stuff that I've done or learned this year. Keep in mind this is being written off the top of my head - I did not keep a journal throughout the year, but hopefully that's something I'll do in 2020.

## Complexity is your enemy

As programmers, we are puzzle-solvers. We like to think outside the box, applying different concepts, putting all of those nice things we've learned everywhere. This.... often backfires. Most of the time what works best are the simplest solutions, which are also easier to maintain in the future by you or others. I've seen this quote somewhere a while back: "Programmers spend the first years of their careers mastering complexity only to realize they should master simplicity instead". I guess I'm not in my first years anymore?

I've changed my process in writing code to this:

1. Understand the problem/goal;
2. Draw a simple mental picture of how to solve it (really simplify it);
3. Code in small steps and test them as you go;
4. Make it work. Code can look quite ugly in this step;
5. Optimize it, performance-wise;
6. ⭐️ Try to explain how it works to yourself (mentally or by text), and then refactor the code to be as simple as possible;

This last step might make the initial release take a little longer, but oh boy does it pay off whenever you or someone else has to maintain it.

## Vanilla JS is the best

Wait, I'm not saying you shouldn't use any framework. If it helps you do your work better, go ahead! But "Vanilla" JS has come such a long way and there are so many amazing APIs coming out that using it solely is a valid option again. But more than that, those APIs are built in a way that popular frameworks can use them and communicate with each other with little effort. I've covered a bit of this on [my Microfrontends post](/microfrontends/), but there are more APIs that I've discovered this year that are pretty awesome:

* [Web Components/Shadow DOM/Custom Elements](/microfrontends/);
* [Web Workers](/web-workers/);
* [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API);
* Not exactly new, but [PWAs](/what-are-pwas-and-why-should-i-care-about-them/) are increasingly awesome;

## Jekyll

I'm a bit late to the party, but this is still something I've found out about in 2019. This website/blog you're seeing is built on top of Jekyll, a tool for making static websites.

Basically, you have HTML, CSS and JS. Add some special powers for using variables/loops inside that HTML code and ta-da! It works. Jekyll also allows you to create pages from Markdown (.md) files. I use it for blog posts like this one.

Since it's a static website, it means the code that's served to users/visitors is compiled just once and then served as HTML files. No servers or APIs necessary. It's pretty cool. You can check more about Jekyll [here](https://jekyllrb.com/) and can check the source code for my website [here](https://github.com/matfantinel/matfantinel.github.io).

## Open Source is awesome

I have released two open-source apps this year for elementaryOS ([Reminduck](https://github.com/matfantinel/reminduck) and [Moneta](https://github.com/matfantinel/moneta)). I gotta say, besides the fact that I was learning an entirely different development stack (Vala, GTK, Desktop native), the best "new" thing I enjoyed was doing it in the open.

These are not complex, commercial apps or anything like that. They're small utilities that I use on a daily basis and that were made open and released in hopes of helping anyone out there too. And I gotta say, having users like your software is great, but having them actively contribute to it is even better. As soon as they were released/made public, I started receiving pull requests, bug reports, feature requests, and translations from everywhere. **It's so amazing that people from all over the world took interest in my little idea and helped improve them any way they could.**

But open source is not just other people contributing to your projects, it's also the opposite! I can improve other people's apps that I use, I can report bugs openly and help out, or just download the source code, change a few things just to fit my workflow better and run it. And not only apps, I can do that with the entire OS I run on my PC! Not to mention having access to other people's code allows you to learn from their work and saves you tons of time. Having a problem on your app and you know one that has solved that? Just check out what they did. Copy it, modify it, learn it, ship it. It's all good.  <MarkerHighlight>We wouldn't have to spend so much time reinventing wheels if more of our code was open.</MarkerHighlight>

Ah, this website is also open source. I used others as inspiration and took some code snippets too! So can you, feel free to fork it and modify anyway you want.

## Working remotely is fun, at least for some people

In August I started working remotely for the first time. I work from my home in Brazil with people from US, Europe and India. It was definitely refreshing to not have to commute and always be at a place that makes you feel good. Not only that, but the flexible hours allow me to work whenever I want and I can enjoy things that weren't possible on a regular "9 to 5" routine.

Although... I end up working the same hours as I did before. It feels "right" to work at this time, and I can enjoy my family at night, since they also work during the day. But it's nice to have the flexibility to have a break and a coffee somewhere else during the day if needed.

One of the main things people say about working from home is that sometimes it's hard to separate work time from free time. Fortunately, I didn't have that issue. My apartment is quite small, so I don't have a proper office and instead work on a desk on my bedroom, which means the temptation of lying down and sleeping is always beside me. I'm so thankful I am able to resist that and get work done. And after work hours I can fully disconnect from it and not be stressed out, even if I stay on the computer. I totally understand why some people would not enjoy this and would be less productive, fortunately I was not the case.

The one thing I'd say is worse in my case is communication. I'm not an extremely social person - therefore I don't miss chitchat during the day with colleagues or anything like that. It's just that it's harder to explain code and concepts over a call or screen share. Not everyone is always readily available to explain things because of different timezones, so you have to figure more things out on your own. It's still doable though, and the days of "just coding" without interruptions are a dream. The pros outweight the cons.

## There's never enough time

This year, I started getting into writing more open source software and started working from home. The latter means I can work more on house chores since there's no commute and I'm always around! Still, there's never enough time for me to do what I want to do. I took time to write some elementaryOS apps, but I want to do some web apps too, and code some more, and play some games, watch series, movies, hang out with family, work, write on this blog, oof. This isn't a new discovery by any means, but I feel like it's getting worse every year. This is adult life, I guess.

## Wrapping up

Anyway, 2019 was a good year. I (of course) hope to do more and better in 2020, hopefully including more articles here. Hope you all have some nice holidays and a great new year!