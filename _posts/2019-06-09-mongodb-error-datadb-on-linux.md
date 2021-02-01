---
layout: post
title: MongoDB on Linux - Data directory /data/db not found
images-path: /posts/2019-06-09-mongodb-error-datadb-on-linux
image: /images/posts/2019-06-09-mongodb-error-datadb-on-linux/cover.jpg
tags: [Common Errors, Backend, Linux]
---

So, as a distro-hopper I end up installing MongoDB more often than I'd like to admit. On all times, I've stumbled upon an error right when trying to start the `mongod` service, after following [the official instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/){:target="_blank"}. The important line here is:

`exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating`

This seems like an error on Mongo's install script. The problem is that by default, Mongo points to that `/data/db` folder, and it either forgets to create or set ownership of it on installation.

Thankfully, the solution is quite simple. First, we'll make sure that the folder in question exists. Run the following command from your Terminal:

{% highlight bash %}
sudo mkdir -p /data/db/
{% endhighlight %}

And then, we'll set the ownership of the folder to the user that's going to start the mongod service. Since I only use if for local development in my computer, I set myself as the owner:

{% highlight bash %}
sudo chown `id -u` /data/db
{% endhighlight %}

Now, just running `mongod` should do the job. Hope that helps you!

Thanks for reading!