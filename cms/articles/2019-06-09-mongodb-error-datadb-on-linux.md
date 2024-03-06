---
slug: mongodb-error-datadb-on-linux
title: MongoDB on Linux - Data directory /data/db not found
excerpt: Fix the error that occurs when trying to run freshly-installed MongoDB on a Linux machine.
coverImage: /images/posts/mongodb-error-datadb-on-linux/cover.jpg
coverImageAlt: ""
showImage: true
date: 2019-06-09
updated: null
hidden: false
tags: []
categories:
  - Back-End
  - Dev
type: Article
---

When setting up a Linux server or development machine, you might need to install MongoDB. However, every single time I've stumbled upon an error right when trying to start the `mongod` service, after following [the official instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/). The important line here is:

> [!error]
> exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating

This seems like an error on Mongo's install script. The problem is that by default, Mongo points to that `/data/db` folder, and it either forgets to create or set ownership of it on installation.

Thankfully, the solution is quite simple. First, we'll make sure that the folder in question exists. Run the following command from your Terminal:

```shell
sudo mkdir -p /data/db/
```

And then, we'll set the ownership of the folder to the user that's going to start the mongod service. Since I only use if for local development in my computer, I set myself as the owner:

```shell
sudo chown `id -u` /data/db
```

Now, just running `mongod` should do the job.

Thanks for reading!
