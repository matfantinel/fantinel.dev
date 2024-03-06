---
slug: dotnet-core-405-error
title: .NET Core - Method not allowed on PUT and DELETE requests
excerpt: See how to solve this annoying error after deploying your .NET Core API.
coverImage: /images/posts/dotnet-core-405-error/cover.jpg
coverImageAlt: ""
showImage: true
date: 2019-03-14
updated: null
hidden: false
tags: []
categories:
  - Back-End
  - Dev
type: Article
---

Recently, I've been working on an Angular app, powered with a .NET Core API. Everything was working well and smoothly when running both on my local machine.

After pushing code to the beta server, most of it was working fine. The front-end was being able to call GET, POST and OPTIONS requests normally. When trying to DELETE or PUT entries, however, the following error would show up on the browser's console:

![405 (Method Not Allowed) | Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.](/images/posts/dotnet-core-405-error/post1.jpg)

_Method not allowed? CORS error? What?_

Initially, I was misled by the CORS error. Having had problems with this in the past, I thoroughly checked my API code for any possible problem in the configuration that could lead to this error only after deployed. I found none.

Then, it dawned on me that the CORS error could be not because my API wasn't sending the 'Access-Control-Allow-Origin' on its response, but because it wasn't being sent on the HTTP 405 error seen above.

## Solution

I ended up finding [this article](https://www.ryadel.com/en/error-405-methods-not-allowed-asp-net-core-put-delete-requests/). What happens is that, when published, .NET Core enables the _WebDAVModule_, which _disables PUT and DELETE requests_ by default.

So, to solve the issue, I ended up disabling WebDAV in the whole application, by adding these lines to the auto-generated web.config:

```xml
~filename web.config
<system.webServer>
  <modules runAllManagedModulesForAllRequests="false">
    <remove name="WebDAVModule" />
  </modules>
</system.webServer>
```

After restarting the API in IIS, @@TA-DA!@@ Everything (or at least your PUT and DELETE requests) should be working normally.

This issue seems to only occur when hosting .NET Core on Windows, which is why I could not simulate the issue by running my application in production mode on my Linux machine.

I hope this will be helpful to someone like it was for me!
