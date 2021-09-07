---
slug: open-source-x-free-software
title: "Open Source x Free Software: What's the difference?"
date: 2019-03-23
excerpt: "Learn the difference between these two terms that often get mixed up."
tags: [Free Software, Open Source, Concepts, FOSS, FLOSS, Libre Software, Freedom]
---

<script>
  import CodeBlock from "$lib/components/blog/code-block.svelte";
  import Image from "$lib/components/base/image.svelte";
  import Callout from "$lib/components/base/callout.svelte";
</script>

Free software is a concept that's been around for a long time, and so is open source. At first glance, they may seem like the same thing with different names. However, they are very different in their philosophy. In this article, I'll explain what each one is and how they are different.

## Free Software

According to the [Free Software Foundation (FSF)](https://www.fsf.org/), free software is the software that respects the user's freedom and sense of community. This means that the user has the freedom to run, copy, distribute, study, change and improve it.

A common phrase you may read somewhere is "Free as in freedom, not as in beer". This means that the name doesn't indicate that the software is free of charge, only that the user has the freedom to do whatever they want with it.

The FSF lists four essential freedoms that every free software must follow:

* The freedom to run the program as you wish, for any purpose (freedom 0);
* The freedom to study how the program works, and change it so it does your computing as you wish (freedom 1). Access to the source code is a precondition for this;
* The freedom to redistribute copies so you can help others (freedom 2);
* The freedom to distribute copies of your modified versions to others (freedom 3). By doing this you can give the whole community a chance to benefit from your changes. Access to the source code is a precondition for this.

You can read more about Free Software at gnu.org, [here](https://www.gnu.org/philosophy/free-sw.en.html).

## Open Source

The [Open Source Initiative](https://opensource.org/) defines 10 criteria for software to be considered open source. You can read them fully [here](https://opensource.org/docs/definition.php). I'll summarize them below:

* Any person must be able to distribute or sell the software without restrictions;
* The source code must be distributed along with the software, or at least link to it clearly;
* A copy of the license must be distributed with the software;
* People must be able to modify your software and redistribute it with the same license;
* Modifications must only be redistributed with a different name or version than the original code;

## The Difference

By reading each concept's principles above, you can get the idea that Open Source is a more neutral concept when compared to Free Software. It does not deal with the user's freedom, only with the technical aspects of the software. Richard Stallman, the founder on FSF, summarized really well the differences between the two concepts:

> The terms “free software” and “open source” stand for almost the same range of programs. However, they say deeply different things about those programs, based on different values. The free software movement campaigns for freedom for the users of computing; it is a movement for freedom and justice. By contrast, the open source idea values mainly practical advantage and does not campaign for principles. - Richard Stallman

You can read more about it [here](https://www.gnu.org/philosophy/open-source-misses-the-point.en.html).

## TL;DR

Open Source is a technical, practical concept. Free Software is a philosophical, broader concept. Since Free Software already considers the technical aspects of Open Source, we can say that **Every Free Software is Open Source, but not every Open Source is Free Software**.

### How to know if an Open Source software is Free Software?

The easiest way is to check their license. [The FSF lists all Free Software licenses here](https://www.gnu.org/licenses/license-list.html#SoftwareLicenses), but usually most of them are under the GPL or MIT licenses.

Thanks for reading!