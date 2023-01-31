---
layout: article
slug: mongodb-error-datadb-on-linux
title: MongoDB on Linux - Data directory /data/db not found
date: 2019-06-09
excerpt: Fix the error that occurs when trying to run freshly-installed MongoDB on a
  Linux machine.
tags:
  - Common Errors
  - Backend
  - Linux
categories:
  - Tech
---

<script context="module">
  import CodeBlock from "$lib/components/molecules/CodeBlock.svelte";
  import Callout from "$lib/components/molecules/Callout.svelte";

  import { getSrcsetFromImport } from "$lib/utils/functions";
  import CoverImage from './cover.jpg?width=1600&format=avif;webp;png&meta&imagetools';

  metadata.coverImage = getSrcsetFromImport(CoverImage);
</script>

When setting up a Linux server or development machine, you might need to install MongoDB. However, every single time I've stumbled upon an error right when trying to start the `mongod` service, after following [the official instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/). The important line here is:

<Callout type="error">
  exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating
</Callout>

This seems like an error on Mongo's install script. The problem is that by default, Mongo points to that `/data/db` folder, and it either forgets to create or set ownership of it on installation.

Thankfully, the solution is quite simple. First, we'll make sure that the folder in question exists. Run the following command from your Terminal:

<CodeBlock lang="shell">

```shell
sudo mkdir -p /data/db/
```

</CodeBlock>

And then, we'll set the ownership of the folder to the user that's going to start the mongod service. Since I only use if for local development in my computer, I set myself as the owner:

<CodeBlock lang="shell">

```shell
sudo chown `id -u` /data/db
```

</CodeBlock>

Now, just running `mongod` should do the job.

Thanks for reading!
